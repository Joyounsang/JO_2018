var $window = $(window);

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
            /* check OS */
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



    function accordionEvt(){
        $('.accordion > li:eq(0) > a').addClass('active').next().slideDown();
        $('.accordion > li > a').on('click', function(e) {
            var dropDown = $(this).closest('li').find('.accordion-item');

            $(this).closest('.accordion').find('.accordion-item').not(dropDown).slideUp();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.accordion').find('a.active').removeClass('active');
                $(this).addClass('active');
            }

            dropDown.stop(false, true).slideToggle();

            e.preventDefault();
        });
    };accordionEvt();

    $('.lnb-toggle').on('click',function(){
        $('.admin-lnb').toggleClass('active');
    });

    // if($('.container').hasClass('normal')){
    //     $('.fnb ul:first').prepend('<li><a class="btn-top up-scroll" href="#"></a></li>');
    // }
    function timelinetopStickEvt(){
          $(window).on('scroll', function() {

          var topstickOffset = $('.timeline-top').offset();
          var topstickH =$('.timeline-top').height();
              topstickOffsetTop = topstickOffset.top;
          var navHeight = $( window ).height() - topstickH;
              if ($(window).scrollTop() > navHeight) {
                  $('.topstick').addClass('fixed');
              }
              else {
                  $('.topstick').removeClass('fixed');
              }
          });
    }
    //timelinetopStickEvt();



    if($('.container').hasClass('work')){
        $('body').css({
            background: '#24292e'
        });
    }

    loading();
    mobileFooter();
    //mainSvgEvent();
    // submainTitSbt();
    cursorChange();
    gnbEvent();
    introMessage();
    printClock();
    boardToggle();
    adminNav();
    tabLogic();

    function tabLogic(){
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

    $(".back").click(function(){

		window.history.back();

	});


    $('.btn-calendar').on('click', function(e){
        e.preventDefault();
        $('.calendar-box').toggleClass('on');
    });
    if($('main').length > 0){
        $('html').addClass('main');
        $('title').text("younsang");
    }

    if($('.loginForm').length > 0){
        $('html').addClass('login');
    }

    if($('.work').length > 0){
        $('html').addClass('black');
    }


    if($('.workCover').length > 0){
        $('html').addClass('work');
    }

    if($('.admin').length > 0){
        $('html').addClass('admin');
    }


    $('.down-scroll').on('click', function() {
        scrollDownEvt();
    });
    $('.up-scroll').on('click', function(){
        scrollUpEvt();
    });

    $('#changeView').on('click',function(){
        $('.tbl').toggleClass('box');
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


    $('.main-video video').delay(2000).animate({opacity:1},2000);
    setTimeout(function() {  autoType(".main-article",100);},200);
    elementAnimateLib();



});







function tableSoter9(target, data){
    var table = $('<table>');
    $('.'+target).append( table );

    $.each(data, function(inx, row ) {
        var tr = $('<tr>');
        table.append(tr);
        $.each(row, function(inx, col ) {
            var td = $('<td>');
            tr.append(td.html(col));
        });
    });

    table.find('tr:nth-child(1)').find('td').click(function() {
        sortTable(this);
    });
}

function sortTable(cell){
    $('table > tr:nth-child(1)').find('td').each(function(inx, td) {
        td.innerHTML = td.innerHTML.replace(/[▼▲]/g, '') ;
    });

    var sortType = jQuery.data( cell, 'sortType');
    if (sortType === 'asc') {
        sortType = 'desc';
        cell.innerHTML += '▼';
    } else{
        sortType = 'asc';
        cell.innerHTML += '▲';
    }
    jQuery.data( cell, 'sortType', sortType);

    var cellIndex = cell.cellIndex;
    var chkSort = true;
    while (chkSort){
        chkSort = false;
        $('table > tr').each(function(inx, row) {
            if (inx===0 || !row.nextSibling) return;
            var fCell = row.cells[cellIndex].innerHTML.toLowerCase();
            var sCell = row.nextSibling.cells[cellIndex].innerHTML.toLowerCase();
            if ( (sortType === 'asc'  && fCell > sCell)
              || (sortType === 'desc' && fCell < sCell) ) {
                $( row.nextSibling ).insertBefore( $(row) );
                chkSort = true;
            }
        });
    }
}








function adminNav(){

    $('.depath-1 >li> a').on('click',function(e){
        // e.preventDefault();
        $(this).next('.depath-2').toggleClass('on');
    });
}
function boardToggle(){
    $('.board-toggle').on('click',function(e){
        e.preventDefault();
        $('.schedule-box').toggleClass('active');
    });
}
function mobileFooter(){
    $('.and').on('click',function(e){
        e.preventDefault();
        $('.fnb').fadeToggle();
    });
}

function gnbEvent(){
    if ( $('.container').hasClass('human') ) {
      $('.gnb li.human').addClass('on');
    } else if ( $('.container').hasClass('space') ) {
      $('.gnb li.space').addClass('on');
    } else if ( $('.container').hasClass('time') ) {
      $('.gnb li.time').addClass('on');
    }



        var titleTxt = $('title').text();
        var gnbText = $('.gnb li.on').text();
        $('title').text(titleTxt + ' — ' + gnbText);

        if($('.workTitle').length > 0){
            var workItemTit = $('.workTitle').text();
            $('title').text(gnbText + ' — ' + workItemTit + ' — ' +titleTxt);
        }
        if($('.crud-view').length > 0){
            var crudItemTit = $('.crud-view h2').text();
            $('title').text(gnbText + ' — ' + crudItemTit + ' — ' + titleTxt);
        }
        if($('.license').length > 0){
            $('title').text(gnbText + ' — license' + ' — ' + titleTxt);
        }


}



// ㄴㅊ개ㅣㅣ
// $(function(){
//   var curDown = false,
//       curYPos = 0,
//       curXPos = 0;
//   $(window).mousemove(function(m){
//     if(curDown === true){
//      $(window).scrollTop($(window).scrollTop() + (curYPos - m.pageY));
//      $(window).scrollLeft($(window).scrollLeft() + (curXPos - m.pageX));
//     }
//   });
//
//   $(window).mousedown(function(m){
//     curDown = true;
//     curYPos = m.pageY;
//     curXPos = m.pageX;
//   });
//
//   $(window).mouseup(function(){
//     curDown = false;
//   });
// })









function mainSvgEvent(){
    $('.main-iconset li').on('click', function(){
        $(this).toggleClass('active').siblings().removeClass('active');

    });
}

function cursorChange(){
    $("body").mousemove(function(e){
      var cursorXpos = e.pageX;
      var cursorYpos = e.pageY;
      var xposToString = String(cursorXpos);

      var lastDigit = (xposToString.slice(-1));


      $(".cursor").addClass("moving").css({"transform" : "translate("+ cursorXpos+"px ,"+cursorYpos+"px)" });



    });

    $("body").mousedown(function(){
      $(".cursor").addClass("clicked");
    });
    $("body").mouseup(function(){
      $(".cursor").removeClass("clicked");
    });
}

function loading(){
    $('#loader').delay(500).animate({height:0},1000);

    // $("#contents").fadeIn(500, function () {
    //     $(this).animate({
    //         "top": "150px"
    //     },1000);
    // });
    var moveUrl = $('.gnb a');
    moveUrl.click(function () {
        var url = $(this).attr("href");
        $("#loader").animate({
            "width": "100%",
            "height":"100%"
        },1000, function () {
            document.location.href = url;
        });

        return false;
    });

}

$(window).on('scroll', function(){
    scrollNav();
    workMainResizing();
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        // console.log('End of Window');
    }
});


