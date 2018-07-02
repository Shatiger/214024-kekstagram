'use strict';

(function () {

  var setSliderLeftValue = function (leftValue) {
    window.scalePin.style.left = leftValue + 'px';
    window.scaleLevel.style.width = leftValue + 'px';
  };

  var setEffectValue = function (value) {
    window.scaleValue.value = value;
    switch (window.effectRadio.value) {
      case 'chrome':
        window.previewImage.style.filter = 'grayscale(' + (value / 100) + ')';
        break;
      case 'sepia':
        window.previewImage.style.filter = 'sepia(' + (value / 100) + ')';
        break;
      case 'marvin':
        window.previewImage.style.filter = 'invert(' + value + '%)';
        break;
      case 'phobos':
        window.previewImage.style.filter = 'blur(' + ((value / 100) * 5) + 'px)';
        break;
      case 'heat':
        window.previewImage.style.filter = 'brightness(' + (((value / 100) * 2) + 1) + ')';
        break;
      default:
        break;
    }
  };

  var updateSlider = function (x) {
    var scaleLineBounding = window.scaleLine.getBoundingClientRect();
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
  window.scaleLine.addEventListener('mouseup', onScaleLineMouseUp);

  var onScalePinMouseDown = function () {
    var onMouseMove = function (evt) {
      updateSlider(evt.clientX);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.scaleLine.addEventListener('mouseup', onScaleLineMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.scaleLine.removeEventListener('mouseup', onScaleLineMouseUp);
  };
  window.scalePin.addEventListener('mousedown', onScalePinMouseDown);

})();
