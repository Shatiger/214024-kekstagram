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

var ESC_KEYCODE = 27;

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

var inputHashtags = document.querySelector('.text__hashtags');
var inputDescription = document.querySelector('.text__description');

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

var openUploadOverlay = function () {
  radioFilter[0].checked = true;
  changeEffect();
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  setDefaultResizeValue();
  document.addEventListener('keydown', onUploadEscPress);
};

var closeUploadOverlay = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onUploadEscPress);
};

var onUploadButtonChange = function () {
  openUploadOverlay();
};
uploadButton.addEventListener('change', onUploadButtonChange);

var onUploadCancelButtonClick = function () {
  closeUploadOverlay();
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

var changeEffect = function () {
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

var onEffectChange = function () {
  changeEffect();
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

var onHashtagInput = function (evt) {
  var target = evt.target;
  var isValid = true;
  var inputValue = target.value;

  if (inputValue.length === 0) {
    target.setCustomValidity('');
  } else {
    var hashtags = inputValue.split(' ');
    for (var m = 0; m < hashtags.length; m++) {
      hashtags[m] = hashtags[m].toLowerCase();
    }
    if (hashtags.length > 5) {
      target.setCustomValidity('Нельзя указывать больше 5 хэштегов!');
    } else {
      for (var n = 0; n < hashtags.length; n++) {
        if (hashtags[n].charAt(0) !== '#') {
          target.setCustomValidity('Хэштеги должны начинаться с символа "#"!');
          isValid = false;
          break;
        } else if (hashtags[n].length === 1) {
          target.setCustomValidity('Хэштег должен иметь не только лишь символ "#"!');
          isValid = false;
          break;
        } else if (hashtags[n].length > 20) {
          target.setCustomValidity('Максимальная длина хэштега - 20 символов, включая символ "#"!');
          isValid = false;
          break;
        }
        for (var h = 0; h < hashtags.length; h++) {
          if (n !== h && hashtags[h] === hashtags[n]) {
            target.setCustomValidity('Не должно быть одинаковых хэштегов! Хэштеги не чувствительны к регистру!');
            isValid = false;
            break;
          }
        }
      }
      if (isValid) {
        target.setCustomValidity('');
      }
    }
  }
};
inputHashtags.addEventListener('input', onHashtagInput);

var onDescriptionInput = function (evt) {
  var target = evt.target;
  var inputValue = target.value;
  if (inputValue.length === 0) {
    target.setCustomValidity('');
  } else if (inputValue.length > 140) {
    target.setCustomValidity('Длина описания не может превышать 140 символов!');
  } else {
    target.setCustomValidity('');
  }
};
inputDescription.addEventListener('input', onDescriptionInput);

var onUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
    closeUploadOverlay();
  }
};

var onPostEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePost();
  }
};

var setSliderLeftValue = function (leftValue) {
  scalePin.style.left = leftValue + 'px';
  scaleLevel.style.width = leftValue + 'px';
};

var setEffectValue = function (value) {
  scaleValue.value = value;
  switch (effectRadio.value) {
    case 'chrome':
      previewImage.style.filter = 'grayscale(' + (value / 100) + ')';
      break;
    case 'sepia':
      previewImage.style.filter = 'sepia(' + (value / 100) + ')';
      break;
    case 'marvin':
      previewImage.style.filter = 'invert(' + value + '%)';
      break;
    case 'phobos':
      previewImage.style.filter = 'blur(' + ((value / 100) * 5) + 'px)';
      break;
    case 'heat':
      previewImage.style.filter = 'brightness(' + (((value / 100) * 2) + 1) + ')';
      break;
    default:
      break;
  }
};

var updateSlider = function (x) {
  var scaleLineBounding = scaleLine.getBoundingClientRect();
  if (x >= scaleLineBounding.left && x <= scaleLineBounding.right) {
    var leftValue = x - scaleLineBounding.left;
    var effectValue = parseInt(leftValue / scaleLineBounding.width * 100, 10);
    setSliderLeftValue(leftValue);
    setEffectValue(effectValue);
  }
};

var onScaleLineMouseUp = function (evt) {
  updateSlider(evt.clientX);
};
scaleLine.addEventListener('mouseup', onScaleLineMouseUp);

var onScalePinMouseDown = function () {
  var onMouseMove = function (evt) {
    updateSlider(evt.clientX);
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    scaleLine.addEventListener('mouseup', onScaleLineMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  scaleLine.removeEventListener('mouseup', onScaleLineMouseUp);
};
scalePin.addEventListener('mousedown', onScalePinMouseDown);
