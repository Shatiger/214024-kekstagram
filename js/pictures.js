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

var RESIZE_MIN = 25;
var RESIZE_MAX = 100;
var RESIZE_STEP = 25;

var listElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');
var commentTemplate = document.querySelector('.social__comment');
var bigPicture = document.querySelector('.big-picture');

var uploadButton = document.getElementById('upload-file');
var uploadCancelButton = document.getElementById('upload-cancel');
var uploadFileInput = document.getElementById('upload-file');
var scalePin = document.querySelector('.scale__pin');
var effectItem = document.querySelectorAll('.effects__item');
var effectRadio = document.getElementById('upload-select-image').effect;
var previewImage = document.querySelector('.img-upload__preview img');
var scale = document.querySelector('.scale');
var scaleValue = document.querySelector('.scale__value');
var scaleLine = document.querySelector('.scale__line');
var scaleLevel = document.querySelector('.scale__level');
var radioFilter = document.getElementsByName('effect');

var resizeControlValue = document.querySelector('.resize__control--value');
var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');

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

var onUploadButtonChange = function () {
  radioFilter[0].checked = true;
  onEffectChange();
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  setDefaultResizeValue();
};
uploadButton.addEventListener('change', onUploadButtonChange);

var onUploadCancelButtonClick = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  uploadFileInput.value = '';
};
uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);

var setDefaultScaleValue = function () {
  scaleValue.value = 100;
  scalePin.style.left = '100%';
  scaleLevel.style.width = '100%';
};

setDefaultScaleValue();

var setDefaultResizeValue = function () {
  resizeControlValue.value = RESIZE_MAX + '%';
  previewImage.style.transform = 'scale(' + (RESIZE_MAX / 100) + ')';
};

setDefaultResizeValue();

var onResizeMinusButtonClick = function () {
  if (parseInt(resizeControlValue.value, 10) > RESIZE_MIN) {
    var resizeValue = parseInt(resizeControlValue.value, 10);
    resizeValue -= RESIZE_STEP;
    resizeControlValue.value = resizeValue + '%';
    previewImage.style.transform = 'scale(' + (resizeValue / 100) + ')';
  }
};
resizeControlMinus.addEventListener('click', onResizeMinusButtonClick);

var onResizePlusButtonClick = function () {
  if (parseInt(resizeControlValue.value, 10) < RESIZE_MAX) {
    var resizeValue = parseInt(resizeControlValue.value, 10);
    resizeValue += RESIZE_STEP;
    resizeControlValue.value = resizeValue + '%';
    previewImage.style.transform = 'scale(' + (resizeValue / 100) + ')';
  }
};
resizeControlPlus.addEventListener('click', onResizePlusButtonClick);

var onScalePinMouseUp = function (evt) {
  var scalePinX = evt.clientX;
  var scaleLineX = scaleLine.getBoundingClientRect().left;
  var scaleLineWidth = scaleLine.offsetWidth;
  var scalePinPosition = Math.floor(((scalePinX - scaleLineX) / scaleLineWidth) * 100);
  scaleValue.value = scalePinPosition;
  switch (effectRadio.value) {
    case 'chrome':
      previewImage.style.filter = 'grayscale(' + (scalePinPosition / 100) + ')';
      break;
    case 'sepia':
      previewImage.style.filter = 'sepia(' + (scalePinPosition / 100) + ')';
      break;
    case 'marvin':
      previewImage.style.filter = 'invert(' + scalePinPosition + '%)';
      break;
    case 'phobos':
      previewImage.style.filter = 'blur(' + ((scalePinPosition / 100) * 5) + 'px)';
      break;
    case 'heat':
      previewImage.style.filter = 'brightness(' + (((scalePinPosition / 100) * 2) + 1) + ')';
      break;
    default:
      break;
  }
};
scalePin.addEventListener('mouseup', onScalePinMouseUp);

var onEffectChange = function () {
  previewImage.removeAttribute('class');
  previewImage.style.filter = '';
  if (effectRadio.value !== 'none') {
    scale.classList.remove('hidden');
    previewImage.classList.add('effects__preview--' + effectRadio.value);
  } else {
    scale.classList.add('hidden');
  }
  setDefaultScaleValue();
};
for (var i = 0; i < effectItem.length; i++) {
  effectItem[i].addEventListener('click', onEffectChange);
}

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

var posts = createPosts(25);
var fragment = document.createDocumentFragment();
for (var j = 0; j < posts.length; j++) {
  fragment.appendChild(renderPics(posts[j]));
}
listElement.appendChild(fragment);

var onPictureClick = function (node) {
  for (var k = 0; k < posts.length; k++) {
    if (posts[k].element === node.id) {
      renderPost(posts[k]);
      break;
    }
  }
};

picturesContainer.onclick = function (evt) {
  var target = evt.target;
  if (target.className !== 'picture__img') {
    return;
  }
  evt.preventDefault();
  onPictureClick(target);
};

var onPictureCancelClick = function () {
  bigPicture.classList.add('hidden');
};
pictureCancel.addEventListener('click', onPictureCancelClick);
