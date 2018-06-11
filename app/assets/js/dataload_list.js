$(document).ready(function(){

    globalWorkLstData(); // main work infomation ajax :: data

});




/* function logic :: 2017 :::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::*/


var WORK_URL = '../assets/json/global.json'; // global variable :: html과 같은 도메인의 위치

function globalWorkLstData(){ // main work infomation ajax :: data
  $.ajax({
      type: "GET",
      url: WORK_URL,
      timeout: 2000,
      beforeSend: function(data) {

      },
      complete: function(data) {

      },
      success: function(data) {
        fileSeq = -1
        for( var i = 0; i < data.length; i++){
            var workList = data[i]; // 배열 더미데이터 obj의 키값을 불러와 변수화합니다.

            var workSeq = workList.seq;
            var workTit = workList.project;
            var workDate = workList.date;
            var workInfo = workList.responsibility;
            var workLocalUrl = workList.url;
            var workField = workList.field;
            var workImgUrl = workList.images;
            var workDateSlash = workList.dateslash;
            var coverRepace = workDateSlash.replace(/\//g,'');
            fileSeq++;

            var str =''; // DOM요소의 동적으로 생성될 공간을 확보합니다.
                str += '<li data-date="' + workDateSlash + '"' + 'data-info="' + workInfo + '"' + 'data-seq="' + workSeq + '" >';
                str += '<a href="#">';
                str += '<img src="../assets/images/works/' + coverRepace + '.jpg" alt="' + workTit + '" >';
                str += '<h4>' + workTit + '</h4>';
                str += '</a></li>';





        function firstSetting(){

            $('.workList').append(str);


            var workArchiveCount = $('.workList li').length;
            $('.workArchiveCount').html(workArchiveCount);



            $('.workspace .workList li').each(function(i,e){
                if(i>4){
                    $(this).remove();
                }
            });

            var firstItem = $('.workList li').eq(0);
            var firstSeq = firstItem.attr('data-seq');
            var firstInfo = firstItem.attr('data-info');
            var firstDate = firstItem.attr('data-date');
            var firstDateReplace = firstDate.replace(/\//g,'');

            $('.workSeq').text(firstSeq);
            $('.workInfo').text(firstInfo) + '<br>';
            $('.workDate').text(firstDate);
            $('.workCover').css({
                "background":"url(../assets/images/works/" + firstDateReplace + ".jpg)",
                'background-repeat' : 'no-repeat',
                'background-position':'center center'
            });

            $('.workList li').eq(0).find('a').addClass('on');

        } firstSetting();



        function clickSetting(){
            $('.workList a').on('click', function(e){
                e.preventDefault();
                var coverSeq = $(this).parent().attr('data-seq');
                var coverInfo = $(this).parent().attr('data-info');
                var coverDate = $(this).parent().attr('data-date');
                    coverRepace = coverDate.replace(/\//g,'');

                $(this).addClass('on').parent().siblings().children().removeClass('on');
                $('.workSeq').text(coverSeq);
                $('.workInfo').text(coverInfo) + '<br>';
                $('.workDate').text(coverDate);
                $('.workCover').css({
                    "background":"url(../assets/images/works/" + coverRepace + ".jpg)",
                    'background-repeat' : 'no-repeat',
                    'background-position':'center center'
                });

            });
        } clickSetting();








        }
      },
      error : function(xhr, status, error) {
            alert("에러발생");
      }
  });
}
