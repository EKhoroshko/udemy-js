/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/module/calculater.js":
/*!*********************************!*\
  !*** ./js/module/calculater.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/module/cards.js":
/*!****************************!*\
  !*** ./js/module/cards.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/service */ "./js/service/service.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 34;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
      this.parent.append(element);
    }
  }

  (0,_service_service__WEBPACK_IMPORTED_MODULE_0__.getResurce)("http://localhost:3000/menu").then(({ data }) => {
    data.forEach(({ img, alting, title, descr, price }) => {
      new MenuCard(img, alting, title, descr, price, ".menu .container", 'menu__item').render();
    });
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/module/form.js":
/*!***************************!*\
  !*** ./js/module/form.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/module/modal.js");
/* harmony import */ var _service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/service */ "./js/service/service.js");



function form(formSelector, modalTimeId) {
  const $forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  $forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_service_service__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data => {
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });

    });
  }

  function showThanksModal(message) {
    const prevMaodalDialog = document.querySelector('.modal__dialog');
    prevMaodalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimeId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
          <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
                <div class="modal__title">
                ${message}
                </div>
            </div>
        </div>
        `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevMaodalDialog.classList.add('show');
      prevMaodalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/module/modal.js":
/*!****************************!*\
  !*** ./js/module/modal.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimeId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimeId) {
    clearInterval(modalTimeId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(trigerSelector, modalSelector, modalTimeId) {
  const modalTrigger = document.querySelectorAll(trigerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimeId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimeId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/module/slider.js":
/*!*****************************!*\
  !*** ./js/module/slider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/module/tabs.js":
/*!***************************!*\
  !*** ./js/module/tabs.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(itemTabs, tabContent, tabParent, tabsActive) {
  let tabs = document.querySelectorAll(itemTabs),
    tabsContent = document.querySelectorAll(tabContent),
    tabsParent = document.querySelector(tabParent);

  function hideTabContent() {

    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove(tabsActive);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(tabsActive);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains(itemTabs.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/module/timer.js":
/*!****************************!*\
  !*** ./js/module/timer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, deadline) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(deadline);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/service/service.js":
/*!*******************************!*\
  !*** ./js/service/service.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResurce": () => (/* binding */ getResurce),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
}

const getResurce = async (url) => {
  return await axios.get(url);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/tabs */ "./js/module/tabs.js");
/* harmony import */ var _module_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/slider */ "./js/module/slider.js");
/* harmony import */ var _module_calculater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/calculater */ "./js/module/calculater.js");
/* harmony import */ var _module_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/cards */ "./js/module/cards.js");
/* harmony import */ var _module_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/form */ "./js/module/form.js");
/* harmony import */ var _module_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module/modal */ "./js/module/modal.js");
/* harmony import */ var _module_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./module/timer */ "./js/module/timer.js");









window.addEventListener('DOMContentLoaded', function () {
  const modalTimeId = setTimeout(() => (0,_module_modal__WEBPACK_IMPORTED_MODULE_5__.openModal)('.modal', modalTimeId), 300000);

  (0,_module_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_module_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-05-29');
  (0,_module_modal__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-modal]', '.modal', modalTimeId);
  (0,_module_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_module_form__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimeId);
  (0,_module_calculater__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_module_slider__WEBPACK_IMPORTED_MODULE_1__["default"])({
    slideItem: ".offer__slide",
    sliderbox: ".offer__slider",
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalSlide: '#total',
    currentSlide: '#current',
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map