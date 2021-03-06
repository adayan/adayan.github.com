var MAIN = (function($) {
  'use strict';

  var $view, el, aboutSetting, y, // drag cloud y distance
      anchors = ['about', 'skill', 'project', 'interest', 'contact'],
      cirleColors = ['#FCCE10', '#5AB1EF', '#00B38A', '#E52C3C'],
      $window = $(window);


  function cacheElements() {
    el = {
      $sections: $view.find('.section'),
      $avatar: $('.avatar'),
      $aboutNum: $view.find('.js-num'),
      $canvas: document.getElementById('canvas'),
      $projectSection: $view.find('.project-section'),
      $projectItems: $view.find('.project-item'),
      $projectDesc: $view.find('.project-desc'),
      $dragCloud: document.getElementById('dragCloud'),
      $myphone: $view.find('.my-phone')
    };
  }

  function bindActions() {
    el.$avatar.hover(function() {
      $(this).toggleClass('infinite');
    });

    el.$dragCloud.ondragstart = function(event) {
      y = event.y;
      el.$myphone.show();
    };

    el.$dragCloud.ondragover = function(event) {
      event.preventDefault();

      $(this).closest('.cloud').css({'top': event.y - y});
    };

    el.$dragCloud.ondragend = function(event) {
      $(this).closest('.cloud').css('top', 0);
    };
  }

  /** tools **/
  function hasAnimated(index) {
    return el.$sections.eq(index).hasClass('js-animated');
  }

  function isFirstSection() {
    return (location.hash.substr(1) === anchors[0]) || (location.hash === '');
  }

  function isMobile() {
    return ($window.width <= 768);
  }

  function initFullpage() {
    $view.fullpage({
      sectionsColor: ['#7BAABE', '#432f21', '#432f21', '#f90', '#00b38a'],
      anchors: anchors,
      menu: '#menu',
      onLeave: function(index, nextIndex) {
        (nextIndex === 1) ? el.$avatar.removeClass('hidden') : el.$avatar.addClass('hidden');
      },
      afterLoad: function(anchorLink , index) {
        if (!hasAnimated(index - 1)) {
         doAnimation(index);
        }
      }
    });
  }

  function doAnimation(index) {
    switch(index) {
      case 1:  // about section
        initAbout();
        break;

      case 2:  // skill section
        initSkill();
        break;

      case 3:  // project section
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
      initAboutAnimation();
    }, 2000);
  }

  function initAboutAnimation() {
    var numbers = [2, 10, 100],
        $numbers = el.$aboutNum,
        $number;

    for (var i = 0; i < numbers.length; i++) {
      $number = $numbers.eq(i);
      countNumber($number, numbers[i]);
    }
  }

  function countNumber($ele, currentNum, isPercentage) {
    var speed = 500;

    (function(currentNum) {
      var number = 0;

      var handle = setInterval(function() {
        $ele.text(isPercentage ? (number++) + '%' : number++);

        if (number > currentNum) {
          clearInterval(handle);
        }

      }, speed / currentNum);
    }(currentNum));
  }

  /** Skill Section **/
  function initSkill() {
    var options = {
      skills: {
        'javascript': 70,
        'html': 75,
        'css': 65,
        'php': 50
      },
      radius: isMobile() ? 50 : 100,
      margin: 100,
      startAngle: 2*Math.PI/3
    };

    var canvas = el.$canvas;
    canvas.setAttribute('width', $window.width());
    var ctx =  canvas.getContext('2d');

    var index = 0;
    for (var skill in options.skills) {
      drawProcessCirle(ctx, skill, index, options);
      index++;
    }
  }

  function drawProcessCirle(ctx, skill, index, options) {
    var cirleX = (2 * index + 1) * options.radius + (index + 1) * options.margin,
        cirleY = options.radius + options.margin / 2;

    // outter cirle
    ctx.beginPath();
    ctx.arc(cirleX, cirleY, options.radius, 0, Math.PI*2, true);
    ctx.lineWidth = 25;
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    // process cirle
    var count = 0;
    var handle = setInterval(function() {
      if (count == 10) {
        clearInterval(handle);
      }

      // angle
      ctx.beginPath();
      var anglePerSec = 2 * Math.PI * count / (100 / (options.skills[skill]) * 10);
      ctx.arc(cirleX, cirleY, options.radius, options.startAngle, options.startAngle + anglePerSec, false);
      ctx.strokeStyle = cirleColors[index];
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.closePath();

      count++;
    }, 60);

    // draw text
    ctx.font = 'bold 18px Helvetica';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(skill.toUpperCase(), cirleX, 2*cirleY);
    ctx.closePath();

    setNumber(cirleX, cirleY, skill, options.skills);
  }

  function setNumber(cirleX, cirleY, skill, skills) {
    var $skill = $view.find('.' + skill);
    $skill.css({
      top: cirleY - 25,
      left: cirleX - 35
    });

    countNumber($skill, skills[skill], true);
  }

  return {
    init: function() {
      $view = $('.section-wrap');
      cacheElements();
      bindActions();
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