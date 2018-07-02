'use strict';

window.LIKES_MIN_COUNT = 15;
window.LIKES_MAX_COUNT = 200;

window.COMMENTS_MAX_COUNT = 3;

window.COMMENT_PATTERNS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
window.DESCRIPTION_PATTERNS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

window.RESIZE_MIN = 25;
window.RESIZE_MAX = 100;
window.RESIZE_STEP = 25;

window.ESC_KEYCODE = 27;
window.listElement = document.querySelector('.pictures');
window.pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');
window.commentTemplate = document.querySelector('.social__comment');
window.bigPicture = document.querySelector('.big-picture');

window.uploadButton = document.getElementById('upload-file');
window.uploadCancelButton = document.getElementById('upload-cancel');
window.uploadFileInput = document.getElementById('upload-file');
window.scalePin = document.querySelector('.scale__pin');
window.effectItem = document.querySelectorAll('.effects__item');
window.effectRadio = document.getElementById('upload-select-image').effect;
window.previewImage = document.querySelector('.img-upload__preview img');
window.scale = document.querySelector('.scale');
window.scaleValue = document.querySelector('.scale__value');
window.scaleLine = document.querySelector('.scale__line');
window.scaleLevel = document.querySelector('.scale__level');
window.radioFilter = document.getElementsByName('effect');

window.resizeControlValue = document.querySelector('.resize__control--value');
window.resizeControlMinus = document.querySelector('.resize__control--minus');
window.resizeControlPlus = document.querySelector('.resize__control--plus');

window.picturesContainer = document.querySelector('.pictures');
window.pictureCancel = document.getElementById('picture-cancel');

window.inputHashtags = document.querySelector('.text__hashtags');
window.inputDescription = document.querySelector('.text__description');
