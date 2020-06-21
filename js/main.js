'use strict';

(function () {
  var photosCount = 25;

  var photos = window.data.generateRandomPhotos(photosCount);
  window.gallery.renderPhotos(photos);

  var pictureElements = document.querySelectorAll('.picture');
  for (var i = 0; i < pictureElements.length; i++) {
    window.preview.pictureHandler(pictureElements[i], photos[i]);
  }

})();
