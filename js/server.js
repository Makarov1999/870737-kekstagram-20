'use strict';

(function () {
  var URL_TO_SEND = 'https://javascript.pages.academy/kekstagram';
  var loadPhotos = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open('GET', url);
    xhr.send();
  };

  var savePhoto = function (data, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }


    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_TO_SEND);
    xhr.send(data);
  };


  window.server = {
    load: loadPhotos,
    save: savePhoto
  };
})();
