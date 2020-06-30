'use strict';

(function () {
  var formToPhotoLoad = document.querySelector('.img-upload__form');
  var successMessageTemplate = document.querySelector('#success').content;
  var errorMessageTemplate = document.querySelector('#error').content;
  var mainPageContent = document.querySelector('main');

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('click', onSuccessMessageDocPress);
    document.removeEventListener('keydown', onSuccesMessageEscPress);
  };

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('click', onErrorMessageDocPress);
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  var onSuccesMessageEscPress = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  };

  var onSuccessMessageDocPress = function (evt) {
    evt.preventDefault();
    closeSuccessMessage();
  };

  var onErrorMessageDocPress = function (evt) {
    evt.preventDefault();
    closeErrorMessage();
  };

  var onErrorMessageEscPress = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  };

  var onSuccessSend = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    mainPageContent.appendChild(successMessage);
    var successMessageCloseButton = document.querySelector('.success__button');
    window.form.close();
    successMessageCloseButton.addEventListener('click', function () {
      closeSuccessMessage();
    });
    document.addEventListener('click', onSuccessMessageDocPress);
    document.addEventListener('keydown', onSuccesMessageEscPress);
  };

  var onErrorSend = function () {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    mainPageContent.appendChild(errorMessage);
    var errorMessageCloseButton = document.querySelector('.error__button');
    window.form.close();
    errorMessageCloseButton.addEventListener('click', function () {
      closeErrorMessage();
    });

    document.addEventListener('click', onErrorMessageDocPress);
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  formToPhotoLoad.addEventListener('submit', function (evt) {
    window.server.save(new FormData(formToPhotoLoad), onSuccessSend, onErrorSend);
    evt.preventDefault();
  });
})();
