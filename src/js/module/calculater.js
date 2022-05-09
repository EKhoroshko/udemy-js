function calc() {
  const resultCalc = document.querySelector('.calculating__result span')
  let gender, height, weight, age, actives;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', 'female')
  }

  if (localStorage.getItem('actives')) {
    actives = localStorage.getItem('actives');
  } else {
    actives = 'female';
    localStorage.setItem('actives', "small")
  }

  function checkLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.classList.remove(activeClass);
      if (item.getAttribute('id') === localStorage.getItem('gender')) {
        item.classList.add(activeClass);
      }
      if (item.getAttribute('id') === localStorage.getItem('actives')) {
        item.classList.add(activeClass);
      }

    });
  }

  checkLocalSettings('#gender div', 'calculating__choose-item_active');
  checkLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotalRation() {
    if (!gender || !height || !weight || !age || !actives) {
      resultCalc.textContent = "____";
      return;
    }

    switch (actives) {
      case "low":
        actives = 1.2;
        break;
      case "small":
        actives = 1.375;
        break;
      case "medium":
        actives = 1.55;
        break;
      case "high":
        actives = 1.725;
        break;
    }

    switch (gender) {
      case "male":
        resultCalc.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * Number(actives));
        break;
      case "female":
        resultCalc.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * Number(actives));
        break;
    }
  }

  calcTotalRation();

  function staticInfo(selector, activeClass) {
    const staticProp = document.querySelectorAll(selector);
    staticProp.forEach(item => {
      item.addEventListener('click', (e) => {
        if (selector === "#gender div") {
          gender = e.target.getAttribute('id')
          localStorage.setItem('gender', e.target.getAttribute('id'))
        } else {
          actives = e.target.getAttribute('id')
          localStorage.setItem('actives', actives)
        }

        staticProp.forEach(item => {
          item.classList.remove(activeClass)
        })

        e.target.classList.add(activeClass);
        calcTotalRation();
      })
    })
  }

  staticInfo('#gender div', "calculating__choose-item_active")
  staticInfo('.calculating__choose_big div', "calculating__choose-item_active")


  function getDynamicProp(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red'
      } else {
        input.style.border = 'none'
      }

      switch (input.getAttribute('id')) {
        case "height":
          height = Number(input.value)
          break;
        case "weight":
          weight = Number(input.value)
          break;
        case "age":
          age = Number(input.value)
          break;
      }
      calcTotalRation();
    })
  }

  getDynamicProp('#height');
  getDynamicProp('#weight');
  getDynamicProp('#age');
}

export default calc;