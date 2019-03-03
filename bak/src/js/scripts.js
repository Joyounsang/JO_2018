if (Project == undefined || Project == null) {
    var Project = (function () {

        // IE version check
        var check = function () {

            var ua = window.navigator.userAgent;
            var other = 999;
            var msie = ua.indexOf('MSIE ');

            // check Mobile
            if(ua.indexOf('Mobile') != -1){
                $('html').addClass('mobile');
            }


            // check Browser
            if(ua.toLowerCase().indexOf('safari') != -1){

                if(ua.toLowerCase().indexOf('chrome') != -1){
                    $('html').addClass('chrome');

                } else {
                    $('html').addClass('safari');
                }

            } else if(ua.toLowerCase().indexOf('firefox') != -1){
                $('html').addClass('firefox');

            } else if(ua.toLowerCase().indexOf('msie 6.0') != -1){
                $('html').addClass('ie ie9');

            } else if(ua.toLowerCase().indexOf('msie 7.0') != -1){
                $('html').addClass('ie ie9');

            } else if(ua.toLowerCase().indexOf('msie 8.0') != -1){
                $('html').addClass('ie ie9');

            } else if(ua.toLowerCase().indexOf('msie 9.0') != -1){
                $('html').addClass('ie ie9');

            } else if(ua.toLowerCase().indexOf('msie 10.0') != -1){
                $('html').addClass('ie ie10');

            } else if(ua.toLowerCase().indexOf('rv:11.0') != -1){
                $('html').addClass('ie ie11');
            }


            // check OS
            if( ua.toLowerCase().indexOf('os x') != -1 ){

            }


            if (msie > 0) { // IE 10 or older
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }
            var trident = ua.indexOf('Trident/');
            if (trident > 0) { // IE 11
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            var edge = ua.indexOf('Edge/');
            if (edge > 0) { // Edge (IE 12+)
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
            return other;
        }, // browser test...
        isCheck = check()

        return {
            check: check
        }

    })(); // Project Module END
  }



$(document).ready(function(){
    loadingUi();
    backgroundChangeUi();
    scheduleUi();
    modalUi();
    signInUpUi();
    topBannerUi();
    videoBoxUi();
    inputsDesignPattern();
    gridSystemStatic();
    accessiblity();

    $('.scrollUp').on('click', function(){
        scrollUpUi();
    });

    $('.back').on('click', function(){
        window.history.back();
    });



});

$(window).on('resize',function() {
    gridSystemStatic();
}).resize();

$(window).on('scroll', function(){
    scrollNav();
}).scroll();





function loadingUi(){
    $('.main-video video').delay(2000).animate({opacity:1},2000);
    setTimeout(function() {
        autoTypingUi(".main-article",100);
    },200);


    $('.loader').delay(500).animate({height:0},800);

    $('html').addClass('ov-hidden');
    setTimeout(function() {
        $('html').removeClass('ov-hidden');
    },800);


    var moveUrl = $('.gnb a, .logo a, .ani, .back');
    moveUrl.click(function () {
        $('html').addClass('ov-hidden');
        var url = $(this).attr("href");
        $(".loader").animate({
            "width": "100%",
            "height":"100%"
        },800, function () {
            document.location.href = url;
        });

        return false;
    });

}
function backgroundChangeUi(){
    if($('.layout-table').length > 0){
        $('.footer').addClass('absolute');
    }
    if($('.black').length > 0){
        $('html, header, footer, .gnb, .footer').addClass('black');
    } else if($('main').length > 0){
        $('html').addClass('main');
        $('header, .gnb').addClass('black');
        $('.footer').removeClass('absolute');
    }

    if($('html').hasClass('main')){
        mainUi();
    }

    if($('.container.work').length > 0){
        $('.gnb li.space').addClass('on');
    } else if($('.container.about').length > 0){
        $('.gnb li.human').addClass('on');
    }
}
function scrollNav(){
    var windowScrollTop = $(window).scrollTop();
    var $barProgress = $('.progress');
    if ( windowScrollTop > 0) {
        var scrollPercent = 100 * windowScrollTop / ($(document).height() - $(window).height());
        $barProgress.css('display','block');
        $barProgress.height(parseInt(scrollPercent, 10) + "%");
    }
}
function mainUi(){
    var changeOffsetTop = $('.schedule-filter').offset().top;
    var topstickH =$('.schedule-filter').height();
    var navHeight = $( window ).height() - topstickH;
      $(window).on('scroll', function() {
          if ($(window).scrollTop() > navHeight) {
              // $('.schedule-filter').addClass('fixed');
              $('header, .gnb').removeClass('black');
          }
          else {
              // $('.schedule-filter').removeClass('fixed');
              $('header, .gnb').addClass('black');
          }
      });

      $('.scrollDown').on('click', function() {
          $('html,body').animate({
              scrollTop: changeOffsetTop
          },1000);
      });
}
function modalUi(){
    $('.modalLoad').on('click',function(e){
        e.preventDefault();
        var $self = $(this);
        var $target = $($(this).attr('href'));

        // open and focusin
        $target.attr('tabindex', '0').fadeIn(250).focus();

        // create sizing
        var layerHeight = $target.outerHeight();
        var layerWidth = $target.outerWidth();
        $target.css({
            marginLeft : -layerWidth/2,
            marginTop : -layerHeight/2
        });

        // create background
        if (!$('.dim').length) {
            $('html').append('<div class="dim"></div>');
        }
        $('.dim').fadeIn(250);

        // keydown focus repeat
        $target.find(".close").on('keydown', function(e){
            if(e.which=='9'){
                $target.attr('tabindex', '0').focus();
            }
        });

        // close and focusout
        $target.find(".close").on('click',function(e){
            e.preventDefault();

            $target.fadeOut(250);
            $self.focus();
            $(this).off('click');
            var isVisible = $target.is(':visible');
            var modalLength = $('.modal:visible').length;

            if (isVisible) {
              if (modalLength > 1) {
                $target.fadeOut(250);
              } else {
                $('.dim').fadeOut(250);
              }
            }
        });

        $(document).on("keyup", function(e){
            if(e.which=='27'){
                $target.fadeOut(250);
                $('.dim').fadeOut(250);
                $self.focus();
            }
        });


    });
}
function scrollUpUi(){
    $('html,body').animate({
        scrollTop: $('html').offset().top
    },1000);
}
function autoTypingUi(elementClass, typingSpeed){
  var thhis = $(elementClass);
  //thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".main-text");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },30);
}
function scheduleUi(){
    var newdate = new Date();
    var scAllCont = $('.schedule-box .event-item').length;
    console.log(newdate);
    $('.scheduleAllCont').text(scAllCont);


    $('.viewToggle').on('click',function(e){
        e.preventDefault();
        $(this).toggleClass('board');
        $('.schedule-box').toggleClass('active');
    });
}
function topBannerUi(){
    $('.top-banner-control').on('click',function(){
        $('.top-banner').toggleClass('on');
    });
}
function videoBoxUi(){
    $('.video-box').each(function(){
        var $this = $(this);
        var video = $this.find('video');

        var controlStr ='';
            controlStr ='<div class="video-controls"><button class="togglePaly btnico play" type="button">재생/일시정지</button></div><div class="custom-controller"><div class="progressTime"><span class="current">0</span><span class="duration"></span></div><div class="progressBar"><div class="timeBar"></div><div class="bufferBar"></div></div><div class="progressBtn"><!-- <button class="ctl-play" type="button">재생</button><button class="ctl-pause" type="button">일시정지</button> --><button class="ctl-replay btnico reflash" type="button">다시보기</button></div></div>';
            $(this).append(controlStr);



        $this.find('.togglePaly').on('click', function() {


            if(video[0].paused) {
                video[0].play();
            }
            else {
                video[0].pause();
            }

            return false;
        });

        // video status
        video.on('play', function(){
            $this.find('.togglePaly').addClass('active');
            $(this).parents('.video-box').removeClass('grayscale');
        });
        video.on('pause', function(){
            $this.find('.togglePaly').removeClass('active');
            $(this).parents('.video-box').addClass('grayscale');
        });
        video.on('ended', function(){
            $this.find('.togglePaly').removeClass('active');
            $(this).parents('.video-box').addClass('grayscale');
        });



        $this.find('.ctl-play').on('click', function() {
          video[0].play();
        });

        $this.find('.ctl-pause').on('click', function() {
          video[0].pause();
        });

        $this.find('.ctl-replay').on('click', function() {
          video[0].load()
          video[0].play();
        });

        //update HTML5 video current play time
        video.on('timeupdate', function() {
            var currentPos = video[0].currentTime; //Get currenttime
            var maxduration = video[0].duration; //Get video duration
            var percentage = 100 * currentPos / maxduration; //in %

            $this.find('.current').text(Math.floor(currentPos)); // currentTime math
            $this.find('.duration').text(Math.floor(maxduration));  // currentTime max math
            $this.find('.timeBar').css('width', percentage+'%'); // progress bar ui
        });

        //get HTML5 video time duration
        // video.on('loadedmetadata', function() {
        //     $this.find('.duration').text(video[0].duration);
        // });


        var timeDrag = false;   /* progress bar Drag status */
        $this.find('.progressBar').mousedown(function(e) {
            timeDrag = true;
            updatebar(e.pageX);
        });
        $(document).mouseup(function(e) {
            if(timeDrag) {
                timeDrag = false;
                updatebar(e.pageX);
            }
        });
        $(document).mousemove(function(e) {
            if(timeDrag) {
                updatebar(e.pageX);
            }
        });

        //update Progress Bar control
        var updatebar = function(x) {
            var progress = $('.progressBar');
            var maxduration = video[0].duration; //Video duraiton
            var position = x - progress.offset().left; //Click pos
            var percentage = 100 * position / progress.width();

            //Check within range
            if(percentage > 100) {
                percentage = 100;
            }
            if(percentage < 0) {
                percentage = 0;
            }

            //Update progress bar and video currenttime
            $this.find('.timeBar').css('width', percentage+'%');
            video[0].currentTime = maxduration * percentage / 100;
        };


        // berffer progressbar style
        var startBuffer = function() {
            var maxduration = video[0].duration;
            var currentBuffer = video[0].buffered.end(0);
            var percentage = 100 * currentBuffer / maxduration;
            $this.find('.bufferBar').css('width', percentage+'%');

            if(currentBuffer < maxduration) {
                setTimeout(startBuffer, 500);
            }
        };
        setTimeout(startBuffer, 500);

    });
}videoBoxUi();
function signInUpUi(){
    $('.btn-signup').on('click',function(e){
        e.preventDefault();
        $('.signin').hide();
        $('.signup').fadeIn();
    });
    $('.btn-signin').on('click',function(e){
        e.preventDefault();
        $('.signin').fadeIn();
        $('.signup').hide();
    });
}
function inputsDesignPattern(){
    $('.rdo, .chk').after('<label class="cutomiptico">icon</label>');

    $('.cutomiptico').on('click', function(){
        var rdoId = $(this).prev().attr('id');
        $(this).attr('for', rdoId);
    });
}
function gridSystemStatic() {
    $(".row > .column").css("height", "auto");
    var cNum = $(".row").length;

    for (var i = 0; i < cNum; i++) {
        var ccnum = "col-" + $(".row").eq(i).children(".column").length;
        $(".row").eq(i).addClass(ccnum);
    }
}
function accessiblity(){
    $('.fnb').on('focusin', function(){
        $(this).addClass('on');
    });
    $('.fnb').on('focusout', function(){
        $(this).removeClass('on');
    });
}












    // var timeClone = new Array();
    // $('.schedule-box .row .column.time').each(function(){
    //     timeClone.push($(this).text());
    // });
    //
    // for (i = 0; i < timeClone.length; i++) {
    //     $('.time-clone').append('<li><a class="time-clone-link" href="#'+ '' +'">'+timeClone[i]+'</a></li>');
    // }
    //
    // $('.time-clone-link').on('click',function(e){
    //     e.preventDefault();
    //     // $(this).parent('li').
    // });
