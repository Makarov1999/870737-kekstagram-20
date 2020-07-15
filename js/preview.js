'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseButton = document.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsLoaded = 0;
  var comments = [];


  var createCommentElement = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var onCommentLoaderPress = function () {
    var fragment = document.createDocumentFragment();
    if (comments.length - commentsLoaded >= 5) {
      for (var i = commentsLoaded; i < commentsLoaded + 5; i++) {
        var comment = createCommentElement(comments[i]);
        fragment.appendChild(comment);
      }
      commentsList.appendChild(fragment);
      commentsLoaded = commentsLoaded + 5;
      socialCommentCount.textContent = '';
      socialCommentCount.insertAdjacentHTML('afterbegin', commentsLoaded + ' из <span class="comments-count">' + comments.length + '</span> комментариев');
    } else {
      for (i = commentsLoaded; i < comments.length; i++) {
        comment = createCommentElement(comments[i]);
        fragment.appendChild(comment);
      }
      commentsList.appendChild(fragment);
      commentsLoaded = comments.length;
      socialCommentCount.textContent = '';
      socialCommentCount.insertAdjacentHTML('afterbegin', commentsLoaded + ' из <span class="comments-count">' + comments.length + '</span> комментариев');
      commentsLoader.classList.add('hidden');
    }
  };

  var onCommentLoaderEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      onCommentLoaderPress();
    }
  };

  var pictureHandler = function (pictureElement, photo) {
    pictureElement.addEventListener('click', function () {
      commentsLoaded = 0;
      comments = photo.comments;
      var startCommentsCount = 5;
      var fragment = document.createDocumentFragment();
      openBigPicture();
      bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
      bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
      bigPictureElement.querySelector('.social__caption').textContent = photo.description;
      if (comments.length >= 5) {
        if (commentsLoader.classList.contains('hidden')) {
          commentsLoader.classList.remove('hidden');
        }
        for (var i = 0; i < startCommentsCount; i++) {
          var comment = createCommentElement(comments[i]);
          fragment.appendChild(comment);
          socialCommentCount.textContent = '';
          socialCommentCount.insertAdjacentHTML('afterbegin', '5 из <span class="comments-count">' + comments.length + '</span> комментариев');
        }
        commentsLoaded = 5;

        commentsLoader.addEventListener('click', onCommentLoaderPress);
        commentsLoader.addEventListener('keydown', onCommentLoaderEnterPress);

      } else {
        for (i = 0; i < comments.length; i++) {
          comment = createCommentElement(comments[i]);
          fragment.appendChild(comment);
        }
        commentsLoaded = comments.length;
        socialCommentCount.textContent = '';
        socialCommentCount.insertAdjacentHTML('afterbegin', comments.length + ' из <span class="comments-count">' + comments.length + '</span> комментариев');
        commentsLoader.classList.add('hidden');
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
    commentsLoader.removeEventListener('click', onCommentLoaderPress);
    commentsLoader.removeEventListener('keydown', onCommentLoaderEnterPress);
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
