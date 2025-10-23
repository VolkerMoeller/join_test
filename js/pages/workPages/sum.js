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


function toggleGreeting() {
    toggleElements('greetingUser', 'greetingGuest');
}


function genWelcomeDesktop() {
    let greeting = appropriateGreeting();
    let userName = loadLocalStorageObject('currentUser');
    document.getElementById('mainCenterWelcome').innerHTML = '';
    document.getElementById('mainCenterWelcome').innerHTML = genHTMLWelcomeDesktop(greeting, userName['name']);
}


function genWelcomeMobile() {
    let greeting = appropriateGreeting();
    let userName = loadLocalStorageObject('currentUser');
    document.getElementById('ovlFrame').innerHTML = '';
    document.getElementById('ovlFrame').innerHTML = genHTMLWelcomeMobile(greeting, userName['name']);
}


async function updateSumContent() {
    let tasks = await getTasksFromFirebase();
    let tasksCnts = getTasksgroupsCnts(tasks);
    let tasksgroups = new Tasksgroups(tasksCnts);
    console.log(tasksgroups);
}


// --------------------
// 1st-level-functions:
// --------------------

// ..1st
// toggleElements() --> main.js

// ..2nd
// appropriateGreeting()
// loadLocalStorageObject() --> main.js
// genHTMLWelcomeDesktop() --> genHTMLElements.js

// ..3rd
// appropriateGreeting() --> see above
// loadLocalStorageObject() --> main.js
// genHTMLWelcomeMobile() --> genHTMLElements.js

// ..4th
// getTasksFromFirebase() --> general.js
// getTasksgroupsCnts()


// --------------------
// 3rd-level-functions:
// --------------------


// ...2nd
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


// ...4th
function getTasksgroupsCnts(tasks) {
    done = cntTask(tasks, 'done');
    feedback = cntTask(tasks, 'feedback');
    progress = cntTask(tasks, 'progress');
    toDo = cntTask(tasks, 'toDo');
    return [done, feedback, progress, toDo];
}





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