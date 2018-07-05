'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var listElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

  var commentTemplate = document.querySelector('.social__comment');
  var bigPicture = document.querySelector('.big-picture');

  var picturesContainer = document.querySelector('.pictures');
  var pictureCancel = document.getElementById('picture-cancel');

  var imageFilter = document.querySelector('.img-filters');

  var posts = [];

  var renderPics = function (post) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__img').id = post.element;
    pictureElement.querySelector('.picture__stat--likes').textContent = post.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = post.comments.length;
    return pictureElement;
  };

  var renderPost = function (post) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = post.url;
    bigPicture.querySelector('.likes-count').textContent = post.likes;
    bigPicture.querySelector('.comments-count').textContent = post.comments.length;
    bigPicture.querySelector('.social__comments').innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < post.comments.length; i++) {
      var avatar = Math.ceil(Math.random() * 5);
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('img').src = 'img/avatar-' + avatar + '.svg';
      commentElement.querySelector('p').textContent = post.comments[i];
      fragment.appendChild(commentElement);
    }
    bigPicture.querySelector('.social__comments').appendChild(fragment);
    bigPicture.querySelector('.social__caption').textContent = post.description;
  };

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

  var successHandler = function (data) {
    posts = data;
    for (var i = 0; i < posts.length; i++) {
      posts[i].element = 'pic' + i;
    }
    loadPosts(posts);
    imageFilter.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: firebrick;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '15px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var loadPosts = function (data) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(renderPics(data[j]));
    }
    listElement.appendChild(fragment);
  };

  var clearPosts = function () {
    var elements = listElement.querySelectorAll('.picture__link');
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  };

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
    bigPicture.classList.add('hidden');
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
  picturesContainer.addEventListener('click', onPicturesContainerClick);

  var onPictureCancelClick = function () {
    closePost();
  };
  pictureCancel.addEventListener('click', onPictureCancelClick);

  var onPostEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePost();
    }
  };

  var getPosts = function () {
    return posts;
  };

  window.pictures = {
    clearPosts: clearPosts,
    loadPosts: loadPosts,
    getPosts: getPosts
  };

})();
