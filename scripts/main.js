$( document ).ready(function() {
  /* Tries to get the upcoming deadline, throws an error if there's something
     wrong with the data */
  var nextDeadline;
  try {
    nextDeadline = nextDeadlineIndex();
  }
  catch (err){
    showConfigError();
  }

  // If no upcoming deadlines
  if (nextDeadline == -1) showNoUpcomingDeadlines();
  else {
    // Displays deadline info and runs a countdown.
    showDeadlineInfo(nextDeadline);
    runCountdown(deadlines[nextDeadline][2]);
  }
});

// Returns the next (first upcoming) deadline's index in the deadline array
function nextDeadlineIndex() {
  // First sets index as -1 in case there's no upcoming deadlines.
  var index = -1;
  var currentDateTime = moment().format('YYYY-MM-DD HH:mm');
  var upcomingDateTime;

  /* Loops through the array of deadlines checking the dates of the deadlines
     to find the nearest upcoming one. */
  for (var i = 0; i < deadlines.length; i++){
    var deadlineDue = moment(deadlines[i][2]).format('YYYY-MM-DD HH:mm');

    if (moment(currentDateTime).isBefore(deadlineDue)) {
      if (index == -1){
        index = i;
        upcomingDateTime = moment(deadlineDue);
      }
      else if (moment(deadlines[i][2]).isBefore(upcomingDateTime)) {
        index = i;
        upcomingDateTime = moment(deadlineDue);
      }
    }
  }
  return index;
}

// Prints an error on screen if something is wrong with the deadline array.
function showConfigError(){
  var title = document.getElementById("deadlineTitleInfo");
  title.innerHTML = "Error"
  var errorDescription = document.getElementById("deadlineTitle");
  var errorText = "An error has been encountered with your deadline 'config.js' file."
  errorDescription.innerHTML = errorText;
  var errorInstruction = document.getElementById("deadlineGroup");
  errorInstruction.innerHTML = "Please check your configuration file and try again.";
}

// Prints that there are no upcoming deadlines.
function showNoUpcomingDeadlines() {
  var title = document.getElementById("deadlineTitleInfo");
  title.innerHTML = "Everything is done!";
  var description = document.getElementById("deadlineTitle");
  description.innerHTML = "You have no upcoming deadlines!";
}

// Prints deadline info on screen
function showDeadlineInfo(deadlineIndex){
  var titleText = document.getElementById("deadlineTitleInfo");
  titleText.innerHTML = "Next thing up:";
  var deadlineNameText = document.getElementById("deadlineTitle");
  deadlineNameText.innerHTML = "<span id='deadlineName'>"
                         + deadlines[deadlineIndex][0] + "</span>";
  if (deadlines[deadlineIndex][3]) {
    deadlineNameText.innerHTML += " worth "
                           + "<span id='deadlineWorth'>"
                           + deadlines[deadlineIndex][3] + "</span>";
  }
  var deadlineGroupText = document.getElementById("deadlineGroup");
  deadlineGroupText.innerHTML = "For " + "<a href='./en/group.html?name=" +
                                deadlines[deadlineIndex][1] + "'>" +
                                deadlines[deadlineIndex][1] + "</a>";
  var deadlineDueDate = document.getElementById("deadlineDueDate");
  deadlineDueDate.innerHTML = deadlines[deadlineIndex][2];
}

// Starts a countdown till the next deadline.
function runCountdown(time) {
  var countDown = document.getElementById("countDown");
  printTimeLeft(time, countDown);

  setInterval(function() {
    printTimeLeft(time, countDown);
  }
  , 1000);
}

// Gets how much time is left until the next deadline
function printTimeLeft(time, placeHolder){
  var difference = moment(time).unix() - moment().unix();
  var secondsLeft = moment.duration(difference, 'seconds');
  // Reloads page if deadline due date is reached (to show next upcoming deadline)
  if (secondsLeft < 0) location.reload();

  var days = parseInt(secondsLeft.asDays());
  var hours = secondsLeft.hours();
  var minutes = secondsLeft.minutes();
  var seconds = secondsLeft.seconds();

  var titles = {
    0: "Days",
    1: "Hours",
    2: "Minutes",
    3: "Seconds",
  };
  var data = {
    0: days,
    1: hours,
    2: minutes,
    3: seconds,
  };

  // Appends the countdown container.
  placeHolder.innerHTML = "";
  for (i = 0; i < 4; i++){
    var number = data[i].toString();
    var numberLength = number.length;
    var parentContainer = document.createElement("div");
    parentContainer.className = "digits-and-titles";
    placeHolder.appendChild(parentContainer);

    var digitContainer = document.createElement("div");
    digitContainer.className = "digit-container";
    parentContainer.appendChild(digitContainer);

    if (numberLength == 1) {
      var digit = document.createElement("div");
      digit.className = "digit";
      digitContainer.appendChild(digit);
      digit.innerHTML = "0";
    }
    for (j = 0; j < numberLength; j++){
      var digit = document.createElement("div");
      digit.className = "digit";
      digitContainer.appendChild(digit);
      digit.innerHTML = number[j];
    }
    digitText = document.createElement("div");
    digitText.className = "digit-title";
    parentContainer.appendChild(digitText);
    digitText.innerHTML = titles[i];
  }
}
