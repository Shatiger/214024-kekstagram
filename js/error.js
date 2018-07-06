'use strict';

(function () {

  var uploadErrorTemplate = document.querySelector('#picture')
    .content
    .querySelector('.img-upload__message--error');
  var bodyElement = document.body;

  var showLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: firebrick;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '15px';
    node.textContent = errorMessage;
    node.classList.add('load__message--error');
    bodyElement.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      bodyElement.querySelector('.load__message--error').remove();
    }, 5000);
  };

  var showUploadError = function () {
    var fragment = document.createDocumentFragment();
    var uploadErrorMessage = uploadErrorTemplate.cloneNode(true);
    uploadErrorMessage.classList.remove('hidden');
    uploadErrorMessage.addEventListener('click', onUploadErrorMessageClick);
    fragment.appendChild(uploadErrorMessage);
    bodyElement.appendChild(fragment);
    window.upload.hide();
  };

  var onUploadErrorMessageClick = function (evt) {
    var target = evt.target;
    if (target.className === 'error__link error__link--again') {
      window.upload.show();
    }
    if (target.className === 'error__link error__link--other') {
      window.upload.close();
    }
    var uploadErrorMessageElement = document.querySelector('.img-upload__message--error');
    uploadErrorMessageElement.remove();
  };

  window.error = {
    showLoadError: showLoadError,
    showUploadError: showUploadError
  };

})();
