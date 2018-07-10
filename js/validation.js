'use strict';

(function () {

  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var inputFile = document.getElementById('upload-file');
  var inputSize = document.querySelector('.resize__control--value');
  var scaleValue = document.querySelector('.scale__value');
  var effectRadio = document.getElementById('upload-select-image').effect;

  var form = document.getElementById('upload-select-image');

  var setBorder = function (element) {
    element.style = 'border: 1px solid red; padding: 6px 12px;';
  };

  var removeBorder = function (element) {
    element.style = '';
  };

  var onHashtagInput = function (evt) {
    var target = evt.target;
    var isValid = true;
    var inputValue = target.value;
    removeBorder(target);
    if (inputValue.length === 0) {
      target.setCustomValidity('');
    } else {
      var hashtags = inputValue.split(' ');
      for (var m = 0; m < hashtags.length; m++) {
        hashtags[m] = hashtags[m].toLowerCase();
      }
      if (hashtags.length > 5) {
        target.setCustomValidity('Нельзя указывать больше 5 хэштегов!');
        setBorder(target);
      } else {
        for (var n = 0; n < hashtags.length; n++) {
          if (hashtags[n].charAt(0) !== '#') {
            target.setCustomValidity('Хэштеги должны начинаться с символа "#"!');
            setBorder(target);
            isValid = false;
            break;
          } else if (hashtags[n].length === 1) {
            target.setCustomValidity('Хэштег должен иметь не только лишь символ "#"!');
            setBorder(target);
            isValid = false;
            break;
          } else if (hashtags[n].lastIndexOf('#') > 0) {
            target.setCustomValidity('Хэштеги должны разделяться пробелами!');
            setBorder(target);
            isValid = false;
            break;
          } else if (hashtags[n].length > 20) {
            target.setCustomValidity('Максимальная длина хэштега - 20 символов, включая символ "#"!');
            setBorder(target);
            isValid = false;
            break;
          }
          for (var h = 0; h < hashtags.length; h++) {
            if (n !== h && hashtags[h] === hashtags[n]) {
              target.setCustomValidity('Не должно быть одинаковых хэштегов! Хэштеги не чувствительны к регистру!');
              setBorder(target);
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
    removeBorder(target);
    if (inputValue.length === 0) {
      target.setCustomValidity('');
    } else if (inputValue.length > 140) {
      target.setCustomValidity('Длина описания не может превышать 140 символов!');
      setBorder(target);
    } else {
      target.setCustomValidity('');
    }
  };
  inputDescription.addEventListener('input', onDescriptionInput);

  var successHandler = function () {
    window.upload.close();
  };

  var errorHandler = function () {
    window.error.showUpload();
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
    window.backend.uploadPhoto(formData, successHandler, errorHandler);
  };
  form.addEventListener('submit', onFormSubmit);

})();
