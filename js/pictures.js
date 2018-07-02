'use strict';

(function () {
  var generateComments = function () {
    var commentsCount = Math.ceil(Math.random() * window.COMMENTS_MAX_COUNT);
    var comments = [];
    while (comments.length < commentsCount) {
      var comment = window.COMMENT_PATTERNS[Math.floor(Math.random() * (window.COMMENT_PATTERNS.length))];
      if (comments.indexOf(comment) === -1) {
        comments.push(comment);
      }
    }
    return comments;
  };

  var createPost = function (num) {
    var post = {
      url: 'photos/' + num + '.jpg',
      likes: Math.floor(Math.random() * (window.LIKES_MAX_COUNT - window.LIKES_MIN_COUNT)) + window.LIKES_MIN_COUNT,
      comments: generateComments(),
      description: window.DESCRIPTION_PATTERNS[Math.floor(Math.random() * (window.DESCRIPTION_PATTERNS.length))],
      element: 'pic' + num
    };
    return post;
  };

  var createPosts = function (cnt) {
    var picturesIds = [];
    while (picturesIds.length < cnt) {
      var pictureId = Math.ceil(Math.random() * cnt);
      if (picturesIds.indexOf(pictureId) === -1) {
        picturesIds.push(pictureId);
      }
    }
    var posts = [];
    for (var i = 0; i < cnt; i++) {
      posts[i] = createPost(picturesIds[i]);
    }
    return posts;
  };

  var renderPics = function (post) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__img').id = post.element;
    pictureElement.querySelector('.picture__stat--likes').textContent = post.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = post.comments.length;
    return pictureElement;
  };

  var renderPost = function (post) {
    window.bigPicture.classList.remove('hidden');
    window.bigPicture.querySelector('.big-picture__img img').src = post.url;
    window.bigPicture.querySelector('.likes-count').textContent = post.likes;
    window.bigPicture.querySelector('.comments-count').textContent = post.comments.length;
    window.bigPicture.querySelector('.social__comments').innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < post.comments.length; i++) {
      var avatar = Math.ceil(Math.random() * 5);
      var commentElement = window.commentTemplate.cloneNode(true);
      commentElement.querySelector('img').src = 'img/avatar-' + avatar + '.svg';
      commentElement.querySelector('p').textContent = post.comments[i];
      fragment.appendChild(commentElement);
    }
    window.bigPicture.querySelector('.social__comments').appendChild(fragment);
    window.bigPicture.querySelector('.social__caption').textContent = post.description;
  };

  window.bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

  var posts = createPosts(25);
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < posts.length; j++) {
    fragment.appendChild(renderPics(posts[j]));
  }
  window.listElement.appendChild(fragment);

  var openPost = function (node) {
    for (var k = 0; k < posts.length; k++) {
      if (posts[k].element === node.id) {
        renderPost(posts[k]);
        document.addEventListener('keydown', onPostEscPress);
        break;
      }
    }
  };

  var closePost = function () {
    window.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPostEscPress);
  };

  var onPicturesContainerClick = function (evt) {
    var target = evt.target;
    if (target.className !== 'picture__img') {
      return;
    }
    evt.preventDefault();
    openPost(target);
  };
  window.picturesContainer.addEventListener('click', onPicturesContainerClick);

  var onPictureCancelClick = function () {
    closePost();
  };
  window.pictureCancel.addEventListener('click', onPictureCancelClick);

  var onPostEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePost();
    }
  };

})();
