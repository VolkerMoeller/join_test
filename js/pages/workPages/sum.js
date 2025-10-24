// -----------------
// sum.js-functions:
// -----------------

// 1st
// toggleGreeting()

// 2nd
// genWelcomeDesktop()

// 3rd
// genWelcomeMobile()

// 4th
// updateSumContent()


// 1st
function toggleGreeting() {
    toggleElements('greetingUser', 'greetingGuest');
}


// 2nd
function genWelcomeDesktop() {
    let greeting = appropriateGreeting();
    let userName = loadLocalStorageObject('currentUser');
    document.getElementById('mainCenterWelcome').innerHTML = '';
    document.getElementById('mainCenterWelcome').innerHTML = genHTMLWelcomeDesktop(greeting, userName['name']);
}


// 3rd
function genWelcomeMobile() {
    let greeting = appropriateGreeting();
    let userName = loadLocalStorageObject('currentUser');
    document.getElementById('ovlFrame').innerHTML = '';
    document.getElementById('ovlFrame').innerHTML = genHTMLWelcomeMobile(greeting, userName['name']);
}


// 4th
async function updateSumContent() {
    let tasks = await getTasksFromFirebase();
    let tasksCnts = getTasksgroupsCnts(tasks);
    let urgentTaskDate = await getUrgentTaskDate(tasks);
    let tasksgroups = new Tasksgroups(tasksCnts, urgentTaskDate);
    genSumContent(tasksgroups);
}


// --------------------
// 1st-level-functions:
// --------------------

// .1st
// toggleElements() --> main.js

// .2nd
// appropriateGreeting()
// loadLocalStorageObject() --> main.js
// genHTMLWelcomeDesktop() --> genHTMLElements.js

// .3rd
// appropriateGreeting() --> see above
// loadLocalStorageObject() --> main.js
// genHTMLWelcomeMobile() --> genHTMLElements.js

// .4th
// getTasksFromFirebase() --> general.js
// getTasksgroupsCnts()
// getUrgendTaskDateArr()
// genSumContent()


// .2nd
function appropriateGreeting() {
    let greeting = 'Good morning';
    let now = Date.now();
    let date = new Date(now);
    let hour = date.getHours();
    if (hour <= 11) { greeting = 'Good morning' }
    if (hour > 11 && hour <= 13) { greeting = 'Hello' }
    if (hour > 13 && hour <= 16) { greeting = 'Good afternoon' }
    if (hour > 16 && hour <= 24) { greeting = 'Good evening' }
    return greeting;
}


// .4th
function getTasksgroupsCnts(tasks) {
    done = cntTask(tasks, 'state', 'done');
    feedback = cntTask(tasks, 'state', 'feedback');
    progress = cntTask(tasks, 'state', 'progress');
    toDo = cntTask(tasks, 'state', 'toDo');
    urgent = cntTask(tasks, 'priority', 'urgent');
    return [done, feedback, progress, toDo, urgent];
}


// .4th
async function getUrgentTaskDate(tasks) {
    let urgentDate = '';
    let dates = getUrgentDatesOutOf(tasks);
    urgentDate = getUrgentDateOutOf(dates);
    if (urgentDate != '') urgentDate = buildUrgentDate(urgentDate);
    else urgentDate = 'No Date';
    return urgentDate;
}


// .4th
function genSumContent(tasksgroups) {
    let ids = ['done', 'feedback', 'inBoard', 'progress', 'toDo', 'urgent', 'urgentDate'];
    ids.forEach((id) => {
        document.getElementById(id).innerHTML = '';
        document.getElementById(id).innerHTML = tasksgroups[id];
    });
}





// --------------------
// 2nd-level-functions:
// --------------------

// .4th
// ..
// cntTask()

// .4th
// ..
// getTasksFromFirebase() --> main.js
// getUrgentDatesOutOf()
// getUrgentDateOutOf()
// buildUrgentDateArr()



// .4th
// ..
function cntTask(tasks, attr, state) {
    let counter = 0;
    tasks = Object.values(tasks);
    tasks.forEach(element => {
        if (element[attr] == state) {
            ++counter;
        }
    });
    return counter;
}


// .4th
// ..
function getUrgentDatesOutOf(tasks) {
    let urgentDates = [];
    tasks = Object.values(tasks);
    tasks.forEach(task => {
        if (task['priority'] == 'urgent') {
            let date = task['dueDate'].split('/');
            date = Date.parse(new Date(date[2], String((parseInt(date[1]) - 1)), date[0]));
            urgentDates.push(date);
        }
    });
    return urgentDates;
}


// .4th
// ..
function getUrgentDateOutOf(dates) {
    let urgentDate;
    let sortedDates = dates.sort();
    urgentDate = (sortedDates[0]);
    urgentDate = new Date(urgentDate);
    return urgentDate;
}


// .4th
// ..
function buildUrgentDate(urgentDate) {
    let year = String(urgentDate.getFullYear());
    const options = { month: 'long' };
    let month = new Intl.DateTimeFormat("de-GE", options).format(urgentDate);
    let day = String(urgentDate.getDate());
    urgentDate = month + ' ' + day + ', ' + year;
    return urgentDate;
}