$(window).on('resize', function(){
    slideEvt();
}).resize();

function scrollDownEvt(){
    $('html,body').animate({
        scrollTop: $('.timeline-top').offset().top
    },1000);
}
function scrollUpEvt(){
    $('html,body').animate({
        scrollTop: $('html').offset().top
    },1000);
}



function slideEvt(){


    var index = 0;
    var time = 300;
    var slide = $('.slide');
        slideList = slide.find('.slide-list');
        slideItem = slide.find('.slide-item');
        slideMax = slideItem.length;
        slideSize = slide.width();

    // sizing
    slideList.width(slideSize * slideMax);
    slideItem.width(slideSize);

    // animation and if
    function sliding(add) {
        index = index + add;
        if(index < 0) {
            index = slideMax;
        } else if(index > slideMax - 1){
            index = 0;
        }
        slideList.stop().animate({'left' : - index * slideSize}, time);
    }

    // auto paly
    // autoslide = setInterval(function() { sliding(1) }, 3000);

    $('.next').on('click',function() {
        //clearInterval(autoslide);
        sliding(1);
        // after();
    });

    $('.prev').on('click',function() {
        //clearInterval(autoslide);
        sliding(-1);
        // after();
    });

    $('.current li').on('click',function(e) {
        e.preventDefault();
        //clearInterval(autoslide);

        index = $(this).index();
        sliding(0);

        // after();
    });

    // function after() {
    //     setTimeout(function() {
    //         clearInterval(autoslide);
    //         autoslide = setInterval(function() { sliding(1) }, 3000);
    //     });
    // }


}










