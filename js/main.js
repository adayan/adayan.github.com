var MAIN = (function($) {
  'use strict';

  var $view, el, aboutSetting,
        anchors = ['about', 'skill', 'page1'];


  function cacheElements() {
    el = {
      $sections: $view.find('.section'),
      $aboutNum: $view.find('.js-num'),
      $canvas: document.getElementById('canvas')
    };
  }

  function hasAnimated(index) {
    return el.$sections.eq(index).hasClass('js-animated');
  }

  function isFirstSection() {
    return (location.hash.substr(1) === anchors[0]) || (location.hash === '');
  }

  function initFullpage() {
    $view.fullpage({
      sectionsColor: ['#7BAABE', '#F8823C', '#003366', '#f90'],
      anchors: anchors,
      menu: '#menu',
      paddingTop: 50,
      afterLoad: function(anchorLink , index) {
        if (!hasAnimated(index - 1)) {
         doAnimation(index);
        }
      }
    });
  }

  function doAnimation(index) {
    switch(index) {
      case 1:
        initAbout();
        break;

      case 2:
        initSkill();
        break;

      case 3:
        break;

      default:
        break;
    }

    el.$sections.eq(index - 1) .addClass('js-animated')
                        .find('.animated').removeClass('hidden');
  }

  /** About Section **/
  function initAbout() {
    setTimeout(function() {
        initAboutAnimation();  // init first section
      }, 2000);
  }

  function initAboutAnimation() {
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

  /** Skill Section **/
  function initSkill() {
    var skills = {

    };
    drawProcessCirle();
  }

  function drawProcessCirle() {
    var canvas = el.$canvas;
    var ctx =  canvas.getContext('2d');

    // outter cirle
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI*2, true);
    ctx.lineWidth=25;
    ctx.strokeStyle="lightblue";
    ctx.stroke();
    ctx.closePath();

    // angle
    var count = 0;
    var startAngle = 3*Math.PI/2;
    var handle = setInterval(function() {
        if (count == 10) {
            clearInterval(handle);
        }

        // angle
        ctx.beginPath();
        ctx.arc(150, 150, 100, startAngle, startAngle + (2*Math.PI*count/(2*10)), false);
        ctx.strokeStyle="darkblue";
        ctx.stroke();
        //ctx.closePath();

        count++;
    }, 60);

  }

  return {
    init: function() {
      $view = $('.section-wrap');
      cacheElements();
      initFullpage();
      if (isFirstSection()) {
        doAnimation(1);
      }
    }
  };
}(jQuery));


/** init **/
jQuery(function() {
  MAIN.init();
});