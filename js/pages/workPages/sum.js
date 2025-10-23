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
    let urgentTaskDate = getUrgentTaskDate(tasks);
    let tasksgroups = new Tasksgroups(tasksCnts, urgentTaskDate);
    console.log(tasksgroups);
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
// getUrgendTaskDate()


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
    done = cntTask(tasks, 'done');
    feedback = cntTask(tasks, 'feedback');
    progress = cntTask(tasks, 'progress');
    toDo = cntTask(tasks, 'toDo');
    return [done, feedback, progress, toDo];
}


async function getUrgentTaskDate() {
    let urgentDate = '';
    let dates = [];
    let tasks = await getTasksFromFirebase();
    tasks = Object.values(tasks);
    tasks.forEach(task => {
        let date = task['dueDate'];
        date = date.split('/');
        date[1] = parseInt(date[1]);
        date[1] = date[1] - 1;
        date[1] = String(date[1]);
        date = new Date(date[2], date[1], date[0]);
        dates.push(
            date
        )
    });
    dates.sort();
    console.log(dates[0]);
    return urgentDate;
}


// --------------------
// 3rd-level-functions:
// --------------------

// .4th
// cntTask()


function cntTask(tasks, state) {
    let counter = 0;
    tasks = Object.values(tasks);
    tasks.forEach(element => {
        if (element['state'] == state) {
            ++counter;
        }
    });
    return counter;
}