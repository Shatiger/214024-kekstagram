'use strict';

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

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.big-picture .social__comment-count').classList.add('visually-hidden');
document.querySelector('.big-picture .social__loadmore').classList.add('visually-hidden');

var listElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');

var generateComments = function () {
  var commentsCount = Math.floor(Math.random() * COMMENTS_MAX_COUNT) + 1;
  var commentsIds = [];
  while (commentsIds.length < commentsCount) {
    var commentId = Math.floor(Math.random() * (COMMENT_PATTERNS.length - 1));
    if (commentsIds.indexOf(commentId) === -1) {
      commentsIds.push(commentId);
    };
  };
  var comments = [];
  for (var i = 0; i < commentsIds.length; i++) {
    comments[i] = COMMENT_PATTERNS[commentsIds[i]];
  };
  return comments;
};

var createPost = function (num) {
  var post = {
    url: 'photos/' + num + '.jpg',
    likes: Math.floor(Math.random() * (LIKES_MAX_COUNT - LIKES_MIN_COUNT)) + LIKES_MIN_COUNT,
    comments: generateComments(),
    description: DESCRIPTION_PATTERNS[Math.floor(Math.random() * (DESCRIPTION_PATTERNS.length - 1))]
  };
  return post;
};

var createPosts = function (cnt) {
  var picturesIds = [];
  while (picturesIds.length < cnt) {
    var pictureId = Math.floor(Math.random() * cnt) + 1;
    if (picturesIds.indexOf(pictureId) === -1) {
      picturesIds.push(pictureId);
    };
  };
  var posts = [];
  for (var i = 0; i < cnt; i++) {
    posts[i] = createPost(picturesIds[i]);
  };
  return posts;
};

var renderPosts = function (posts) {
  for (var i = 0; i < posts.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = posts[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = posts[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = posts[i].comments.length;
    listElement.appendChild(pictureElement);
  };
};

var renderPost = function (post) {
  document.querySelector('.big-picture .big-picture__img img').src = post.url;
  document.querySelector('.big-picture .likes-count').textContent = post.likes;
  document.querySelector('.big-picture .comments-count').textContent = post.comments.length;
  var comments = '';
  for (var i = 0; i < post.comments.length; i++) {
    var avatar = Math.floor(Math.random() * 5) + 1;
    comments += '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + avatar + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + post.comments[i] + '</p></li>';
  }
  document.querySelector('.big-picture .social__comments').innerHTML = comments;
  document.querySelector('.big-picture .social__caption').textContent = post.description;
};

var posts = createPosts(25);
renderPosts(posts);
renderPost(posts[0]);


