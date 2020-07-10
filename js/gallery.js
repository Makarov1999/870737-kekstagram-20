'use strict';

(function () {

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var picturesList = document.querySelector('.pictures');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var filtersButtonContainer = document.querySelector('.img-filters__form');
  var loadedPhotos = [];
  var DEBOUNCE_INTERVAL = 500;


  var debounceFilter = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


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

  var setFilters = function (filterButtonId) {
    var photosCount = 10;
    switch (filterButtonId) {
      case 'filter-default':
        showDefaultPhotos();
        break;

      case 'filter-random':
        showRandomPhotos(loadedPhotos, photosCount);

        break;

      case 'filter-discussed':
        showDiscussedPhotos(loadedPhotos);
        break;

      default:
        showDefaultPhotos();
    }
  };

  var debouncePhotoFilter = debounceFilter(setFilters);

  var onSuccessPhotoLoad = function (photos) {
    loadedPhotos = photos;
    renderPhotos(photos);
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');

    filtersButtonContainer.addEventListener('click', function (evt) {
      var filterId = evt.target.id;
      if (!evt.target.classList.contains('img-filters__button--active')) {
        resetFilterButtons();
        evt.target.classList.add('img-filters__button--active');
        debouncePhotoFilter(filterId);
      }
    });

    filtersButtonContainer.addEventListener('keydown', function (evt) {
      var filterId = evt.target.id;
      if (evt.key === 'Enter') {
        if (!evt.target.classList.contains('img-filters__button--active')) {
          resetFilterButtons();
          evt.target.classList.add('img-filters__button--active');
          debouncePhotoFilter(filterId);
        }
      }
    });
  };

  window.gallery = {
    onSuccessLoad: onSuccessPhotoLoad,
    renderPhotos: renderPhotos
  };
})();
