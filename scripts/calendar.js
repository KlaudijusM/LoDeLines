// Gets todays date
var today = new Date();

// Gets todays date as the calendar initial date.
var calendarDate = new Date(today.getFullYear(), today.getMonth(), 1);

// Month names, these can be changed to your native language.
var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

// Abbreviations for week names, can be changed but best be kept to 1 character.
var weekDayNames = ["M", "T", "W", "T", "F", "S", "S"];

var calendarData, calendarTitleIndex, calendarTimeIndex, expanded = false;

// Event listener allows to navigate the calendar using arrow keys
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        showPreviousMonth();
    }
    else if(event.keyCode == 39) {
        showNextMonth();
    }
    else if (event.keyCode == 13) {
        hideNotification();
    }
});

/* Creates the calendar.

   If no div is allocated for the calendar, creates it at the top of first body
   element.

   Takes a boolean value wether to create a collapse/expand button or not.
*/
function createCalendar(createExpandButton){

  // Checks if the document has a calendar container.
  var calendarContainer = document.getElementById("calendarContainer");
  if (!calendarContainer) {
    // Creates a calendar container.
    calendarContainer = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(calendarContainer);
    calendarContainer.id = "calendarContainer";
  }

  // Checks if button needs to be created (to expand/collapse the calendar).
  if (createExpandButton){
    var calendarExpandButton = document.createElement("button");
    calendarContainer.appendChild(calendarExpandButton);
    calendarExpandButton.id = "calendarExpandButton";
    calendarExpandButton.innerHTML = "Show Calendar";
    calendarExpandButton.setAttribute("onclick","expandCalendar()");
  }

  // Creates the calendar.
  var calendarBody = document.createElement("div");
  calendarContainer.appendChild(calendarBody);
  calendarBody.id = "calendar";

  if(!createExpandButton) {
    calendarBody.style.display = "block";
  }

  // Creates the calendar notification
  var calendarNotification = document.createElement("div");
  var calendarNotificationText = document.createElement("p");
  var calendarNotificationButton = document.createElement("div");


  // Sets the appropriate id's, onclick funtions and text.
  calendarNotification.id = "calendarNotification";
  calendarNotificationText.id = "calendarNotificationText";
  calendarNotificationButton.id = "calendarNotificationButton";
  calendarNotificationButton.setAttribute("onclick","hideNotification()");
  calendarNotificationButton.innerHTML = "Close";

  // Appends the newly created element to each other.
  document.getElementsByTagName("body")[0].appendChild(calendarNotification);
  calendarNotification.appendChild(calendarNotificationText);
  calendarNotification.appendChild(calendarNotificationButton);

  // Creates the text and calendar navigation elements.
  var calendarHeader = document.createElement("div");
  var calendarPrevArrow = document.createElement("div");
  var calendarText = document.createElement("div");
  var calendarNextArrow = document.createElement("div");
  var calendarMonthText = document.createElement("span");
  var calendarYearText = document.createElement("span");
  var calendarMain = document.createElement("div");
  var calendarWeekDays = document.createElement("ul");
  var calendarDays = document.createElement("ul");

  // Appends the above mentioned elements accordingly.
  calendarBody.appendChild(calendarHeader);
  calendarHeader.appendChild(calendarPrevArrow);
  calendarHeader.appendChild(calendarText);
  calendarHeader.appendChild(calendarNextArrow);
  calendarText.appendChild(calendarMonthText);
  calendarText.appendChild(calendarYearText);
  calendarBody.appendChild(calendarMain);
  calendarMain.appendChild(calendarWeekDays);
  calendarMain.appendChild(calendarDays);

  // Sets the appropriate id's and text.
  calendarHeader.id = "calendarHeader";
  calendarPrevArrow.id = "calendarPrevArrow";
  calendarPrevArrow.innerHTML = "&#10094;";
  calendarText.id = "calendarText";
  calendarNextArrow.id = "calendarNextArrow";
  calendarNextArrow.innerHTML = "&#10095;";
  calendarMonthText.id = "calendarMonthText";
  calendarMonthText.innerHTML = monthNames[calendarDate.getMonth()];
  calendarYearText.id = "calendarYearText";
  calendarYearText.innerHTML = calendarDate.getFullYear();
  calendarMain.id = "calendarMain";
  calendarWeekDays.id = "calendarWeekDays";
  calendarDays.id = "calendarDays";


  // Lists all the days of the week
  for (i = 0; i < weekDayNames.length; i++){
    calendarWeekDays.innerHTML += "<li>" + weekDayNames[i] + "</li>";
  }

  // Sets the onclick functions for the arrows.
  calendarPrevArrow.onclick = function () { showPreviousMonth(); };
  calendarNextArrow.onclick = function () { showNextMonth(); };
}

/* Expands (shows) or Collapses (hides) the calendar.

   Used for expand/collapse button.
*/
function expandCalendar(){
  var calendarBody = document.getElementById("calendar");
  var calendarButton = document.getElementById("calendarExpandButton");
  calendarBody.style.transitionDuration = "1s";
  if (expanded) {
    calendarBody.style.display = "none";
    calendarButton.style.borderBottomLeftRadius = "5px 5px";
    calendarButton.style.borderBottomRightRadius = "5px 5px";
    expanded = false;
    document.getElementById("calendarExpandButton").innerHTML = "Show Calendar";
  }
  else {
    expanded = true;
    calendarBody.style.display = "block";
    calendarButton.style.borderBottomLeftRadius = "0";
    calendarButton.style.borderBottomRightRadius = "0";
    document.getElementById("calendarExpandButton").innerHTML = "Hide Calendar";
  }
}

