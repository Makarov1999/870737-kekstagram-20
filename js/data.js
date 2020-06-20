'use strict';

(function () {
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

  window.data = {
    generateRandomPhotos: generateRandomPhotos
  };

})();
