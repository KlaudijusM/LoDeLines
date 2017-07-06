# LoDeLines - Local Deadline Tracker


### [Preview](klaudijusm.github.io/LoDeLines/index.html)


## What is it?

Simple web based interface for keeping track with any of your deadlines, events
or tasks that you have. No other software or installation needed, just download,
customise and enjoy.

### Featuring
- Local enviroment support - no need for a web server.
- Countdown timer - for the next upcoming deadline.
- Tables - that hold the upcoming and past deadlines.
- Groups - to keep your deadlines organised.
- Calendar - for users who want a better feel for the time windows between deadlines.


## How to use it?

1. Download it to desktop/Fork it to your github account.

2. Edit the _config.js_ file and add your deadlines. (More info on adding your
   deadlines in the **How to edit deadlines?** section).

3. (Optional) Edit the _theme.css_ file to customise the colors.

4. Use it locally by opening the _index.html_ file or upload it to a web server
   to access it from anywhere.

5. (Optional) Set it as your home page to always be on time with your next big thing!


## How to edit deadlines?

Unfortunatelly due to some limitations _(See F.A.Q.)_ no user interface for editing
deadlines is provided. Instead all the deadline data is stored inside the _config.js_
file in a two dimensional array.

Deadline data is stored in the following format:
```
["Title","Group","Due Date","Worth"]
```
_Notice: Each aspect of the deadline is surrounded in double quotes ("")_

### Few examples:

1. A simple deadline:
```
["Maths Coursework","Uni","2017-11-22 16:00","60%"],
```
#### Here a deadline was created with the following parameters:
- Title: Maths Coursework
- Group: Uni
- Due Date: 4pm on Wednessday, 22nd of November 2017
- Worth: 60%
Worth in this situation could mean the coursework is worth 60% of the unit or
even 60% of the entire year, worth values never have to add up to anything, they
are solely for the refference to the user (you), they don't have to be percentage values
or some other numeric values, they can be whatever you choose them to be.

2. A deadline without a group:
```
["Decide on a final year project","","2017-08-15 22:00","100%"],
```
#### Here a deadline was created with the following parameters:
- Title: Decide on a final year project
- Group:
- Due Date: 10pm on 15th of August, 2017
- Worth: 100%
Here a group for the deadline was not defined but **notice** the _quotes ("")_ were
still left in. This is needed for the application to be able to correctly parse the data.

3. A deadline without a group or a worth value:
```
["Call the student loans company","","2017-07-30 15:00",""]
```
#### Here a deadline was created with the following parameters:
- Title: Call the student loans company
- Group:
- Due Date: 3pm on 30th of July, 2017
- Worth:
Nor a group or the worth of this deadline is defined, but this will still work
due to the _quotes ("")_ left in.

#### Putting everything together and your _config.js_ file should look like this:

```
var deadlines = [
  ["Maths Coursework","Uni","2017-11-22 16:00","60%"],
  ["Decide on a final year project","","2017-08-15 22:00","100%"],
  ["Call the student loans company","","2017-07-30 15:00",""]
];
```

_Simple!_


## Frequently Asked Questions (F.A.Q.)

### Why is there no user interface to add/edit/remove deadlines?
Due to one of the main goals of this projects for it to be able to be used
locally (without uploading it to a web server) modern day web browsers don't allow
for writing data to local files due to the possibility of a cross site scripting
attack. Another reason for this is that even if it was decided to create a user
interface it would require extensive security for the authentication of users who
would be allowed to manipulate the deadline data. By using the simple method of
storing data in a single file, that is easy enough to edit, this project ensures
that there are no security vulnerabilities.

### How do I add deadlines?
See **How to edit deadlines?** section above.

### Can I change the appearance of this web application?
Yes. To customise the appearance edit the _theme.css_ file and change the _HEX_ color
codes corresponding to the element colors that you wish to change. Advanced
users can further optimise the appearance to their likings by modifying the files
inside the styles folder.
