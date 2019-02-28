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
