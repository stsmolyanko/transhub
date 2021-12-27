$(document).ready(function() {

  // Находим элементы, с которыми будем взаимодействовать

  var navigation = $('.navigation');
  var languageWrapper = $('.language__wrapper');
  var contactsWrapper = $('.navigation__contacts');
  var contactLinks = $('.navigation__contacts-link');
  var loginItem = $('.login__item');
  var loginLinks = $('.login__link');
  var mainLinks = $('.navigation__main-nav-link');
  var logo = $('.logo__img_changable');

  // Описываем функции изменения и сброса цвета для элементов

  var changeColorsToBright = function() {
    navigation.addClass('navigation_white');
    languageWrapper.addClass('language__wrapper_gray');
    contactLinks.addClass('navigation__contacts-link_gray');
    contactsWrapper.addClass('navigation__contacts_gray-border');
    loginLinks.addClass('login__link_gray');
    loginItem.addClass('login__item_gray');
    mainLinks.addClass('navigation__main-nav-link_dark');
    logo.attr('src', 'img/logo-color.svg');
  }

  var resetColors = function() {
    navigation.removeClass('navigation_white');
    languageWrapper.removeClass('language__wrapper_gray');
    contactLinks.removeClass('navigation__contacts-link_gray');
    contactsWrapper.removeClass('navigation__contacts_gray-border');
    loginLinks.removeClass('login__link_gray');
    loginItem.removeClass('login__item_gray');
    mainLinks.removeClass('navigation__main-nav-link_dark');
    logo.attr('src', 'img/logo-white.svg');
  }


  // Описываем функции, проверяющие отступ и ширину окна

  var isOffsetZero = function () {
    return $(document).scrollTop() === 0;
  }

  var isWindowWidthMobile = function () {
    return $(window).width() <= 767;
  }

  // Красим хедер сразу после загрузки страницы

  if (isWindowWidthMobile()) {
    changeColorsToBright();
  } else {
    if (!isOffsetZero()) {
      changeColorsToBright();
    } else {
      resetColors();
    }
  }

  // Красим хедер при скролле

  $(document).scroll(function() {
    if (!isWindowWidthMobile()) {
      if (!isOffsetZero()) {
        changeColorsToBright();
      } else {
        resetColors();
      }
    }
  });

  // Красим хедер при ресайзе окна

  $(window).resize(function() {
    if (isWindowWidthMobile()) {
      changeColorsToBright();
    } else {
      if (!isOffsetZero()) {
        changeColorsToBright();
      } else {
        resetColors();
      }
    }
  });
});
