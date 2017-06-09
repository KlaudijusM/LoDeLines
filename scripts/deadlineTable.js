$( document ).ready(function() {
  var upcomingDeadlinesTable = createTable("Upcoming Deadlines", "upcomingDeadlines");
  var pastDeadlinesTable = createTable("Past Deadlines", "pastDeadlines");
  var upcomingDeadlines = removePastDeadlines(deadlines.slice());
  var pastDeadlines = removeUpcomingDeadlines(deadlines.slice());
  populateTable(upcomingDeadlinesTable, upcomingDeadlines);
  populateTable(pastDeadlinesTable, pastDeadlines);
  removeUnneededTable(upcomingDeadlinesTable);
  removeUnneededTable(pastDeadlinesTable);
});
