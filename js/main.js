'use strict';

// var MAP_WIDTH = 1200;
// var MAP_PIN_WIDTH = 65;
//
// //
//
//
//
// var mapPins = document.querySelector('.map__pins');
// var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//
// var renderPinTemplate = function (ad) {
//   var pin = pinTemplate.cloneNode(true);
//   pin.querySelector('img').src = ad.avatar;
//   pin.querySelector('img').alt = ad.title;
//   pin.style.left = ad.locationX + 'px';
//   pin.style.top = ad.locationY + 'px';
//   return pin;
// };
//
// var generateRandomAds = function () {
//   var randomAds = [];
//   for (var i = 0; i < AD_DATA.ADS_NUMBER; i++) {
//     randomAds.push({
//       avatar: getRandomElement(AD_DATA.AUTHOR.AVATAR),
//       title: getRandomElement(AD_DATA.OFFER.TITLE),
//       price: getRandomElement(AD_DATA.OFFER.PRICE),
//       type: getRandomElement(AD_DATA.OFFER.TYPE),
//       rooms: getRandomElement(AD_DATA.OFFER.ROOMS),
//       guests: getRandomElement(AD_DATA.OFFER.GUESTS),
//       checkin: getRandomElement(AD_DATA.OFFER.CHECKIN),
//       checkout: getRandomElement(AD_DATA.OFFER.CHECKOUT),
//       features: AD_DATA.OFFER.FEATURES,
//       description: getRandomElement(AD_DATA.OFFER.DESCRIPTION),
//       photos: getRandomElement(AD_DATA.OFFER.PHOTOS),
//       locationX: getRandomElement(AD_DATA.LOCATION.X),
//       locationY: getRandomElement(AD_DATA.LOCATION.Y),
//     });
//   }
//   return randomAds;
// };
//
// var renderPins = function () {
//   var fragment = document.createDocumentFragment();
//   var pins = generateRandomAds();
//   for (var i = 0; i < pins.length; i++) {
//     fragment.appendChild(renderPinTemplate(pins[i]));
//   }
//   mapPins.appendChild(fragment);
// };
//
// renderPins();
var appLocationMap = document.querySelector('.map');
appLocationMap.classList.remove('map--faded');

var ADS_NUMBER = 8;
var TITLE = 'Прелестная квартира в центре';
var ADDRESS = '600, 350';
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

var renderPinTemplate = function (element, template) {
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

mapPins.appendChild(createElements(getArray(), pinTemplate));