function autoType(elementClass, typingSpeed){
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

//
// function submainTitSbt(){
//     $(window).bind('scroll', function() {
//     var navHeight = $( window ).height() - 70;
//       if ($(window).scrollTop() > navHeight) {
//         $('.work-head').addClass('fixed');
//       }
//       else {
//         $('work-head').removeClass('fixed');
//       }
//     });
// }



function workMainResizing(){
    var windowScrollTop = $(window).scrollTop();
    // work-main height auto resizing
    if($('.work-main').length > 0){
        if(windowScrollTop < 600){
          $('.work-main').removeClass('on');
          $('.work-head').removeClass('on');

        } else if(windowScrollTop > 1){
          $('.work-main').addClass('on');
          $('.work-head').addClass('on');
        }
    }
}

function scrollNav(){
    var windowScrollTop = $(window).scrollTop();
    var $barProgress = $('#progress');
    if ( windowScrollTop > 0) {
        var scrollPercent = 100 * windowScrollTop / ($(document).height() - $(window).height());
        $barProgress.css('display','block');
        $barProgress.height(parseInt(scrollPercent, 10) + "%");
    }
}

function svgMotionEvt(){

    // SVG scroll motion
        if($('.test').length > 0){
            var windowScrollTop = $(window).scrollTop();
            var windowScrollBtn = $(window).scrollTop() + $(window).height();
            // var startOffset = $('.start-offset').offset().top;
            // $('.svg-test').css({
            //     position: 'fixed',
            //     top:startOffset
            // });
            var svgWidth = $('.column.profile').width();
            $('.svg-test').width(svgWidth);
            $(window).on('scroll', function() {
                var svgHeight = $( window ).height() - 500;
                var endOffset = $('.end-offset').offset().top;

                var designActive = $('.design-active').offset().top;
                var frontActive = $('.front-active').offset().top;
                var teamActive = $('.team-active').offset().top;

                if (windowScrollTop > svgHeight) {

                }

                if (windowScrollBtn >= endOffset - 300){
                    $('.svg-test').css({
                        position: 'absolute',
                        top:endOffset - 1300,
                        right:0
                    });
                } else if(windowScrollTop == windowScrollTop){
                    $('.svg-test').css({
                        position: 'fixed',
                        top: 'auto',
                        right:14 +'%'
                    });
                }


                // SVG animation event point
                if(windowScrollBtn >= designActive){
                    $('.svg-test').addClass('active-design');
                } else if(windowScrollBtn < designActive){
                    $('.svg-test').removeClass('active-design');
                }

                if(windowScrollBtn >= frontActive){
                    $('.svg-test').addClass('active-develop');
                } else if(windowScrollBtn < frontActive){
                    $('.svg-test').removeClass('active-develop');
                }

                if(windowScrollBtn >= teamActive){
                    $('.svg-test').addClass('active-communication');
                } else if(windowScrollBtn < teamActive){
                    $('.svg-test').removeClass('active-communication');
                }


            });
        }
}


function printClock() {

    var clock = document.getElementById("clock");            // 출력할 장소 선택
    var currentDate = new Date();                                     // 현재시간
    var currentDateYear = currentDate.getFullYear();
    var currentDateDay = currentDate.getDate();
    var calendar = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() // 현재 날짜
    var amPm = 'AM'; // 초기값 AM
    var currentHours = addZeros(currentDate.getHours(),2);
    var currentMinute = addZeros(currentDate.getMinutes() ,2);
    var currentSeconds =  addZeros(currentDate.getSeconds(),2);


    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthNames = monthNames[nowMonth];
    var weekNames = new Array("Sun", "Mon", "Tue", "Wed" ,"Thu", "Fri", "Sat");

    if(currentHours >= 12){ // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
    	amPm = 'PM';
    	currentHours = addZeros(currentHours - 12,2);
    }

    if(currentSeconds >= 50){// 50초 이상일 때 색을 변환해 준다.
       currentSeconds = '<span style="color:#ff3d7f;">'+currentSeconds+'</span>'
    }

      $('.main-date').html('Jul. 15, 1992 — ' + monthNames + '. ' + currentDateDay + ', ' + currentDateYear + '&nbsp;&nbsp;&nbsp;&nbsp;<br>' + currentHours+":"+currentMinute+":"+currentSeconds +" <span class='time-guide'>"+ amPm+"</span>");


    setTimeout("printClock()",1000);         // 1초마다 printClock() 함수 호출
}

function addZeros(num, digit) { // 자릿수 맞춰주기
	  var zero = '';
	  num = num.toString();
	  if (num.length < digit) {
	    for (i = 0; i < digit - num.length; i++) {
	      zero += '0';
	    }
	  }
	  return zero + num;
}



function introMessage(){
  var now = new Date();
      nowYear = now.getFullYear();
      nowMonth = now.getMonth() +1;
      monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      monthNames = monthNames[nowMonth];
      weekNames = new Array("Sun", "Mon", "Tue", "Wed" ,"Thu", "Fri", "Sat");
      nowDay = now.getDate();
      nowHour = now.getHours();
      nowMt = now.getMinutes();
      nowSec = now.getSeconds();



  if ( nowHour <= 12  &&  nowHour  >= 6 ) {

  } else if (  nowHour >= 12  &&  nowHour  < 22  ) {

  } else if ( nowHour >= 22  &&  nowHour  <= 24  ) {

  } else {

  }
  // $('.main-date').html('Jul. 15, 1992 — ' + monthNames + '. ' + nowDay + ', ' + nowYear);
}
