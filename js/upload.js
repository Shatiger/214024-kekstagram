'use strict';

(function () {

  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;
  var RESIZE_STEP = 25;
  var ESC_KEYCODE = 27;

  var uploadButton = document.getElementById('upload-file');
  var uploadCancelButton = document.getElementById('upload-cancel');
  var uploadFileInput = document.getElementById('upload-file');

  var scalePin = document.querySelector('.scale__pin');
  var effectItem = document.querySelectorAll('.effects__item');
  var effectRadio = document.getElementById('upload-select-image').effect;
  var previewImage = document.querySelector('.img-upload__preview img');

  var scale = document.querySelector('.scale');
  var scaleValue = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');
  var radioFilter = document.getElementsByName('effect');

  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');

  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');

  var setDefaultScaleValue = function () {
    scaleValue.value = 100;
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
  };

  var setDefaultResizeValue = function () {
    resizeControlValue.value = RESIZE_MAX + '%';
    previewImage.style.transform = 'scale(' + (RESIZE_MAX / 100) + ')';
  };

  setDefaultResizeValue();
  setDefaultScaleValue();

  var openUploadOverlay = function () {
    radioFilter[0].checked = true;
    changeEffect();
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    setDefaultResizeValue();
    setDefaultScaleValue();
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

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      closeUploadOverlay();
    }
  };

})();
