'use strict';

(function () {

  var NEW_ELEMENTS_COUNT = 10;
  var ELEMENT_MAX = 24;

  var imageFilterButtons = document.querySelectorAll('.img-filters__button');
  var imageFiltersForm = document.querySelector('.img-filters__form');

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

  var onImageFiltersFormClick = window.debounce(function (evt) {
    posts = window.pictures.getPosts();
    var target = evt.target;
    for (var i = 0; i < imageFilterButtons.length; i++) {
      imageFilterButtons[i].classList.remove('img-filters__button--active');
    }
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
  });
  imageFiltersForm.addEventListener('click', onImageFiltersFormClick);

})();
