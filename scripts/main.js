$( document ).ready(function() {
  var nextDeadline;
  try {
    nextDeadline = nexDeadLineIndex();
  }
  catch (err){
    showConfigError();
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

}
