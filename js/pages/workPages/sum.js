// -----------------
// sum.js-functions:
// -----------------

// toggleGreeting()
// showWelcome()


function toggleGreeting() {
    toggleElements('greetingUser', 'greetingGuest');
}


function showWelcome() {
    initOvlFrameForAnimWelcome();
    animWelcome();
}


// --------------------
// 1st-level-functions:
// --------------------


// toggleElements() --> main.js
// initOvlFrameForAnimWelcome()



function initOvlFrameForAnimWelcome() {
    let ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.remove('ovl-show-anim-bg');
    ovlFrame.classList.add('ovl-show-nav');
}

function animWelcome() {
    console.log('animWelcome()');
}