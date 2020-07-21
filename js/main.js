'use strict';

(function () {
  var PHOTOS_DATA_URL = 'https://javascript.pages.academy/kekstagram/data';
  window.server.load(PHOTOS_DATA_URL, window.gallery.onSuccessLoad, function () {});


})();
