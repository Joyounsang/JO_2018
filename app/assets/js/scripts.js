if (JoApp == undefined || JoApp == null) {
    var JoApp = (function () {

        var check = function () {

            var ua = window.navigator.userAgent;
            var other = 999;
            var msie = ua.indexOf('MSIE ');
            var $html = $('html');

            // check Mobile
            if(ua.indexOf('Mobile') != -1){
                $html.addClass('mobile');
            }

            // check Browser
            if(ua.toLowerCase().indexOf('safari') != -1){
                if(ua.toLowerCase().indexOf('chrome') != -1){
                    $html.addClass('chrome');

                } else {
                    $html.addClass('safari');
                }

            } else if(ua.toLowerCase().indexOf('firefox') != -1){
                $html.addClass('firefox');

            } else if(ua.toLowerCase().indexOf('msie 10.0') != -1){
                $html.addClass('ie ie10');

            } else if(ua.toLowerCase().indexOf('rv:11.0') != -1){
                $html.addClass('ie ie11');
            }


            // check OS
            if( ua.toLowerCase().indexOf('os x') != -1 ){
                $html.addClass('osx');
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
        isCheck = check();

        return {
            check: check
        }

    })(); // Project Module END
  }

$(document).ready(function(){
    loadingUi();
    mainUi();
    backgroundChangeUi();
    scheduleUi();
    modalUi();
    signInUpUi();
    // topBannerUi();
    videoBoxUi();
    inputsDesignPattern();
    gridSystemStatic();
    accessiblity();
    // carouselSlideUi();
    workUi();
    googleCalendarAPI();
    demoGlobalSearch();
    // smoothScroll('.smoothScroll');


    $('.mobile-gnb a').on('click',function(e){
        e.preventDefault();
        $('header').toggleClass('on');
        $('#contents').toggleClass('on');
    });



    if ($('.datepicker').length){
        libDatepicker();
    }

    $('.scrollUp').on('click', function(){
        scrollUpUi();
    });

    $('.back').on('click', function(){
        window.history.back();
    });

});

$(window).on('resize',function() {
    gridSystemStatic();
    modalUi();
    mainUi();
    workUi();
}).resize();




$(window).on('scroll', function(){
    // scrollNav();
}).scroll();






function mainUi(){
    // var changeOffsetTop = $('.scroll-fixed-item').offset().top;
    var topstickH =$('.scroll-fixed-item').outerHeight();
    var navHeight = $( window ).height() - topstickH;
    $('main').outerHeight($( window ).height() - topstickH);
      $(window).on('scroll', function() {
          if($('.main').length) {
              if ($(window).scrollTop() > navHeight) {
                  // $('.schedule-filter').addClass('fixed');
                  $('header, .gnb').removeClass('black');
                  $('.scroll-fixed-item').addClass('on');
                  $('.scroll-fixed-item + .contents').css('padding-top', topstickH);
              }
              else {
                  // $('.schedule-filter').removeClass('fixed');
                  $('header, .gnb').addClass('black');
                   $('.scroll-fixed-item').removeClass('on');
                    $('.scroll-fixed-item + .contents').css('padding-top', 0);
              }
          }
      }).scroll();

      // var mainVideoCtl = $('.main-video').find('.togglePaly');
      var mainVideoCtl = $('.main-article');
      $('.main-video').find('.video-controls').insertAfter(mainVideoCtl);
      $('main').find('.togglePaly').on('click',function(){
          $(this).toggleClass('active');
      });




      // $('.scrollDown').on('click', function() {
      //     $('html,body').animate({
      //         scrollTop: changeOffsetTop
      //     },1000);
      // });
}
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
    } else if($('.adm').length > 0){
        $('html').addClass('adm');
    }


    if($('.container.work').length > 0){
        $('.gnb li.space').addClass('on');
    } else if($('.container.about').length > 0){
        $('.gnb li.human').addClass('on');
    }
}
function modalUi(){
    // sizing and position
    modalSizing();

    $('.modalLoad').on('click',function(e){
        e.preventDefault();
        var $self = $(this);
        var $target = $($(this).attr('href'));
        var $targetId = $target.attr('id');

        modalSizing();
        createDim();
        $('.dim').addClass($targetId);

        // $target.insertAfter($self);
        $target.fadeIn(250).find('.modal-header a').focus();

        $target.find('.modal-header a').on('focusout', function(){
            $(this).parent().next('.modal-body').find('.ancher').focus();
        });

        // keydown focus repeat
        $target.find(".close").on('keydown', function(e){
            if(e.which === 9){
                setTimeout(function(){
                    $target.find('.modal-header a').focus();
                }, 1);
            }
        });

        $target.on('keydown', function(e){
            if( (e.shiftKey && e.keyCode === 9) ) {
              setTimeout(function(){
                $target.find('.modal-header a').focus();
              }, 1);
            }
        });

        // close and focusout
        var isVisible = $target.is(':visible');
        var modalLength = $('.modal:visible').length;

        $target.find(".close").on('click',function(e){
            e.preventDefault();
            $target.fadeOut(250);
            $self.focus();
            $(this).off('click');
            if (isVisible) {
                if (modalLength > 1) {
                    $target.fadeOut(250);
                } else {
                    removeDim();
                }
            }
        });
        // keyboard interaction
        $target.on("keyup", function(e){
            if(e.which=='27'){
                $target.fadeOut(250);
                $self.focus();
                $(this).off('click');
                if (isVisible) {
                    if (modalLength > 1) {
                        $target.fadeOut(250);
                    } else {
                        removeDim();
                    }
                }

            }
        });


    });
}
function modalSizing(){
    $('.modal').each(function(){
        var layerResize = $(window).height();
        var layerHeight = $(this).outerHeight();
        var layerWidth = $(this).outerWidth();
        $(this).css({
            marginLeft : -layerWidth/2,
            marginTop : -layerHeight/2
        });

        $(this).find('.modal-body').css({
            maxHeight : layerResize/2
        });
    });
}
function createDim(){
    if (!$('.dim').length) {
        $('body').append('<div class="dim"></div>');
    }
    $('.dim').fadeIn(250);
    $('header').addClass('black');
    // $('body').addClass('scrollFix');
    //$('.dim').on('touchmove scroll mousewheel', function(e) {
    //    e.preventDefault();
    //    e.stopPropagation();
    //    return false;
    //});
}
function removeDim(){
    $('.dim').fadeOut(250);
    $('header').removeClass('black');
    // $('body').removeClass('scrollFix');
    //$('body').removeClass('scrollFix').off('touchmove scroll mousewheel');
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


    $('.viewBlock').on('click',function(e){
        e.preventDefault();
        $(this).toggleClass('board');
        $('.schedule-box').toggleClass('block');
    });


    $('.schedule-filter-search').find('.setting').on('click',function(e){
        $('.schedule-filter-option').slideToggle();
    });

    $('.like-select').on('click',function(){
        $(this).toggleClass('on').siblings().removeClass('on');
    });
}
function topBannerUi(){
    setTimeout(function() {
        $('.top-banner').addClass('on');
    },500);

    setTimeout(function() {
        $('.top-banner').removeClass('on');
    },5000);
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
        modalSizing();
    });
    $('.btn-signin').on('click',function(e){
        e.preventDefault();
        $('.signin').fadeIn();
        $('.signup').hide();
        modalSizing();
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
function workUi(){
    //work
    var workTopstickH =$('.work .scroll-fixed-item').outerHeight() + 30;
    $('.container.work').css('padding-top', workTopstickH);
    $('.workarchive-list').find('li').on('mousemove', function(){
        $(this).siblings().addClass('hide');
    });
    $('.workarchive-list').find('li').on('mouseout', function(){
        $(this).siblings().removeClass('hide');
    });
}
function libDatepicker(){
	$('.datepicker').datepicker({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		dayNames : ['월', '화', '수', '목', '금', '토', '일' ],
		dayNamesMin : ['월', '화', '수', '목', '금', '토', '일' ],
		dayNamesShort : ['월', '화', '수', '목', '금', '토', '일' ],
		monthNames : ['. 1', '. 2', '. 3', '. 4', '. 5', '. 6', '. 7', '. 8', '. 9', '. 10', '. 11', '. 12'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		showMonthAfterYear: true,
		changeMonth: false,
		changeYear: false,
		yearSuffix: '년',
		altField: '.hide-input', // 노출잘자 클릭 텍스트 val 자동입력
		//minDate:0, // today(0) 기준 이전 날짜 선택 불가
        onSelect: function() {
            if($('.step-select.lvtest1').length){
                $(this).parents('li').next().find('select').removeAttr('disabled');
                $(this).parents('li').next().find('.nice-select').removeClass('disabled');
            }
            if($('.step-select.lvtest2').length){
                $(this).parents('li').next().find('.nice-select').removeClass('disabled');
                $(this).parents('.select-box').next('.levelsteptime').fadeIn();
            }
        }

	});


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


function googleCalendarAPI(){
    /*
    "https://www.googleapis.com/calendar/v3/calendars/k5u784u0llh5fgmckeusemnhmo@group.calendar.google.com/events?key=AIzaSyB97NUokqE2aK5WJi6p1Wb0PXOSE-pd78Y&singleEvents=true&orderBy=starttime&maxResults=10&timeMin="+new
    */

    //string date to start the list range.
    //recommend using Date.now() to filter out past events
    var startDate = '1/1/2015';
    var items = [];
    $.getJSON(
      "https://www.googleapis.com/calendar/v3/calendars/k5u784u0llh5fgmckeusemnhmo@group.calendar.google.com/events?key=AIzaSyB97NUokqE2aK5WJi6p1Wb0PXOSE-pd78Y&singleEvents=true&orderBy=starttime&maxResults=10&timeMin="+new Date(startDate).toISOString(),
      function(data) {
        $.each(data["items"], function(key, val) {
          items.push(startDate(val["start"]));
        });
        items = items.slice().sort();
        for (var i = 0; i < items.length - 1; i++) {
          if (items[i + 1] == items[i]) {
            items.splice(i, 1);
          }
        }

        var events = {};
        items.forEach(function(item) {
          $.each(data["items"], function(key, val) {
            if (item == startDate(val["start"])) {
              //console.log(val);
              if(events[item] === undefined){
                events[item] = new Array();
              }

              events[item].push({
                'eventTitle' : val["summary"],
                'eventDescr' : val["description"]===undefined ? "No Event Description" : val["description"],
                'startTime' : startTime(val["start"]),
                'endDate' : moment(startDate(val["end"])).format('l'),
                'endTime' : startTime(val["end"]),
                'htmlLink' : val["htmlLink"],
                'location' : val["location"]===undefined ? " " : val["location"]
                // 'attachments' : val["attachments"]

              });
              console.log(val);
            }

          });
        });
        var markup = "";
        items.forEach(function(eventDate){

          var monthName = moment(eventDate).format("MMMM").toUpperCase();
          var monthDate = moment(eventDate).format("DD");
          var year = moment(eventDate).format("YY");
          var month = moment(eventDate).format("MM");


          markup += "<div class='row-group'>";
          markup += "<div class='row'>";

          markup += "<div class='column time'>";
          markup += "<div class='time-date'><span>"+year+"'"+month+"/</span>"+monthDate+"</div>";
          markup += "</div>";

          markup += "<div class='column event'>";
          events[eventDate].forEach(function(event){
              markup += "<div class='event-item'>";
              markup += "<div class='info'>";
              markup += "<span class='schedule-title'>"+event["eventTitle"]+" : "+event["eventDescr"]+" ━ "+event["endDate"]+"</span>";

              markup += "<span class='sub-info'>";
              markup += "<span class='time-hour'>"+event["startTime"]+" / "+event["location"]+'</span>';
              markup += "</span>";
              markup += "</div></div>";
          });
          markup += "</div></div></div>";
        });
        $("#calendar-list").append(markup);
        var calendarCount = $('.event-item').length;
        $('.allCont').text(calendarCount);
        //console.log(events);

        function startDate(d) {
          if (d["dateTime"] === undefined) return d["date"];
          else {
            var formatted = new Date(d["dateTime"]);
            var day = formatted.getDate();
            var month = formatted.getMonth() + 1;
            var year = formatted.getFullYear();
            return year + "-" + pad(month) + "-" + pad(day);
          }
        }

        function startTime(d){
          if (d["dateTime"] === undefined) return "All Day";
          else {
            var formatted = new Date(d["dateTime"]);
            return moment(d["dateTime"]).format('LT');
          }
        }

        function pad(n) {
          return n < 10 ? "0" + n : n;
        }

        $(".events").click(function(e) {
          $(e.target)
            .next("div")
            .siblings("div")
            .slideUp();
          $(e.target)
            .next("div")
            .slideToggle();
        });
      }
    );

}

function demoGlobalSearch(){
    // demo search Ui
    function removeHighlighting(highlightedElements) {
       highlightedElements.each(function() {
          var element = $(this);
          element.replaceWith(element.html());
       })
    }
    function addHighlighting(element, textToHighlight) {
       var text = element.text();
       var highlightedText = '<em style="color:#da4d73">' + textToHighlight + '</em>';
       var newText = text.replace(textToHighlight, highlightedText);

       element.html(newText);
    }
    $("#scheduleSearch").keyup(function() {
       var value = this.value.toLowerCase().trim();

       removeHighlighting($(".schedule-title em"));

       $(".event-item").each(function(index) {
          if (!index) return;
          $(this).find(".schedule-title").each(function() {
             var id = $(this).text().trim();
             var matchedIndex = id.indexOf(value);
             if (matchedIndex === 0) {
                addHighlighting($(this), value);
             }
             var not_found = (matchedIndex == -1);
             $(this).parents('.row-group').toggle(!not_found);


             return not_found;
          });
       });
    });

}
