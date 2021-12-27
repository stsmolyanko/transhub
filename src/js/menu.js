$(document).ready(function() {
  var header = $('.header');
  var navigation = $('.navigation');
  var burgerButton = $('.header__burger');
  var burgerLine = $('.header__burger-line');
  var logoMobile = $('.logo_mobile');

  header.addClass('header_with-paddings');
  navigation.addClass('navigation_mobile-hidden');
  burgerButton.addClass('header__burger_visible')
  logoMobile.addClass('logo_mobile-visible');

  var showMenu = function () {
    burgerLine.toggleClass('header__burger-line_closed');
    burgerLine.toggleClass('header__burger-line_opened');
    navigation.toggleClass('navigation_mobile-hidden');
    navigation.toggleClass('navigation_mobile-opened');
  };

  burgerButton.click(function() {
    showMenu();
  });
});
