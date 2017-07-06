$( document ).ready(function() {
  // Creates upcoming and past deadline tables and populates them with deadlines
  var upcomingDeadlinesTable = createTable("Upcoming Deadlines", "upcomingDeadlines");
  var pastDeadlinesTable = createTable("Past Deadlines", "pastDeadlines");

  // Gets url query parameter
  var group = getParameterByName('name');

  // Slices the deadline array to only a correspondent group
  deadlines = getGroupDeadlinesFromArray(deadlines.slice(), group);

  /* From the sliced deadline array creates two arrays - one with past and one
     with upcoming deadlines.*/
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
