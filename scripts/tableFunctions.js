// Populates a specific table with dealine array data
function populateTable(table, deadlineArray){
  // Style sizing for each column.
  var dataSizing = {
    0: "32%",
    1: "14%",
    2: "14%",
    3: "20%",
    4: "15%"
  };
  // Loops through array and populates the table with data
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

// Destroys a table. Takes the table to be destroyed as a parameter.
function destroyTable(table){
  try {
    table.innerHTML = "";
  }
  catch (err){
    alert("Table doesn't exist!");
  }
}

// Creates a table by adding elements and assigning appropriate classes to them.
// Takes a table name and table id as a parameters.
function createTable(tblName, tblID){
  var body = document.getElementsByTagName('body')[0];
  var tableTitle = document.createElement('h1');
  tableTitle.className = "tableTitle";
  tableTitle.id = tblID + "-tableTitle";
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

// Prints the table headings for appropriate table. Takes a table body as a parameter.
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

// Returns how much time is left until due date.
function timeLeftString(dueDate){
  var tLeft = moment(dueDate).unix() - moment().unix();
  var negative = (tLeft < 0) ? true : false;
  tLeft = (negative) ? (tLeft * -1) : tLeft;
  var stringTimeLeft, hrsLeft = tLeft / 3600;

  if (hrsLeft > 24) stringTimeLeft = Math.floor(hrsLeft / 24) + " days";
  else if (hrsLeft > 1) stringTimeLeft = Math.floor(hrsLeft) + " hours";
  else stringTimeLeft = Math.floor(hrsLeft * 60) + " minutes";

  // Adds "ago" if time is in the past.
  if (negative) stringTimeLeft = stringTimeLeft + " ago";
  return stringTimeLeft;
}

// Removes deadlines from array that have their due date in the past.
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

// Removes deadlines from array that have their due date in the future.
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

// Sorts table by column. Requires the column to be sorted by and the table to sort.
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

// Used to natural sort numbers.
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

// Returns an array of deadlines that have a specific group
// Asks for the deadline array and the group to splice the array by.
function getGroupDeadlinesFromArray(array, group){
  var length = array.length;
  while (length--){
    if (array[length][1] != group) {
      array.splice(length, 1);
    }
  }
  return array;
}

// Gets the parameter passed in url query. Requires the parameters name and url.
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Checks if a table has atleast one element and if not - removes it.
function removeUnneededTable(table){
  var rows = table.rows.length;
  var tableID = table.id;
  if (rows < 2){
    destroyTable(table);
    document.getElementById(tableID + "-tableTitle").innerHTML = "";
  }
}
