$( document ).ready(function() {
  // Creates upcoming and past deadline tables and populates them with deadlines
  var upcomingDeadlinesTable = createTable("Upcoming Deadlines", "upcomingDeadlines");
  var pastDeadlinesTable = createTable("Past Deadlines", "pastDeadlines");

  // Removes past deadlines from deadline data and vice-versa.
  var upcomingDeadlines = removePastDeadlines(deadlines.slice());
  var pastDeadlines = removeUpcomingDeadlines(deadlines.slice());

  // Populates tables with data.
  populateTable(upcomingDeadlinesTable, upcomingDeadlines);
  populateTable(pastDeadlinesTable, pastDeadlines);

  // If any of the tables are empty (no past or upcoming deadlines) - removes them.
  removeUnneededTable(upcomingDeadlinesTable);
  removeUnneededTable(pastDeadlinesTable);

  // Creates calendar (sends true to create a collapse/expand button)
  createCalendar(true);

  // Populates calendar with deadline data.
  populateCalendar(deadlines.slice(), 0, 2);
});
