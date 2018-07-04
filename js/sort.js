'use strict';

(function () {

  var NEW_ELEMENTS_COUNT = 10;
  var ELEMENT_MAX = 24;

  var imageFilterButtons = document.querySelectorAll('.img-filters__button');

  var posts = [];

  var pickRandomElements = function () {
    var result = [];
    while (result.length < NEW_ELEMENTS_COUNT) {
      var element = Math.floor(Math.random() * (ELEMENT_MAX + 1));
      if (result.indexOf(element) < 0) {
        result.push(element);
      }
    }
    for (var i = 0; i < result.length; i++) {
      result[i] = 'pic' + result[i];
    }
    return result;
  };

  var onImageFilterButtonClick = function (evt) {
    var target = evt.target;
    for (var i = 0; i < imageFilterButtons.length; i++) {
      imageFilterButtons[i].classList.remove('img-filters__button--active');
      imageFilterButtons[i].removeEventListener('click', onImageFilterButtonClick);
      imageFilterButtons[i].addEventListener('click', onImageFilterButtonClick);
    }
    target.removeEventListener('click', onImageFilterButtonClick);
    target.classList.add('img-filters__button--active');
    window.pictures.clearPosts();
    switch (target.id) {
      case 'filter-popular':
        window.pictures.loadPosts(posts);
        break;
      case 'filter-new':
        var postsNew = posts.slice(0);
        var elements = pickRandomElements();
        postsNew = postsNew.filter(function (value) {
          return (elements.indexOf(value.element) >= 0);
        });
        window.pictures.loadPosts(postsNew);
        break;
      case 'filter-discussed':
        var postsDiscussed = posts.slice(0);
        postsDiscussed.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        window.pictures.loadPosts(postsDiscussed);
        break;
      default:
        break;
    }
  };
  for (var j = 1; j < imageFilterButtons.length; j++) {
    imageFilterButtons[j].addEventListener('click', onImageFilterButtonClick);
  }

  var successHandler = function (data) {
    posts = data;
    for (var i = 0; i < posts.length; i++) {
      posts[i].element = 'pic' + i;
    }
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

  window.backend.load(successHandler, errorHandler);

})();
