'use strict';

(function () {

  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var bodyOfPage = document.querySelector('body');
  var uploadFileField = document.querySelector('#upload-file');
  var editFormCloseButton = document.querySelector('.img-upload__cancel');
  var commentInput = document.querySelector('.text__description');
  var reduceScaleButton = document.querySelector('.scale__control--smaller');
  var improveScaleButton = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var previewImage = document.querySelector('.img-upload__preview img');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectChooseRadios = document.querySelectorAll('.effects__radio');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var DEFAULT_EFFECT_VALUE = '20';
  var IMAGE_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

  var resetForm = function () {
    var originalRadio = getOriginalEffect(effectChooseRadios);
    originalRadio.checked = true;
    scaleValue.value = '100%';
    previewImage.style.transform = '';
    effectLevelValue.value = DEFAULT_EFFECT_VALUE;
    effectLevelPin.style.left = '';
    effectLevelDepth.style.width = '';
    hashtagsInput.value = '';
    commentInput.value = '';
    uploadFileField.value = '';
  };


  var openForm = function () {
    editPhotoForm.classList.remove('hidden');
    bodyOfPage.classList.add('modal-open');
    document.addEventListener('keydown', onFormEscPress);
  };

  var closeForm = function () {
    editPhotoForm.classList.add('hidden');
    bodyOfPage.classList.remove('modal-open');
    document.removeEventListener('keydown', onFormEscPress);
    resetForm();

  };

  var getOriginalEffect = function (radios) {
    var originalEffect = {};
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value === 'none') {
        originalEffect = radios[i];
      }
    }
    return originalEffect;
  };

  var isHashtagsTooLong = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > 20) {
        return true;
      }
    }
    return false;
  };

  var isHashtagsRepeat = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtags[i] === hashtags[j]) {
          return true;
        }
      }
    }
    return false;
  };

  var isHashtagsCorrect = function (hashtags) {
    var hashtagTemplate = /^#[a-zа-я0-9]+$/;
    for (var i = 0; i < hashtags.length; i++) {
      if (!(hashtagTemplate.test(hashtags[i]))) {
        return false;
      }
    }
    return true;
  };

  var onFormEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeForm();
    }
  };

  uploadFileField.addEventListener('change', function () {
    var imageFile = uploadFileField.files[0];
    var imageFileName = imageFile.name.toLowerCase();

    var isImageFileMatch = IMAGE_FILE_EXTENSIONS.some(function (imageExtension) {
      return imageFileName.endsWith(imageExtension);
    });

    if (isImageFileMatch) {
      var imageFileReader = new FileReader();
      imageFileReader.addEventListener('load', function () {
        previewImage.src = imageFileReader.result;
      });
      imageFileReader.readAsDataURL(imageFile);
    }

    openForm();
  });

  editFormCloseButton.addEventListener('click', function () {
    closeForm();
  });

  uploadFileField.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openForm();
    }
  });

  editFormCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeForm();
    }
  });

  commentInput.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  reduceScaleButton.addEventListener('click', function () {
    if (!(scaleValue.value === '25%')) {
      var valueScale = Number(scaleValue.value.slice(0, scaleValue.value.length - 1)) * 0.01;
      var newValue = valueScale - 0.25;
      previewImage.style.transform = 'scale(' + newValue + ')';
      scaleValue.value = newValue * 100 + '%';
    }

  });

  improveScaleButton.addEventListener('click', function () {
    if (!(scaleValue.value === '100%')) {
      var valueScale = Number(scaleValue.value.slice(0, scaleValue.value.length - 1)) * 0.01;
      var newValue = valueScale + 0.25;
      previewImage.style.transform = 'scale(' + newValue + ')';
      scaleValue.value = newValue * 100 + '%';
    }
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPosition = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startPosition - moveEvt.clientX;
      startPosition = moveEvt.clientX;
      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = '0px';
      } else if (effectLevelPin.offsetLeft > effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;

      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      effectLevelValue.value = String(Math.round((effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth) * 100));
      changePictureEffect();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var changePictureEffect = function () {
    var chosenEffect = '';
    for (var i = 0; i < effectChooseRadios.length; i++) {
      if (effectChooseRadios[i].checked) {
        chosenEffect = effectChooseRadios[i].value;
        break;
      }
    }

    var chosenEffectClass = 'effects__preview';

    var startIntensity = Number(effectLevelValue.value) * 0.01;
    switch (chosenEffect) {
      case 'none':
        previewImage.className = '';
        previewImage.style.filter = '';

        break;

      case 'chrome':
        previewImage.className = '';
        previewImage.style.filter = '';
        previewImage.className = chosenEffectClass + '--chrome';
        previewImage.style.filter = 'grayscale(' + startIntensity + ')';
        break;

      case 'sepia':
        previewImage.className = '';
        previewImage.style.filter = '';
        previewImage.className = chosenEffectClass + '--sepia';
        previewImage.style.filter = 'sepia(' + startIntensity + ')';
        break;

      case 'marvin':
        previewImage.className = '';
        previewImage.style.filter = '';
        previewImage.className = chosenEffectClass + '--marvin';
        previewImage.style.filter = 'invert(' + startIntensity * 100 + '%)';
        break;

      case 'phobos':
        previewImage.className = '';
        previewImage.style.filter = '';
        previewImage.className = chosenEffectClass + '--phobos';
        previewImage.style.filter = 'blur(' + Math.round(startIntensity * 3) + 'px)';
        break;

      case 'heat':
        previewImage.className = '';
        previewImage.style.filter = '';
        previewImage.className = chosenEffectClass + '--heat';
        previewImage.style.filter = 'brightness(' + (1 + startIntensity * 2) + ')';
        break;

      default:
        previewImage.className = '';
        previewImage.style.filter = '';
    }
  };


  hashtagsInput.addEventListener('change', function () {

    var hashtagsText = hashtagsInput.value.toLocaleLowerCase();
    var hashtags = hashtagsText.split(' ');
    if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('Нельзя добавлять больше 5 хештегов');
    } else if (isHashtagsTooLong(hashtags)) {
      hashtagsInput.setCustomValidity('В хештеге не может быть больше 20 символов, включая #');
    } else if ((!isHashtagsCorrect(hashtags))) {
      hashtagsInput.setCustomValidity('Хештег должен начинаться с решетки и не может включать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи');
    } else if (isHashtagsRepeat(hashtags)) {
      hashtagsInput.setCustomValidity('Хештеги не должны повторяться');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });

  hashtagsInput.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  window.form = {
    close: closeForm
  };

})();
