const swiper = new Swiper('.slider__swiper', {
  loop: true,
  // autoplay: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 60,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
