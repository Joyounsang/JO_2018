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
        isCheck = check(),

        // Modal event
        showModal = function (target) {
            if ($(target).length) {
                setLayerSize(target);
                if (!$('.modal-bg').length) {
                    $('html').append('<div class="modal-bg"></div>');
                }

                if (isCheck > 8) {
                    $(target + ', .modal-bg').fadeIn(250);
                } else {
                    $(target + ', .modal-bg').show();
                }
            }
        },



        setLayerSize = function (target) {
            var layerHeight, scrollHeight, layerWidth;

            layerHeight = ($window.height() - $(target).height()) / 2;
            scrollHeight = ($window.scrollTop() + layerHeight);
            layerWidth = $(target).outerWidth();

            $(target).css('top', scrollHeight);
            $(target).css('margin-left', -layerWidth/2);
        },

        closeModal = function (target) {
            var isVisible = $(target).is(':visible');
            var modalLength = $('.modal:visible').length;

            if (isVisible) {
              if (modalLength > 1) {
                $(target).fadeOut(250);
              } else {
                $(target + ', .modal-bg').fadeOut(250);
              }
            }
        };

        return {
            check: check, // check browser
            showModal: showModal, // modal open
            closeModal: closeModal, // modal close
        }

    })(); // Project Module END
  }

$(document).ready(function(){
    if($('.black').length > 0){
        $('html, header, footer, .gnb').addClass('black');
    } else if($('main').length > 0){
        $('html').addClass('main');
        $('header, .gnb').addClass('black');
    }

    if($('html').hasClass('main')){
        mainUi();
    }

    if($('.container.work').length > 0){
        $('.gnb li.space').addClass('on');
    } else if($('.container.about').length > 0){
        $('.gnb li.human').addClass('on');
    }
    loading();

    tabUi();



    $('.calendarOpen').on('click', function(e){
        e.preventDefault();
        $('.calendar-box').toggleClass('on');
    });

    $('.scrollUp').on('click', function(){
        scrollUpUi();
    });
    $('.back').on('click', function(){
        window.history.back();
    });
    $('.viewToggle').on('click',function(e){
        e.preventDefault();
        $('.schedule-box').toggleClass('active');
    });

    // open modal
    var $btn_modal = $('.btn-modal');
    $btn_modal.on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
          target = $this.attr('href');
      Project.showModal(target);
    });

    // close modal
    $('.modal .close').on('click', function (e) {
        e.preventDefault();
        var target = '#' + $(this).parents('.modal').attr('id');
        Project.closeModal(target);
    });







});


function loading(){
    $('.main-video video').delay(2000).animate({opacity:1},2000);
    setTimeout(function() {
        autoTypingUi(".main-article",100);
    },200);


    $('.loader').delay(500).animate({height:0},800);
    // $('.loader').delay(500).animate({width:0},800);
    // $(window).on('resize',function(){
    //     if($(window).width() <= 600){
    //         $('.loader').animate({height:100+'%'},800);
    //     } else {
    //         $('.loader').animate({height:0},800);
    //     }
    // }).resize();



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
function mainUi(){
    var changeOffsetTop = $('.timeline-top').offset().top;
    var topstickH =$('.timeline-top').height();
    var navHeight = $( window ).height() - topstickH;
      $(window).on('scroll', function() {
          if ($(window).scrollTop() > navHeight) {
              // $('.timeline-top').addClass('fixed');
              $('header, .gnb').removeClass('black');
          }
          else {
              // $('.timeline-top').removeClass('fixed');
              $('header, .gnb').addClass('black');
          }
      });

      $('.scrollDown').on('click', function() {
          $('html,body').animate({
              scrollTop: changeOffsetTop
          },1000);
      });
}
function tabUi(){
    var idx = $('.tab_cont').index();
    $('.tab_cont').not(':eq('+idx+')').hide(); // tab_cont :: all hide

    $('.tab_lst').each(function(){ // tab_lst li first :: on
        var $this = $(this);
        var $first_lst = $(this).children('li').eq(0);
        $first_lst.addClass('on');
    });

    $('.tab_container').each(function () { // tab_cont first :: on
        var $this = $(this);
        var $first_tab = $(this).children('.tab_cont').eq(0);
        $first_tab.show();
    });

    var $btn_tab = $('.tab_lst').find('li');
    $btn_tab.on('click', function(e){
        e.preventDefault();

        var $this = $(this),
            $thisrel = $this.attr('rel'); // tab_lst li :: rel
            $thisClass = $('.'+ $thisrel); // tab_cont :: class
            target = $thisClass.parent('.tab_container').attr('id'); // tab_container :: id

            $('#' + target).find('.tab_cont').hide();
            $('#' + target + ' .' + $thisrel).fadeIn();

            $this.addClass('on').siblings().removeClass('on'); // tab_lst li :: on
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







$(window).on('scroll', function(){
    scrollNav();
}).scroll();




function scrollNav(){
var windowScrollTop = $(window).scrollTop();
var $barProgress = $('.progress');
if ( windowScrollTop > 0) {
    var scrollPercent = 100 * windowScrollTop / ($(document).height() - $(window).height());
    $barProgress.css('display','block');
    $barProgress.height(parseInt(scrollPercent, 10) + "%");
}
}
