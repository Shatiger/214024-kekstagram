'use strict';

(function () {

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

  window.onUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      closeUploadOverlay();
    }
  };

  window.onPostEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePost();
    }
  };

})();
