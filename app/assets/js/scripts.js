$(document).ready(function() {

    var eventDataSourceURL = 'https://www.googleapis.com/calendar/v3/calendars/k5u784u0llh5fgmckeusemnhmo@group.calendar.google.com/events?key=AIzaSyB97NUokqE2aK5WJi6p1Wb0PXOSE-pd78Y';

    var calendarupdateInterval = 5000;  // RE-FETCH INTERVAL FOR GOOGLE CALENDAR DATA
    var calendarAddedtoPage = false;    // FLAG TO DETECT IF CALENDAR HAS PREVIOUSLY BEEN ADDED OR NEEDS TO BE ADDED
    var eventsArray = [];               // EMPTY ARRAY WE'LL USE TO HOLD OUR EVENTS


    // FUNCTION TO GET THE JSON DATA FROM GOOGLE CALENDAR API IN JSON FORMAT
    function getData() {
        eventsArray = [];   // EMPTY THE ARRAY EACH TIME WE START THIS OR WILL HAVE DUPLICATE EVENTS IN ARRAY
        $.getJSON(
            eventDataSourceURL,
            function(result) {

                // THE JSON DATA FROM GOOGLE IS NOT IN THE FORMAT THAT FULLCALENDAR NEEDS, SO WE'LL LOOP THROUGH AND BUILD OUR OWN ARRAY TO USE
                $.each(result.items, function(i, val) {
                    // IF THE STATUS IS CONFIRMED AND IT HAS A START DATE AND TIME... OTHERWISE WE MAY LACK DATA NEEDED TO ADD TO CALENDAR...
                    if (result.items[i].status === "confirmed" && result.items[i].start.dateTime) {
                        // WHEN WE ENCOUNTER AN EVENT WITH NO 'SUMMARY' TEXT (THE EVENT TITLE), WE NEED TO SET SOME TEXT SINCE THE CODE AND CALENDAR EXPECTS IT
                        if (!result.items[i].summary){
                                result.items[i].summary = 'No Summary found in google calendar'
                        }
                        // THEN WE ADD IT TO OUR EVENTS ARRAY...
                        eventsArray.push({
                            title: val.summary.replace(/['"]+/g, "") + '\n -- event #'+i,  // THE TITLE ELEMENT OF THE ARRAY, REMOVING ANY QUOTES THOUGH...
                            start: val.start.dateTime   // THE DATE AND TIME FOR THE EVENT
                        });
                    } else {
                        console.log("could not add due to lacking data ... event date/time or status not confirmed");
                    }
                });

               //TEST REMOVE THE 15TH ARRAY ITEM
               //if (calendarAddedtoPage == true){
               //    eventsArray.splice(15,1);
               //}


                // RUN OUR DRAW CALENDAR FUNCTION TO EITHER ADD THE CALENDAR AND POPULATE WITH DATA OR UPDATE THE CALENDAR WITH NEWLY ACQUIRED DATA...
                drawCalendar();


            }
        );
    }



    function drawCalendar() {
        // IF THE CALENDAR HAS NOT BEEN ALREADY ADDED TO THE PAGE...
        if (calendarAddedtoPage == false) {
            calendarAddedtoPage = true;
            // CALENDAR HAS NOT BEEN DRAWN ONCE SO WE ARE ADDING IT TO DOM
            console.log('Create NEW Calendar for dom ' + new Date())
            $("#calendar").fullCalendar({
                defaultView: "month", //Possible Values: month, basicWeek, basicDay, agendaWeek, agendaDay
                header: {
                    left: "title",
                    center: "",
                    //right: "today,prevYear,prev,next,nextYear" //Possible Values: month, basicWeek, basicDay, agendaWeek, agendaDay, today prevYear,prev,next,nextYear
                    right: 'agendaDay,agendaWeek,month,prev,next'
                },
                buttonIcons: {
                    prev: "left-single-arrow",
                    next: "right-single-arrow",
                    prevYear: "left-double-arrow",
                    nextYear: "right-double-arrow"
                }

            });
            $("#calendar").fullCalendar("removeEventSources" );     // JUST TO MAKE SURE NOTHINGS IN CALENDAR... PROBABLY OVERKIILL, BUT WHAT THE HELL...
            $("#calendar").fullCalendar("addEventSource", eventsArray); // ADD THE NEW ARRAY OF DATA TO THE CALENDAR

            // START A x SECOND LOOP WHERE WE RE-RUN THE GET DATA FUNCTION AND START IT ALL OVER AGAIN...
            setInterval(function(){
                getData()
            }, calendarupdateInterval)

        } else if (calendarAddedtoPage == true) {
            // CALENDAR HAS ALREADY BEEN DRAWN ONCE, SO JUST UPDATE THE DATA WITH NEW EVENTS ARRAY RETRIEVED...
            console.log('Updating calendar data - ' + new Date())

            $("#calendar").fullCalendar( 'removeEvents');  // JUST TO MAKE SURE NOTHINGS IN CALENDAR... PROBABLY OVERKIILL, BUT WHAT THE HELL...
            $("#calendar").fullCalendar( 'addEventSource', eventsArray ) // ADD THE NEW ARRAY OF DATA TO THE CALENDAR

        }


    }

    // START THINGS OFF AND GET THIS PARTY STARTED... BASICALLY CALLING THE FIRST FUNCTION THAT SETS IT INTO MOTION...
    getData();
});

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
            'eventDescr' : val["description"]===undefined ? "<i>No Event Description</i>" : val["description"],
            'startTime' : startTime(val["start"]),
            'endDate' : moment(startDate(val["end"])).format('l'),
            'endTime' : startTime(val["end"]),
            'htmlLink' : val["htmlLink"]
          });
          //console.log(events);
          //console.log(val);
        }

      });
    });
    var markup = "";
    items.forEach(function(eventDate){
      var monthName = moment(eventDate).format("MMMM").toUpperCase();
      var monthDate = moment(eventDate).format("DD");
      markup += "<div class='column time'><span>" + montDate + "/"+ monthName +"</span></div>";
      markup += "<div class='column event'>";
      markup += "<div class='event-item'>";
      markup += "<div class='info'>";
      events[eventDate].forEach(function(event){
      markup += '<a class="schedule-title" href="boardView.html">'+ event["eventTitle"] +'</a>';
      markup += '<p class="schedule-desc">'+event["eventDescr"]+'</p>';
      markup += '<span class="sub-info">';
      markup += '<span>'+event["startTime"]+'</span>';
      markup += '</span>';
      });
      markup += '</div>';
      markup += '</div>';
      markup += '</div>';



      // markup += "<span class='date-month'>"+monthName+"</span>";
      // markup += "<span class='date-day'>"+monthDate+"</span>";
      // markup += "</div><div class='events'>";
      // events[eventDate].forEach(function(event){
      //   console.log(event);
      //   markup += "<li class='cal'>";
      //   markup += "<h3 class='calendar-title'>"+event["eventTitle"]+"</h3>";
      //   markup += "<div class='event-details'>";
      //   markup += "<u>Start Time</u>: "+event["startTime"]+"<br/>";
      //   markup += "<u>End Date</u>: "+event["endDate"]+"<br/>";
      //   markup += "<u>End Time</u>: "+event["endTime"]+"<br/><br/>";
      //   markup += event["eventDescr"] + "<br/><br/>";
      //   markup += "<a href='"+event["htmlLink"]+"'>View this Event in Google Calendar</a><br/><br/>";
      //   markup += "</div></li>"
      // });
      // markup +="</span></ol></div></div>";
    });
    $("#googleCalendarApi").append(markup);
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
    // topBannerUi();
    videoBoxUi();
    inputsDesignPattern();
    gridSystemStatic();
    accessiblity();
    carouselSlideUi();
    smoothScroll('.smoothScroll');


    //work
    var workTopstickH =$('.work .scroll-fixed-item').outerHeight();
    $('.container.work').css('padding-top', workTopstickH);
    $('.workarchive-list').find('li').on('mousemove', function(){
        $(this).siblings().addClass('hide');
    });
    $('.workarchive-list').find('li').on('mouseout', function(){
        $(this).siblings().removeClass('hide');
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

    // var mainVideoCtl = $('.main-video').find('.togglePaly');
    var mainVideoCtl = $('.main-article');
    $('.main-video').find('.video-controls').insertAfter(mainVideoCtl);
    $('main').find('.togglePaly').on('click',function(){
        $(this).toggleClass('active');
    });


    $('.mobile-gnb').on('click',function(e){
        e.preventDefault();
        $('header').toggleClass('on');
    });


});

$(window).on('resize',function() {
    var windowSize = $('window').width();
    gridSystemStatic();
    modalUi();
    mainUi();
    if(windowSize >= 924){
        mobileScrollNone();
    }
}).resize();

function mobileScrollNone(){
    $('*').removeClass('mCustomScrollbar');
};

$(window).on('scroll', function(){
    scrollNav();
}).scroll();






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
    var changeOffsetTop = $('.scroll-fixed-item').offset().top;
    var topstickH =$('.scroll-fixed-item').outerHeight();
    var navHeight = $( window ).height() - topstickH;
    $('main').outerHeight($( window ).height() - topstickH);
      $(window).on('scroll', function() {
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
      });




      $('.scrollDown').on('click', function() {
          $('html,body').animate({
              scrollTop: changeOffsetTop
          },1000);
      });
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
