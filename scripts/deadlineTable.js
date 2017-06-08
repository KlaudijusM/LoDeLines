$( document ).ready(function() {
  var upcomingDeadlinesTable = createTable("Upcoming Deadlines", "upcomingDeadlines");
  var pastDeadlinesTable = createTable("Past Deadlines", "pastDeadlines");
  var upcomingDeadlines = removePastDeadlines(deadlines.slice());
  var pastDeadlines = removeUpcomingDeadlines(deadlines.slice());
  populateTable(upcomingDeadlinesTable, upcomingDeadlines);
  populateTable(pastDeadlinesTable, pastDeadlines);
});

function populateTable(table, deadlineArray){
  var dataSizing = {
    0: "32%",
    1: "14%",
    2: "14%",
    3: "20%",
    4: "15%"
  };
  for (i = 0; i < deadlineArray.length; i++) {
    var rowData = {
      0: deadlineArray[i][0],
      1: "<a class='deadlineTableGroup' href='./group.html?name=" +
                      deadlineArray[i][1] + "'>" +
                      deadlineArray[i][1] + "</a>",
      2: deadlineArray[i][3],
      3: deadlineArray[i][2],
      4: timeLeftString(deadlineArray[i][2])
    };
    var tr = document.createElement('tr');
    table.getElementsByTagName("tbody")[0].appendChild(tr);

    for (j = 0; j < 5; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = rowData[j];
      td.style.width = dataSizing[j];
      td.style.textAlign = "left";
    }
   }
}

function destroyTable(table){
  try {
    table.innerHTML = "";
  }
  catch (err){
    alert("Table doesn't exist!");
  }
}

function createTable(tblName, tblID){
  var body = document.getElementsByTagName('body')[0];
  var tableTitle = document.createElement('h1');
  tableTitle.className = "tableTitle";
  tableTitle.innerHTML = tblName;
  var tbl = document.createElement('table');
  tbl.className = "deadlineTable";
  tbl.id = tblID;
  var tbdy = document.createElement('tbody');
  tbl.appendChild(tbdy);
  body.appendChild(tableTitle);
  body.appendChild(tbl);
  printTableHeading(tbdy);
  return tbl;
}

function printTableHeading(tableBody){
  var tr = document.createElement('tr');
  tableBody.appendChild(tr);
  var titles = {
    0: "Title",
    1: "Group",
    2: "Worth",
    3: "Due Date",
    4: "Time Left"
  };
  for (i = 0; i < 5; i++){
    var th = document.createElement('th');
    th.innerHTML= titles[i];
    tr.appendChild(th);
    th.setAttribute('onclick', "sortTable(" + i + ",'" + tableBody.parentElement.id + "');");
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
  var length = deadlineArray.length;
  while (length--){
    var timeLeft = moment(deadlineArray[length][2]).unix() - moment().unix();
    if (timeLeft <= 0) {
      deadlineArray.splice(length, 1);
    }
  }
  return deadlineArray;
}

function removeUpcomingDeadlines(deadlineArray){
  var length = deadlineArray.length;
  while (length--){
    var timeLeft = moment(deadlineArray[length][2]).unix() - moment().unix();
    if (timeLeft > 0) {
      deadlineArray.splice(length, 1);
    }
  }
  return deadlineArray;
}

function sortTable(field, tableID) {
  var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  var table = document.getElementById(tableID);
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("tr");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[field];
      y = rows[i + 1].getElementsByTagName("td")[field];
      if (dir == "asc") {
          if (alphanum(x.innerHTML,y.innerHTML) > 0) {
            shouldSwitch= true;
            break;
          }
      } else if (dir == "desc") {
          if (alphanum(x.innerHTML,y.innerHTML) < 0) {
            shouldSwitch= true;
            break;
          }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function alphanum(a, b) {
  function chunkify(t) {
    var tz = [], x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a);
  var bb = chunkify(b);

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
  return aa.length - bb.length;
}
