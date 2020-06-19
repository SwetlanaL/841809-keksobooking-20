'use strict';

var PinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  ARROW_HEIGHT: 18,
};

var RoomNumber = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
};

var GuestNumber = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  NOT_FOR_GUESTS: '100',
};

var appLocationMap = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('input[name="address"]');
var roomNumberSelection = adForm.querySelector('select[name="rooms"]');
var guestNumberSelection = adForm.querySelector('select[name="capacity"]');

var changeAccessibilty = function (itemList) {
  Array.from(itemList).forEach(function (item) {
    item.disabled = !item.disabled;
  });
};

changeAccessibilty(formFieldset, true);

var mainPinStartPosition = function () {
  var x = 0;
  var y = 0;

  if (changeAccessibilty) {
    x = mainPin.offsetLeft + (PinSize.WIDTH / 2);
    y = mainPin.offsetTop + (PinSize.HEIGHT / 2) + PinSize.ARROW_HEIGHT;
  } else {
    x = mainPin.offsetLeft + (PinSize.WIDTH / 2);
    y = mainPin.offsetTop + (PinSize.HEIGHT / 2);
  }
  applyMainPinPositionToAddress(x, y);
};

var applyMainPinPositionToAddress = function (x, y) {
  addressInput.value = Math.floor(x) + ', ' + Math.floor(y);
};

var activatePage = function () {
  changeAccessibilty(formFieldset, false);
  appLocationMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(createElements(getArray(), pinTemplate));
  mainPinStartPosition();
  mainPin.style.zIndex = '2';
};

var onEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activatePage();
  }
};

var onMouseDown = function (evt) {
  if (evt.which === 1) {
    evt.preventDefault();
    activatePage();
  }
};

var validateGuestNumber = function () {
  var warningMessage = '';

  if (roomNumberSelection.value === RoomNumber.ONE) {
    if (guestNumberSelection.value !== GuestNumber.ONE) {
      warningMessage = 'Выберите не более одного гостя';
    }
  } else if (roomNumberSelection.value === RoomNumber.TWO) {
    if (guestNumberSelection.value !== GuestNumber.TWO && guestNumberSelection.value !== GuestNumber.ONE) {
      warningMessage = 'Вы можете выбрать не более двух гостей';
    }
  } else if (roomNumberSelection.value === RoomNumber.THREE) {
    if (guestNumberSelection.value !== GuestNumber.THREE && guestNumberSelection.value !== GuestNumber.TWO && guestNumberSelection.value !== GuestNumber.ONE) {
      warningMessage = 'Вы можете выбрать не более трёх гостей';
    }
  } else if (roomNumberSelection.value === RoomNumber.HUNDRED) {
    if (guestNumberSelection.value !== GuestNumber.NOT_FOR_GUESTS) {
      warningMessage = 'Это предложение не предназначено для гостей';
    }
  }
  guestNumberSelection.setCustomValidity(warningMessage);
};

var startPage = function () {
  mainPin.addEventListener('keydown', onEnterPress);
  mainPin.addEventListener('mousedown', onMouseDown);
  adForm.addEventListener('change', function (evt) {
    if (evt.target === guestNumberSelection || evt.target === roomNumberSelection) {
      validateGuestNumber();
    }
  });
};

mainPin.removeEventListener('keydown', onEnterPress);
mainPin.removeEventListener('mousedown', onMouseDown);

startPage();

var ADS_NUMBER = 8;
var TITLE = 'Прелестная квартира в центре';
var PRICE = 1;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = 1;
var GUESTS = 1;
var TIME_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = 'Описание';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var MAP_PIN_WIDTH = 65;

var getRandomNumberInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = getRandomNumberInRange(0, array.length - 1);
    var randomElement = array[randomIndex];
  }
  return randomElement;
};

var getRandomElementsArray = function (initialArray) {
  var newArray = [];
  var arrayCopy = initialArray.slice();
  for (var i = 0; i <= getRandomNumberInRange(0, initialArray.length - 1); i++) {
    var randomElement = getRandomElement(arrayCopy);
    newArray.push(randomElement);
    arrayCopy.splice(arrayCopy.indexOf(randomElement), 1);
  }
  return newArray;
};

var getUserAvatars = function () {
  var userAvatars = [];
  var image = '';
  for (var i = 0; i < ADS_NUMBER; i++) {
    image = 'img/avatars/user0' + getRandomNumberInRange(1, 8) + '.png';
    userAvatars.push(image);
  }
  return userAvatars;
};

var AVATAR = getUserAvatars();

function getObject() {
  var locationX = getRandomNumberInRange(0, MAP_WIDTH - MAP_PIN_WIDTH);
  var locationY = getRandomNumberInRange(130, 630);

  var object = {
    author: {
      avatar: getRandomElement(AVATAR),
    },
    offer: {
      title: TITLE,
      address: locationX + ', ' + locationY,
      price: PRICE,
      type: getRandomElement(TYPES),
      rooms: getRandomNumberInRange(ROOMS, 5),
      guests: getRandomNumberInRange(GUESTS, 5),
      checkin: getRandomElement(TIME_CHECKIN_CHECKOUT),
      checkout: getRandomElement(TIME_CHECKIN_CHECKOUT),
      features: getRandomElementsArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomElementsArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
  return object;
}

var getArray = function () {
  var objectsArray = [];
  for (var i = 0; i < ADS_NUMBER; i++) {
    objectsArray.push(getObject());
  }
  return objectsArray;
};

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPinTemplate = function (element) {
  var pin = pinTemplate.cloneNode(true);
  pin.querySelector('img').src = element.author.avatar;
  pin.querySelector('img').alt = element.offer.title;
  pin.style.left = element.location.x + 'px';
  pin.style.top = element.location.y + 'px';
  return pin;
};

var createElements = function (array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPinTemplate(array[i], template));
  }
  return fragment;
};
