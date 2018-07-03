'use strict';

(function () {

  var LIKES_MIN_COUNT = 15;
  var LIKES_MAX_COUNT = 200;
  var COMMENTS_MAX_COUNT = 3;
  var COMMENT_PATTERNS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTION_PATTERNS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var ESC_KEYCODE = 27;

  var listElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

  var commentTemplate = document.querySelector('.social__comment');
  var bigPicture = document.querySelector('.big-picture');

  var picturesContainer = document.querySelector('.pictures');
  var pictureCancel = document.getElementById('picture-cancel');

  var generateComments = function () {
    var commentsCount = Math.ceil(Math.random() * COMMENTS_MAX_COUNT);
    var comments = [];
    while (comments.length < commentsCount) {
      var comment = COMMENT_PATTERNS[Math.floor(Math.random() * (COMMENT_PATTERNS.length))];
      if (comments.indexOf(comment) === -1) {
        comments.push(comment);
      }
    }
    return comments;
  };

  var createPost = function (num) {
    var post = {
      url: 'photos/' + num + '.jpg',
      likes: Math.floor(Math.random() * (LIKES_MAX_COUNT - LIKES_MIN_COUNT)) + LIKES_MIN_COUNT,
      comments: generateComments(),
      description: DESCRIPTION_PATTERNS[Math.floor(Math.random() * (DESCRIPTION_PATTERNS.length))],
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

  var posts = createPosts(25);
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < posts.length; j++) {
    fragment.appendChild(renderPics(posts[j]));
  }
  listElement.appendChild(fragment);

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

})();
