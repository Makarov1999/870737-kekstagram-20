'use strict';

(function () {

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var picturesList = document.querySelector('.pictures');

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photo = window.picture.createPhotoElement(photos[i]);
      fragment.appendChild(photo);
    }
    picturesList.appendChild(fragment);
    var pictureElements = document.querySelectorAll('.picture');
    for (var i = 0; i < pictureElements.length; i++) {
      window.preview.pictureHandler(pictureElements[i], photos[i]);
    }
  };

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  window.gallery = {
    renderPhotos: renderPhotos
  };
})();
