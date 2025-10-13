// -----------------
// sum.js-functions:
// -----------------

// toggleGreeting()
// genWelcomeDesktop()
// genWelcomeMobile()


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


// --------------------
// 1st-level-functions:
// --------------------


// toggleElements() --> main.js

// appropriateGreeting()
// genHTMLWelcomeDesktop() --> genHTMLElements.js

// appropriateGreeting() --> see above
// genHTMLWelcomeMobile() --> genHTMLElements.js


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