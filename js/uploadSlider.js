'use strict';

(function () {

  var scalePin = document.querySelector('.scale__pin');
  var effectRadio = document.getElementById('upload-select-image').effect;
  var previewImage = document.querySelector('.img-upload__preview img');

  var scaleValue = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleLine = document.querySelector('.scale__line');

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

})();
