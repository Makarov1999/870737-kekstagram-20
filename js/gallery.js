'use strict';

(function () {

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var picturesList = document.querySelector('.pictures');
  var filterDefaultButton = document.querySelector('#filter-default');
  var filterRandomButton = document.querySelector('#filter-random');
  var filterDiscussedButton = document.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var loadedPhotos = [];

  var resetFilterButtons = function () {
    for (var i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i].classList.contains('img-filters__button--active')) {
        filterButtons[i].classList.remove('img-filters__button--active');
        break;
      }
    }
  };

  var clearPhotosList = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].remove();
    }
  };

  var renderPhotos = function (photos) {
    var pictures = document.querySelectorAll('.picture');
    if (pictures) {
      for (var i = 0; i < pictures.length; i++) {
        pictures[i].remove();
      }
    }

    var fragment = document.createDocumentFragment();
    for (i = 0; i < photos.length; i++) {
      var photo = window.picture.createPhotoElement(photos[i]);
      fragment.appendChild(photo);
    }
    picturesList.appendChild(fragment);
    var pictureElements = document.querySelectorAll('.picture');
    for (var j = 0; j < pictureElements.length; j++) {
      window.preview.pictureHandler(pictureElements[j], photos[j]);
    }
  };

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  var showDefaultPhotos = function () {
    clearPhotosList();
    renderPhotos(loadedPhotos);
  };

  var showRandomPhotos = function (photos, photosCount) {
    clearPhotosList();
    var photosCopy = photos.slice();
    var resultPhotos = [];
    for (var i = 0; i < photosCount; i++) {
      var photo = window.data.getRandElementOfArray(photosCopy);
      photosCopy.splice(photosCopy.indexOf(photo), 1);
      resultPhotos.push(photo);
    }
    renderPhotos(resultPhotos);
  };

  var showDiscussedPhotos = function (photos) {
    clearPhotosList();
    renderPhotos(
        photos.slice().sort(function (left, right) {
          if (left.comments.length > right.comments.length) {
            return -1;

          } else if (left.comments.length === right.comments.length) {
            return 0;

          } else {
            return 1;
          }
        }));
  };

  var onSuccessPhotoLoad = function (photos) {
    loadedPhotos = photos;
    renderPhotos(photos);
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');

    filterDefaultButton.addEventListener('click', function () {
      if (!filterDefaultButton.classList.contains('img-filters__button--active')) {
        resetFilterButtons();
        filterDefaultButton.classList.add('img-filters__button--active');
        showDefaultPhotos();
      }
    });

    filterDefaultButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        if (!filterDefaultButton.classList.contains('img-filters__button--active')) {
          resetFilterButtons();
          filterDefaultButton.classList.add('img-filters__button--active');
          showDefaultPhotos(loadedPhotos);
        }
      }
    });

    filterRandomButton.addEventListener('click', function () {
      if (!filterRandomButton.classList.contains('img-filters__button--active')) {
        resetFilterButtons();
        filterRandomButton.classList.add('img-filters__button--active');
        showRandomPhotos(loadedPhotos, 10);
      }
    });

    filterRandomButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        if (!filterRandomButton.classList.contains('img-filters__button--active')) {
          resetFilterButtons();
          filterRandomButton.classList.add('img-filters__button--active');
          showRandomPhotos(loadedPhotos, 10);
        }
      }
    });

    filterDiscussedButton.addEventListener('click', function () {
      if (!filterDiscussedButton.classList.contains('img-filters__button--active')) {
        resetFilterButtons();
        filterDiscussedButton.classList.add('img-filters__button--active');
        showDiscussedPhotos(loadedPhotos);
      }
    });

    filterDiscussedButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        if (!filterDiscussedButton.classList.contains('img-filters__button--active')) {
          resetFilterButtons();
          filterDiscussedButton.classList.add('img-filters__button--active');
          showDiscussedPhotos(loadedPhotos);
        }
      }
    });


  };

  window.gallery = {
    onSuccessLoad: onSuccessPhotoLoad,
    renderPhotos: renderPhotos
  };
})();
