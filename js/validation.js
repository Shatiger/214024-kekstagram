'use strict';

(function () {

  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var inputFile = document.getElementById('upload-file');
  var inputSize = document.querySelector('.resize__control--value');
  var scaleValue = document.querySelector('.scale__value');
  var effectRadio = document.getElementById('upload-select-image').effect;

  var form = document.getElementById('upload-select-image');

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

  var successHandler = function () {
    window.closeUploadOverlay();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: firebrick;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '15px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData();
    formData.append('filename', inputFile.files[0]);
    formData.append('scale', inputSize.value);
    formData.append('effect-level', scaleValue.value);
    formData.append('effect', effectRadio.value);
    formData.append('hashtags', inputHashtags.value);
    formData.append('description', inputDescription.value);
    window.uploadPhoto(formData, successHandler, errorHandler);
  };
  form.addEventListener('submit', onFormSubmit);

})();
