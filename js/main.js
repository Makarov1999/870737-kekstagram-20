'use strict';

(function () {
  var photosCount = 25;

  // var photos = window.data.generateRandomPhotos(photosCount);
  window.server.load('https://javascript.pages.academy/kekstagram/data', window.gallery.renderPhotos, function () {});

})();
