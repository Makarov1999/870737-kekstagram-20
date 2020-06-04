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
  'Павел'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');
var photosCount = 25;

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

var generateRandomCommentsFromArray = function (commentsArray, namesArray) {
  var comments = [];
  var amountCommentsMax = 4;
  var amountCommentsMin = 1;
  var avatarNumberMax = 6;
  var avatarNumberMin = 1;
  var commentsCount = getRandomNumberFromRange(amountCommentsMin, amountCommentsMax);
  for (var i = 0; i < commentsCount; i++) {
    var avatar = 'img/avatar-' + getRandomNumberFromRange(avatarNumberMin, avatarNumberMax) + '.svg';
    var message = getRandElementOfArray(commentsArray);
    var name = getRandElementOfArray(namesArray);
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

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photo = createPhotoElement(photos[i]);
    fragment.appendChild(photo);
  }
  picturesList.appendChild(fragment);
};

var photos = generateRandomPhotos(photosCount);
renderPhotos(photos);
