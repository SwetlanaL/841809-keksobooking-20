'use strict';

var MAP_WIDTH = 1200;
var MAP_PIN_WIDTH = 65;

var AD_DATA = {
  ADS_NUMBER: 8,
  AUTHOR: {
    AVATAR: [''],
  },
  OFFER: {
    TITLE: ['Прелестная квартира в центре'],
    ADDRESS: ['600, 350'],
    PRICE: [1],
    TYPE: ['palace', 'flat', 'house', 'bungalo'],
    ROOMS: [1],
    GUESTS: [1],
    CHECKIN: ['12:00', '13:00', '14:00'],
    CHECKOUT: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTION: [''],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  },
  LOCATION: {
    X: [MAP_WIDTH - MAP_PIN_WIDTH / 2],
    Y: [130],
  }
};

var appLocationMap = document.querySelector('.map');
appLocationMap.classList.remove('map--faded');

var getUserAvatars = function () {
  var userAvatars = [];
  var firstFigure = 0;
  var image = '';
  for (var i = 1; i <= AD_DATA.ADS_NUMBER; i++) {
    image = 'img/avatars/user' + firstFigure + i + '.png';
    userAvatars.push(image);
  }
  return userAvatars;
};

AD_DATA.AUTHOR.AVATAR = getUserAvatars();

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getLocationY = function () {
  var locationY = [];
  for (var i = 0; i < AD_DATA.ADS_NUMBER; i++) {
    AD_DATA.LOCATION.Y = getRandomNumber(130, 600);
    locationY.push(AD_DATA.LOCATION.Y);
  }
  return locationY;
};

AD_DATA.LOCATION.Y = getLocationY();

var getLocationX = function () {
  var locationX = [];
  for (var i = 0; i < AD_DATA.ADS_NUMBER; i++) {
    AD_DATA.LOCATION.X = getRandomNumber(MAP_PIN_WIDTH / 2, MAP_WIDTH - MAP_PIN_WIDTH / 2);
    locationX.push(AD_DATA.LOCATION.X);
  }
  return locationX;
};

AD_DATA.LOCATION.X = getLocationX();

var getRandomElement = function (array, elem) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = getRandomNumber(0, array.length - 1);
    var randomElement = array[randomIndex];
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(randomIndex, 1);
    }
  }
  return randomElement;
};

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPinTemplate = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  pin.querySelector('img').src = ad.avatar;
  pin.querySelector('img').alt = ad.title;
  pin.style.left = ad.locationX + 'px';
  pin.style.top = ad.locationY + 'px';
  return pin;
};

var generateRandomAds = function () {
  var randomAds = [];
  for (var i = 0; i < AD_DATA.ADS_NUMBER; i++) {
    randomAds.push({
      avatar: getRandomElement(AD_DATA.AUTHOR.AVATAR),
      title: getRandomElement(AD_DATA.OFFER.TITLE),
      price: getRandomElement(AD_DATA.OFFER.PRICE),
      type: getRandomElement(AD_DATA.OFFER.TYPE),
      rooms: getRandomElement(AD_DATA.OFFER.ROOMS),
      guests: getRandomElement(AD_DATA.OFFER.GUESTS),
      checkin: getRandomElement(AD_DATA.OFFER.CHECKIN),
      checkout: getRandomElement(AD_DATA.OFFER.CHECKOUT),
      features: getRandomElement(AD_DATA.OFFER.FEATURES),
      description: getRandomElement(AD_DATA.OFFER.DESCRIPTION),
      photos: getRandomElement(AD_DATA.OFFER.PHOTOS),
      locationX: getRandomElement(AD_DATA.LOCATION.X),
      locationY: getRandomElement(AD_DATA.LOCATION.Y),
    });
  }
  return randomAds;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  var pins = generateRandomAds();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPinTemplate(pins[i]));
  }
  mapPins.appendChild(fragment);
};

renderPins();
