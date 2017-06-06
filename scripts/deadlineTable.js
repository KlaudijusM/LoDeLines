$( document ).ready(function() {
  var upcomingDeadlinesTable = createTable("Upcoming Deadlines");
  var pastDeadlinesTable = createTable("Past Deadlines");
  var upcomingDeadlines = removePastDeadlines(deadlines.slice());
  var pastDeadlines = removeUpcomingDeadlines(deadlines.slice());
  populateTable(upcomingDeadlinesTable, upcomingDeadlines);
  populateTable(pastDeadlinesTable, pastDeadlines);
});

function populateTable(table, deadlineArray){
  var rowStyling = {
    0: "left",
    1: "center",
    2: "center",
    3: "left",
    4: "right"
  };
  for (var i = 0; i < deadlineArray.length; i++) {
    var rowData = {
      0: deadlineArray[i][0],
      1: "<a href='./group.html?name=" +
                      deadlineArray[i][1] + "'>" +
                      deadlineArray[i][1] + "</a>",
      2: deadlineArray[i][3],
      3: deadlineArray[i][2],
      4: timeLeftString(deadlineArray[i][2])
    };
    var tr = document.createElement('tr');
    table.getElementsByTagName("tbody")[0].appendChild(tr);

    for (var j = 0; j < 5; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = rowData[j];
      td.style.textAlign = rowStyling[j];
    }
   }
}

function destroyTable(){
  try {
    document.getElementById("deadlineTable").innerHTML = "";
  }
  catch (err){
    alert("Table doesn't exist!");
  }
}

function createTable(tblName){
  var body = document.getElementsByTagName('body')[0];
  var tableTitle = document.createElement('h1');
  tableTitle.className = "tableTitle";
  tableTitle.innerHTML = tblName;
  var tbl = document.createElement('table');
  tbl.id = "deadlineTable";
  var tbdy = document.createElement('tbody');
  printTableHeading(tbdy);
  tbl.appendChild(tbdy);
  body.appendChild(tableTitle);
  body.appendChild(tbl);
  return tbl;
}

function printTableHeading(tableBody){
  var tr = document.createElement('tr');
  tableBody.appendChild(tr);
  var titles = {
    0: "Title",
    1: "Group",
    2: "Worth",
    3: "Due",
    4: "Time Left"
  };
  for (var i = 0; i < 5; i++){
    var th = document.createElement('th');
    th.innerHTML= titles[i];
    tr.appendChild(th);
  }
}

function timeLeftString(dueDate){
  var tLeft = moment(dueDate).unix() - moment().unix();
  var negative = (tLeft < 0) ? true : false;
  tLeft = (negative) ? (tLeft * -1) : tLeft;
  var stringTimeLeft, hrsLeft = tLeft / 3600;

  if (hrsLeft > 24) stringTimeLeft = Math.floor(hrsLeft / 24) + " days";
  else if (hrsLeft > 1) stringTimeLeft = Math.floor(hrsLeft) + " hours";
  else stringTimeLeft = Math.floor(hrsLeft * 60) + " minutes";

  if (negative) stringTimeLeft = stringTimeLeft + " ago";
  return stringTimeLeft;
}

function removePastDeadlines(deadlineArray){
  for (var i = 0; i < deadlineArray.length; i++){
    if (moment(deadlineArray[i][2]).unix() - moment().unix() <= 0) {
      deadlineArray.splice(i, 1);
    }
  }
  return deadlineArray;
}

function removeUpcomingDeadlines(deadlineArray){
  for (var i = 0; i < deadlineArray.length; i++){
    if (moment(deadlineArray[i][2]).unix() - moment().unix() > 0) {
      deadlineArray.splice(i, 1);
    }
  }
  return deadlineArray;
}
