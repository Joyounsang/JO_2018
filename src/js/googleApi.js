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
