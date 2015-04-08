var MAIN = (function($) {
  'use strict';

  var $view, el, aboutSetting;


  function cacheElements() {
    el = {
      $aboutNum: $view.find('.js-num')
    };
  }



  function initFullpage() {
    $view.fullpage({
      sectionsColor: ['#7BAABE', '#F8823C', '#003366', '#f90'],
      anchors: ['about', 'skill', 'page1'],
      menu: '#menu'
    });
  }

  function initFirstSection() {
    var speed = 500,
        count = el.$aboutNum.length,
        numbers = [2, 9, 100];

    for (var i = 0; i < numbers.length; i++) {
      (function(i) {
        var number = 0;

        var handle = setInterval(function() {
          el.$aboutNum.eq(i).text(number++);

          if (number > numbers[i]) {
            clearInterval(handle);
          }

        }, speed / numbers[i]);

      }(i));
    }
  }


  return {
    init: function() {
      $view = $('.section-wrap');
      cacheElements();

      initFullpage();
      setTimeout(function() {
        initFirstSection();  // init first section
      }, 2000);
    }
  };
}(jQuery));


/** init **/
jQuery(function() {
  MAIN.init();
});