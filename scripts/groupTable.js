$( document ).ready(function() {
  var upcomingDeadlinesTable = createTable("Upcoming Deadlines", "upcomingDeadlines");
  var pastDeadlinesTable = createTable("Past Deadlines", "pastDeadlines");
  var group = getParameterByName('name');
  deadlines = getGroupDeadlinesFromArray(deadlines.slice(), group);
  var upcomingDeadlines = removePastDeadlines(deadlines.slice());
  var pastDeadlines = removeUpcomingDeadlines(deadlines.slice());
  populateTable(upcomingDeadlinesTable, upcomingDeadlines);
  populateTable(pastDeadlinesTable, pastDeadlines);
  removeUnneededTable(upcomingDeadlinesTable);
  removeUnneededTable(pastDeadlinesTable);
  createCalendar(true);
  populateCalendar(deadlines.slice(), 0, 2);
});
