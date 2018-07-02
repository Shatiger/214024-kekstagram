'use strict';

(function () {

  var setDefaultScaleValue = function () {
    window.scaleValue.value = 100;
    window.scalePin.style.left = '100%';
    window.scaleLevel.style.width = '100%';
  };

  var setDefaultResizeValue = function () {
    window.resizeControlValue.value = window.RESIZE_MAX + '%';
    window.previewImage.style.transform = 'scale(' + (window.RESIZE_MAX / 100) + ')';
  };

  setDefaultResizeValue();
  setDefaultScaleValue();

  var openUploadOverlay = function () {
    window.radioFilter[0].checked = true;
    changeEffect();
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    setDefaultResizeValue();
    setDefaultScaleValue();
    document.addEventListener('keydown', onUploadEscPress);
  };

  var closeUploadOverlay = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    window.uploadFileInput.value = '';
    document.removeEventListener('keydown', onUploadEscPress);
  };

  var onUploadButtonChange = function () {
    openUploadOverlay();
  };
  window.uploadButton.addEventListener('change', onUploadButtonChange);

  var onUploadCancelButtonClick = function () {
    closeUploadOverlay();
  };
  window.uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);

  var onResizeMinusButtonClick = function () {
    if (parseInt(window.resizeControlValue.value, 10) > window.RESIZE_MIN) {
      var resizeValue = parseInt(window.resizeControlValue.value, 10);
      resizeValue -= window.RESIZE_STEP;
      window.resizeControlValue.value = resizeValue + '%';
      window.previewImage.style.transform = 'scale(' + (resizeValue / 100) + ')';
    }
  };
  window.resizeControlMinus.addEventListener('click', onResizeMinusButtonClick);

  var onResizePlusButtonClick = function () {
    if (parseInt(window.resizeControlValue.value, 10) < window.RESIZE_MAX) {
      var resizeValue = parseInt(window.resizeControlValue.value, 10);
      resizeValue += window.RESIZE_STEP;
      window.resizeControlValue.value = resizeValue + '%';
      window.previewImage.style.transform = 'scale(' + (resizeValue / 100) + ')';
    }
  };
  window.resizeControlPlus.addEventListener('click', onResizePlusButtonClick);

  var changeEffect = function () {
    window.previewImage.removeAttribute('class');
    window.previewImage.style.filter = '';
    if (window.effectRadio.value !== 'none') {
      window.scale.classList.remove('hidden');
      window.previewImage.classList.add('effects__preview--' + window.effectRadio.value);
    } else {
      window.scale.classList.add('hidden');
    }
    setDefaultScaleValue();
  };

  var onEffectChange = function () {
    changeEffect();
  };
  for (var i = 0; i < window.effectItem.length; i++) {
    window.effectItem[i].addEventListener('click', onEffectChange);
  }

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && document.activeElement !== window.inputHashtags && document.activeElement !== window.inputDescription) {
      closeUploadOverlay();
    }
  };

})();
