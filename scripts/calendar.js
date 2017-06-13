var today = new Date();
var calendarDate = new Date(today.getFullYear(), today.getMonth(), 1);
var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
var weekDayNames = ["M", "T", "W", "T", "F", "S", "S"];
var calendarData;
var calendarTitleIndex;
var calendarTimeIndex;

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


function createCalendar(){
  var calendarContainer = document.getElementById("calendar");
  var calendarNotification = document.createElement("div");
  var calendarNotificationText = document.createElement("p");
  var calendarNotificationButton = document.createElement("div");
  calendarNotification.id = "calendarNotification";
  calendarNotificationText.id = "calendarNotificationText";
  calendarNotificationButton.id = "calendarNotificationButton";
  calendarNotificationButton.setAttribute("onclick","hideNotification()");
  calendarNotificationButton.innerHTML = "Close";
  document.getElementsByTagName("body")[0].appendChild(calendarNotification);
  calendarNotification.appendChild(calendarNotificationText);
  calendarNotification.appendChild(calendarNotificationButton);
  if (!calendarContainer) {
    calendarContainer = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(calendarContainer);
    calendarContainer.id = "calendar";
  }

  var calendarHeader = document.createElement("div");
  calendarHeader.id = "calendarHeader";
  calendarContainer.appendChild(calendarHeader);
  var calendarPrevArrow = document.createElement("div");
  calendarPrevArrow.id = "calendarPrevArrow";
  calendarPrevArrow.innerHTML = "&#10094;";
  calendarHeader.appendChild(calendarPrevArrow);
  var calendarText = document.createElement("div");
  calendarText.id = "calendarText";
  calendarHeader.appendChild(calendarText);
  var calendarNextArrow = document.createElement("div");
  calendarNextArrow.id = "calendarNextArrow";
  calendarNextArrow.innerHTML = "&#10095;";
  calendarHeader.appendChild(calendarNextArrow);
  var calendarMonthText = document.createElement("span");
  calendarMonthText.id = "calendarMonthText";
  calendarText.appendChild(calendarMonthText);
  var calendarYearText = document.createElement("span");
  calendarYearText.id = "calendarYearText";
  calendarText.appendChild(calendarYearText);
  var calendarMain = document.createElement("div");
  calendarMain.id = "calendarMain";
  calendarContainer.appendChild(calendarMain);
  var calendarWeekDays = document.createElement("ul");
  calendarWeekDays.id = "calendarWeekDays";
  calendarMain.appendChild(calendarWeekDays);
  var calendarDays = document.createElement("ul");
  calendarDays.id = "calendarDays";
  calendarMain.appendChild(calendarDays);

  for (i = 0; i < weekDayNames.length; i++){
    calendarWeekDays.innerHTML += "<li>" + weekDayNames[i] + "</li>";
  }

  calendarMonthText.innerHTML = monthNames[calendarDate.getMonth()];
  calendarYearText.innerHTML = calendarDate.getFullYear();
  calendarPrevArrow.onclick = function () { showPreviousMonth(); };
  calendarNextArrow.onclick = function () { showNextMonth(); };
}

function showNextMonth(){
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  populateCalendar(calendarData, calendarTitleIndex, calendarTimeIndex);
}

function showPreviousMonth(){
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  populateCalendar(calendarData, calendarTitleIndex, calendarTimeIndex);
}

function populateCalendar(eventArray, eventTitleIndex, eventTimeIndex){
  calendarData = eventArray;
  calendarTitleIndex = eventTitleIndex;
  calendarTimeIndex = eventTimeIndex;
  var calendarContainer = document.getElementById("calendar");
  if (!calendarContainer) {
    createCalendar();
  }
  var dayContainer = document.getElementById("calendarDays");
  if (dayContainer){
    while (dayContainer.firstChild) {
        dayContainer.removeChild(dayContainer.firstChild);
    }
  }

  var currentDay = today.getDate();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  var calendarMonth = calendarDate.getMonth();
  var calendarYear = calendarDate.getFullYear();

  var firstDayOfCalendarMonth = new Date(calendarYear, calendarMonth, 1);
  var lastDayOfCalendarMonth = new Date(calendarYear,calendarMonth+1,0);
  var calendarMonthLength = new Date(calendarYear,calendarMonth+1,0).getDate();
  var calendarMonthStarts = firstDayOfCalendarMonth.getDay();
  if (calendarMonthStarts == 0) calendarMonthStarts = 7;
  var calendarMonthEnds = lastDayOfCalendarMonth.getDay();
  if (calendarMonthEnds == 0) calendarMonthEnds = 7;

  document.getElementById("calendarMonthText").innerHTML = monthNames[calendarMonth];
  document.getElementById("calendarYearText").innerHTML = calendarYear;

  for (i = 0; i < calendarMonthStarts - 1; i++){
    var previousMonthDay = document.createElement("li");
    previousMonthDay.innerHTML = "&nbsp;";
    dayContainer.appendChild(previousMonthDay);
  }
  for (i = 1; i <= calendarMonthLength; i++){
    var dayItem = document.createElement('li');
    dayContainer.append(dayItem);
    dayItem.innerHTML = i;
    if (i == currentDay && calendarMonth == currentMonth && calendarYear == currentYear) {
      dayItem.id = "calendar-today";
    }
    if (eventArray){
      for (j = 0; j < eventArray.length ; j++){
        var deadlineDate = new Date(eventArray[j][eventTimeIndex]);
        var deadlineDay = deadlineDate.getDate();
        var deadlineMonth = deadlineDate.getMonth();
        var deadlineYear = deadlineDate.getFullYear();
        if (deadlineYear == calendarYear && deadlineMonth == calendarMonth && deadlineDay == i) {
          dayItem.classList.add('calendar-deadline-date');
          dayItem.setAttribute("onclick","calendarShowDeadline('"+eventArray[j][eventTitleIndex]+"','" +eventArray[j][eventTimeIndex] +"')");
        }
      }
    }
  }
  for (i = 0; i < (7 - calendarMonthEnds); i++){
    var dayItem = document.createElement('li');
    dayContainer.append(dayItem);
    dayItem.innerHTML = "&nbsp;";
  }
}

function calendarShowDeadline(title, time){
  var notification = document.getElementById("calendarNotification");
  var notificationText = document.getElementById("calendarNotificationText");
  notification.style.display = "block";
  notificationText.innerHTML = title + " at " + addZero(new Date(time).getHours()) + ":" + addZero(new Date(time).getMinutes());
}

function hideNotification(){
  var notification = document.getElementById("calendarNotification");
  notification.style.display = "none";
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
