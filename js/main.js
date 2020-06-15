'use strict';

var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var COMMENTS_AUTHORS = [
  'Анна',
  'Екатерина',
  'Юрий',
  'Дмитрий',
  'Мария',
  'Роман',
  'София',
  'Павел'
];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
var picturesList = document.querySelector('.pictures');
var photosCount = 25;
var bigPictureElement = document.querySelector('.big-picture');
var commentsList = document.querySelector('.social__comments');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var uploadFileField = document.querySelector('#upload-file');
var bodyOfPage = document.querySelector('body');
var editPhotoForm = document.querySelector('.img-upload__overlay');
var editFormCloseButton = document.querySelector('.img-upload__cancel');
var reduceScaleButton = document.querySelector('.scale__control--smaller');
var improveScaleButton = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var previewImage = document.querySelector('.img-upload__preview img');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectChooseRadios = document.querySelectorAll('.effects__radio');
var hashtagsInput = document.querySelector('.text__hashtags');


var getRandElementOfArray = function (array) {
  var randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex];
};

var getRandomNumberFromRange = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

var Picture = function (url, description, likes, comments) {
  this.url = url;
  this.description = description;
  this.likes = likes;
  this.comments = comments;
};

var CommentToPhoto = function (avatar, message, name) {
  this.avatar = avatar;
  this.message = message;
  this.name = name;
};

var generateRandomCommentsFromArray = function (commentsToPhoto, namesOfAuthors) {
  var comments = [];
  var amountCommentsMax = 4;
  var amountCommentsMin = 1;
  var avatarNumberMax = 6;
  var avatarNumberMin = 1;
  var commentsCount = getRandomNumberFromRange(amountCommentsMin, amountCommentsMax);
  for (var i = 0; i < commentsCount; i++) {
    var avatar = 'img/avatar-' + getRandomNumberFromRange(avatarNumberMin, avatarNumberMax) + '.svg';
    var message = getRandElementOfArray(commentsToPhoto);
    var name = getRandElementOfArray(namesOfAuthors);
    var comment = new CommentToPhoto(avatar, message, name);
    comments.push(comment);
  }
  return comments;
};

var generateRandomPhotos = function (amount) {
  var photos = [];

  for (var i = 1; i <= amount; i++) {
    var url = 'photos/' + i + '.jpg';
    var description = 'Описание ' + i;
    var likes = getRandomNumberFromRange(15, 200);
    var comments = generateRandomCommentsFromArray(PHOTO_COMMENTS, COMMENTS_AUTHORS);
    var photo = new Picture(url, description, likes, comments);
    photos.push(photo);
  }
  return photos;

};

var createPhotoElement = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};

var createCommentElement = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photo = createPhotoElement(photos[i]);
    fragment.appendChild(photo);
  }
  picturesList.appendChild(fragment);
};

var showBigPicture = function (photo) {
  var comments = photo.comments;
  var fragment = document.createDocumentFragment();
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;
  for (var i = 0; i < comments.length; i++) {
    var comment = createCommentElement(comments[i]);
    fragment.appendChild(comment);
  }
  commentsList.appendChild(fragment);
};


var onFormEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
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

uploadFileField.addEventListener('change', function () {
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

effectLevelPin.addEventListener('mouseup', function () {
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

});

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

var photos = generateRandomPhotos(photosCount);

renderPhotos(photos);
showBigPicture(photos[0]);
bigPictureElement.classList.add('hidden');
socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');
