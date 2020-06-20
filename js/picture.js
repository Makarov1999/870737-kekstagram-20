'use strict';


(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };

  window.picture = {
    createPhotoElement: createPhotoElement
  };

})();
