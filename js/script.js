import tabs from './module/tabs';
import slider from './module/slider';
import calculater from './module/calculater';
import cards from './module/cards';
import form from './module/form';
import modal from './module/modal';
import timer from './module/timer';
import { openModal } from './module/modal';

window.addEventListener('DOMContentLoaded', function () {
  const modalTimeId = setTimeout(() => openModal('.modal', modalTimeId), 300000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2022-05-29');
  modal('[data-modal]', '.modal', modalTimeId);
  cards();
  form('form', modalTimeId);
  calculater();
  slider({
    slideItem: ".offer__slide",
    sliderbox: ".offer__slider",
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalSlide: '#total',
    currentSlide: '#current',
  });
});