// Repopulates the calendar with next months data.
function showNextMonth(){
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  populateCalendar(calendarData, calendarTitleIndex, calendarTimeIndex);
}

// Repopulates the calendar with past months data.
function showPreviousMonth(){
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  populateCalendar(calendarData, calendarTitleIndex, calendarTimeIndex);
}

/* Populates the days of the calendar

   Takes an array of events with the title and time indexes.

*/
function populateCalendar(eventArray, eventTitleIndex, eventTimeIndex){
  // Sets defaults for event data.
  if (eventArray){
    calendarData = eventArray;
    calendarTitleIndex = eventTitleIndex;
    calendarTimeIndex = eventTimeIndex;
  }

  // Checks if a calendar exists.
  var calendarContainer = document.getElementById("calendarContainer");
  if (!calendarContainer) {
    createCalendar();
  }

  // Removes all the days of the calendar
  var dayContainer = document.getElementById("calendarDays");
  if (dayContainer){
    while (dayContainer.firstChild) {
        dayContainer.removeChild(dayContainer.firstChild);
    }
  }

  // Gets current date
  var currentDay = today.getDate();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  var calendarMonth = calendarDate.getMonth();
  var calendarYear = calendarDate.getFullYear();

  // Used for calculations to correctly display days.
  var firstDayOfCalendarMonth = new Date(calendarYear, calendarMonth, 1);
  var lastDayOfCalendarMonth = new Date(calendarYear,calendarMonth+1,0);
  var calendarMonthLength = new Date(calendarYear,calendarMonth+1,0).getDate();
  var calendarMonthStarts = firstDayOfCalendarMonth.getDay();
  if (calendarMonthStarts == 0) calendarMonthStarts = 7;
  var calendarMonthEnds = lastDayOfCalendarMonth.getDay();
  if (calendarMonthEnds == 0) calendarMonthEnds = 7;

  // Sets the titles of the calendar (month and year).
  document.getElementById("calendarMonthText").innerHTML = monthNames[calendarMonth];
  document.getElementById("calendarYearText").innerHTML = calendarYear;

  // Sets blank list items for past months days
  for (i = 0; i < calendarMonthStarts - 1; i++){
    var previousMonthDay = document.createElement("li");
    previousMonthDay.innerHTML = "&nbsp;";
    dayContainer.appendChild(previousMonthDay);
  }

  // Prints current month days
  for (i = 1; i <= calendarMonthLength; i++){
    var dayItem = document.createElement('li');
    dayContainer.append(dayItem);
    dayItem.innerHTML = i;
    var asd = i;
    // Adds an ID on todays date.
    if (i == currentDay && calendarMonth == currentMonth && calendarYear == currentYear) {
      dayItem.id = "calendar-today";
    }
    // Checks if an event array exists, if so, marks the day (adds special id).
    if (eventArray){
      for (j = 0; j < eventArray.length ; j++){
        var deadlineDate = new Date(eventArray[j][eventTimeIndex].replace(' ', 'T'));
        var deadlineDay = deadlineDate.getDate();
        var deadlineMonth = deadlineDate.getMonth();
        var deadlineYear = deadlineDate.getFullYear();
        if (deadlineYear == calendarYear && deadlineMonth == calendarMonth && deadlineDay == i) {
          dayItem.classList.add('calendar-deadline-date');
          dayItem.setAttribute('onclick',"calendarShowDeadline('" + eventArray[j][eventTimeIndex] + "');")
        }
      }
    }
  }

  // Adds blank list items for the next months dates (used to nicely format)
  for (i = 0; i < (7 - calendarMonthEnds); i++){
    var dayItem = document.createElement('li');
    dayContainer.append(dayItem);
    dayItem.innerHTML = "&nbsp;";
  }
}

/* Displays a popup notification about all the events on a day.
   Requires the title of the event and the time.
*/
function calendarShowDeadline(eventDate){
  eventDate = new Date(eventDate.replace(' ', 'T'));
  var notification = document.getElementById("calendarNotification");
  var notificationText = document.getElementById("calendarNotificationText");
  notification.style.display = "block";
  notificationText.innerHTML = "";
  for (i = 0; i < calendarData.length; i++){
    var eventTitle = calendarData[i][calendarTitleIndex];
    var dataDate = new Date(calendarData[i][calendarTimeIndex].replace(' ', 'T'));
    if (eventDate.getTime() == dataDate.getTime()){
      notificationText.innerHTML += eventTitle + " at " +
                                    addZero(dataDate.getHours())
                                    + ":" +
                                    addZero(dataDate.getMinutes()) +
                                    "<br>";
    }
  }
}

/*
  Hides the popup notifications.
*/
function hideNotification(){
  var notification = document.getElementById("calendarNotification");
  notification.style.display = "none";
}

/*
  Adds a zero (used with time formatting).
*/
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
