function slider({ slideItem, sliderbox, prevArrow, nextArrow, totalSlide, currentSlide }) {
  const slide = document.querySelectorAll(slideItem),
    slider = document.querySelector(sliderbox),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalSlide),
    current = document.querySelector(currentSlide);

  const dots = document.createElement('ol');
  const arrDots = [];
  dots.classList.add('carousel-indicators');
  slider.append(dots);

  for (let i = 0; i < slide.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add("dot");
    dots.append(dot);
    arrDots.push(dot);
  }

  let slidePosition = 1;
  showSlides(slidePosition)

  if (slide.length < 10) {
    total.textContent = `0${slide.length}`;
  } else {
    total.textContent = slide.length
  }

  function showSlides(n) {
    if (n > slide.length) {
      slidePosition = 1;
    }

    if (n < 1) {
      slidePosition = slide.length
    }

    if (slidePosition < 10) {
      current.textContent = `0${slidePosition}`
    } else {
      current.textContent = slidePosition
    }

    slide.forEach(item => item.classList.add('hide'));
    slide[slidePosition - 1].classList.remove('hide');

    arrDots.forEach(item => item.style.opacity = '.5')
    arrDots[slidePosition - 1].style.opacity = 1;
  }

  function plusSlides(n) {
    showSlides(slidePosition += n);
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  })

  next.addEventListener('click', () => {
    plusSlides(1);
  })

  arrDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slidePosition = Number(slideTo);
      showSlides(slidePosition)
    })
  })
}

export default slider;