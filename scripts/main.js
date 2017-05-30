$( document ).ready(function() {
  var nextDeadline;
  try {
    nextDeadline = nextDeadlineIndex();
  }
  catch (err){
    showConfigError();
  }
  if (nextDeadline == -1) showNoUpcomingDeadlines();
  else {
    showDeadlineInfo(nextDeadline);
    runCountdown(deadlines[nextDeadline][2]);
  }
});

function nextDeadlineIndex() {
  var index = -1;
  var currentDateTime = moment().format('YYYY-MM-DD HH:mm');
  var upcomingDateTime;

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

function showConfigError(){
  var title = document.getElementById("deadlineTitleInfo");
  title.innerHTML = "Error"
  var errorDescription = document.getElementById("deadlineTitle");
  var errorText = "An error has been encountered with your deadline 'config.js' file."
  errorDescription.innerHTML = errorText;
  var errorInstruction = document.getElementById("deadlineGroup");
  errorInstruction.innerHTML = "Please check your configuration file and try again.";
}

function showNoUpcomingDeadlines() {
  var title = document.getElementById("deadlineTitleInfo");
  title.innerHTML = "Everything is done!";
  var description = document.getElementById("deadlineTitle");
  description.innerHTML = "You have no upcoming deadlines!";
}

function showDeadlineInfo(deadlineIndex){
  var titleText = document.getElementById("deadlineTitleInfo");
  titleText.innerHTML = "Next thing up:";
  var deadlineNameText = document.getElementById("deadlineTitle");
  deadlineNameText.innerHTML = "<span id='deadlineName'>"
                         + deadlines[deadlineIndex][0] + "</span>" + " worth "
                         + "<span id='deadlineWorth'>"
                         + deadlines[deadlineIndex][3] + "</span>";
  var deadlineGroupText = document.getElementById("deadlineGroup");
  deadlineGroupText.innerHTML = "For " + "<a href='./en/group.html?name=" +
                                deadlines[deadlineIndex][1] + "'>" +
                                deadlines[deadlineIndex][1] + "</a>";
  var deadlineCountdown = document.getElementById("deadlineCountdown");
  deadlineCountdown.innerHTML = "Due in " + "<span id='countDown'></span>";
  var deadlineDueDate = document.getElementById("deadlineDueDate");
  deadlineDueDate.innerHTML = "(" +
                              moment(deadlines[deadlineIndex][2]).calendar() +
                              ")";
}

function runCountdown(time) {
  var countDown = document.getElementById("countDown");

  var differenceTime = moment(time).unix() - moment().unix();
  var interval = 1000;

  duration = moment.duration(differenceTime * 1000, 'milliseconds'),

  setInterval(function(){
    duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

    if (duration <= 0) location.reload();

    var d = moment.duration(duration).days(),
        h = moment.duration(duration).hours(),
        m = moment.duration(duration).minutes(),
        s = moment.duration(duration).seconds();

    countDown.innerHTML = "";
    switch (d) {
      case 1:
        countDown.innerHTML = d + " day ";
        break;
      case 0:
        break;
      default:
        countDown.innerHTML = d + " days ";
    }
    switch (h) {
      case 1:
        countDown.innerHTML = countDown.innerHTML + h + " hour ";
        break;
      case 0:
        break;
      default:
        countDown.innerHTML = countDown.innerHTML + h + " hours ";
    }
    switch (m) {
      case 1:
        countDown.innerHTML = countDown.innerHTML + m + " minute ";
        break;
      case 0:
        break;
      default:
        countDown.innerHTML = countDown.innerHTML + m + " minutes ";
    }
    switch (s) {
      case 1:
        countDown.innerHTML = countDown.innerHTML + s + " second";
        break;
      case 0:
        countDown.innerHTML = countDown.innerHTML + s + " seconds";
        break;
      default:
        countDown.innerHTML = countDown.innerHTML + s + " seconds";
    }
  }, interval);
}
