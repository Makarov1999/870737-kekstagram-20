'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var PHOTOS_COUNT = 10;
  var picturesList = document.querySelector('.pictures');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var filtersButtonContainer = document.querySelector('.img-filters__form');
  var loadedPhotos = [];

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


  var showDefaultPhotos = function () {
    renderPhotos(loadedPhotos);
  };

  var showRandomPhotos = function (photos, photosCount) {
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
    switch (filterButtonId) {
      case 'filter-default':
        showDefaultPhotos();
        break;

      case 'filter-random':
        showRandomPhotos(loadedPhotos, PHOTOS_COUNT);

        break;

      case 'filter-discussed':
        showDiscussedPhotos(loadedPhotos);
        break;

      default:
        showDefaultPhotos();
    }
  };

  var debouncePhotoFilter = debounceFilter(setFilters);

  var applyPhotoFilter = function (photoFilter, idOfFilter) {
    if (!photoFilter.classList.contains('img-filters__button--active')) {
      resetFilterButtons();
      photoFilter.classList.add('img-filters__button--active');
      debouncePhotoFilter(idOfFilter);
    }
  };

  var onSuccessPhotoLoad = function (photos) {
    loadedPhotos = photos;
    renderPhotos(photos);
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');

    filtersButtonContainer.addEventListener('click', function (evt) {
      var filterId = evt.target.id;
      applyPhotoFilter(evt.target, filterId);
    });

    filtersButtonContainer.addEventListener('keydown', function (evt) {
      var filterId = evt.target.id;
      if (evt.key === 'Enter') {
        applyPhotoFilter(evt.target, filterId);
      }
    });
  };

  window.gallery = {
    onSuccessLoad: onSuccessPhotoLoad,
    renderPhotos: renderPhotos
  };
})();
