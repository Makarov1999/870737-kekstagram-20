'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseButton = document.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');

  var createCommentElement = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };


  var pictureHandler = function (pictureElement, photo) {
    console.log(pictureElement);
    pictureElement.addEventListener('click', function () {
      var comments = photo.comments;
      var fragment = document.createDocumentFragment();
      openBigPicture();
      bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
      bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
      bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = photo.description;
      for (var i = 0; i < comments.length; i++) {
        var comment = createCommentElement(comments[i]);
        fragment.appendChild(comment);
      }
      commentsList.appendChild(fragment);
    });
  };

  var openBigPicture = function () {
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    var commentsToDel = document.querySelectorAll('.social__comment');
    for (var i = 0; i < commentsToDel.length; i++) {
      commentsToDel[i].remove();
    }

    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  bigPictureCloseButton.addEventListener('click', function () {
    closeBigPicture();
  });

  bigPictureCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeBigPicture();
    }
  });

  window.preview = {
    pictureHandler: pictureHandler
  };

})();
