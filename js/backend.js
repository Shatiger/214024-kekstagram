'use strict';

(function () {
  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };

  var uploadPhoto = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    uploadPhoto: uploadPhoto
  };
})();
