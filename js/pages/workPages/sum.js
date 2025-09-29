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
    document.getElementById('mainCenterWelcome').innerHTML = '';
    document.getElementById('mainCenterWelcome').innerHTML = genHTMLWelcomeDesktop(greeting);
}


function genWelcomeMobile() {
    let greeting = appropriateGreeting();
    document.getElementById('ovlFrame').innerHTML = '';
    document.getElementById('ovlFrame').innerHTML = genHTMLWelcomeMobile(greeting);
}

function appropriateGreeting() {
    let greeting = 'Guten Morgen';
    return greeting;
}

// --------------------
// 1st-level-functions:
// --------------------


// toggleElements() --> main.js