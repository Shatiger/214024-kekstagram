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

var listElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');

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
    description: DESCRIPTION_PATTERNS[Math.floor(Math.random() * (DESCRIPTION_PATTERNS.length))]
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
    pictureElement.querySelector('.picture__stat--likes').textContent = post.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = post.comments.length;
    return pictureElement;
};

var renderPost = function (post) {
  document.querySelector('.big-picture .big-picture__img img').src = post.url;
  document.querySelector('.big-picture .likes-count').textContent = post.likes;
  document.querySelector('.big-picture .comments-count').textContent = post.comments.length;
  document.querySelector('.big-picture .social__comments').innerHTML = '';
  for (var i = 0; i < post.comments.length; i++) {
    var avatar = Math.ceil(Math.random() * 5);
    var comment = document.createElement('li');
    var picture = document.createElement('img');
    var commentText = document.createElement('p');
    comment.classList.add('social__comment');
    comment.classList.add('social__comment--text');
    picture.classList.add('social__picture');
    picture.src = 'img/avatar-' + avatar + '.svg';
    picture.alt = 'Аватар комментатора фотографии';
    picture.width = 35;
    picture.height = 35;
    commentText.classList.add('social__text');
    commentText.textContent = post.comments[i];
    comment.appendChild(picture);
    comment.appendChild(commentText);
    document.querySelector('.big-picture .social__comments').appendChild(comment);
  }
  document.querySelector('.big-picture .social__caption').textContent = post.description;
};

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.big-picture .social__comment-count').classList.add('visually-hidden');
document.querySelector('.big-picture .social__loadmore').classList.add('visually-hidden');

var posts = createPosts(25);
var fragment = document.createDocumentFragment();
for (var i = 0; i < posts.length; i++) {
  fragment.appendChild(renderPics(posts[i]));
}
listElement.appendChild(fragment);

renderPost(posts[0]);
