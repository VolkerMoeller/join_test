// -----------------------
// animMessages-functions:
// -----------------------

// 1st
// initAnimSignMessages
// ---
// 2nd
// initAnimWorkMessages


function initAnimSignMessages() {
    let currentForm = checkCurrentSignForm();
    resetSignElementsOnTop();
    animSignMessages(currentForm);
    if (currentForm == 'SignUp') {
        setTimeout(() => {
            switchToLoginForm(currentForm);
        }, 1000);
    }
}


function initAnimWorkMessages(form) {
    animWorkMessages(form);
    if (form == 'addTask') {
        setTimeout(() => {
            // switchToBoard();
        }, 1000);
    }
}


// --------------------
// 1st-level-functions:
// --------------------

// checkCurrentSignForm()
// resetSignElementsOnTop()
// animSignMessages()
// switchToLoginForm()
// ---
// animWorkMessages()


// .1st
function checkCurrentSignForm() {
    let form = 'LogIn';
    let element = document.querySelector('.form-title');
    if (element.classList.contains('display-none')) {
        form = 'SignUp';
    }
    return form;
}


// .1st
function resetSignElementsOnTop() {
    let selectors = ['.input-container', '.form-sign input', '.cnt-right button', '.outside-bottom a', '.form-btn-back', '.clr-scheme-panel', '.accept-terms-container'];
    for (let i = 0; i < selectors.length; i++) {
        let elements = document.querySelectorAll(selectors[i]);
        if (elements) {
            elements.forEach(element => {
                element.classList.remove('z-index-4');
            });
        }
    }
}


// .1st
function animSignMessages(currentForm) {
    showOverlayForMsg();
    showCurrentMessage(currentForm);
    slideMessages();
    setTimeout(() => {
        resetOverlay();
    }, 1000);
}


// .1st
function switchToLoginForm(currentForm) {
    if (currentForm == 'SignUp') {
        toggleSignFormsBack();
    }
}


// .2nd
async function animWorkMessages(currentForm) {
    await includeHTMLById('w3-include-overlay');
    showOverlayForMsgV2();
    showCurrentMessage(currentForm);
    slideMessages();
    setTimeout(() => {
        resetOverlay();
    }, 1000);
}


// --------------------
// 2nd-level-functions:
// --------------------

// showOverlayForMsgV2() --> main.js
// showCurrentMessage()
// slideMessages()
// resetOverlay() --> main.js


// .1st
// ..
function showCurrentMessage(currentForm) {
    resetMessages();
    let windowWidth = getWindowWidth();
    if (windowWidth >= 1440) {
        animMsgDesktop(currentForm);
    } else {
        animMsgMobile(currentForm);
    }
}


// .1st
// ..
function slideMessages() {
    document.querySelector('.msg-btm-cnt').classList.add('from-bottom-to-center');
    document.querySelector('.msg-btm-cnt-mbl').classList.add('from-bottom-to-center-mbl');
}


// --------------------
// 3rd-level-functions:
// --------------------

// resetMessages() 
// getWindowWidth() --> main.js
// animMsgDesktop()
// animMsgMobile()


// .1st
// ...
function resetMessages() {
    let msgs = document.querySelectorAll('.msg-cnt');
    msgs.forEach(msg => {
        msg.classList.add('display-none');
    });
}


// .1st
// ...
function animMsgDesktop(currentForm) {
    if (currentForm == 'SignUp') {
        document.getElementById('msgSign').classList.remove('display-none');
    }
    if (currentForm == 'addTask') {
        document.getElementById('msgNewTask').classList.remove('display-none');
    }
}


// .1st
// ...
function animMsgMobile(currentForm) {
    if (currentForm == 'SignUp') {
        document.getElementById('msgSignMbl').classList.remove('display-none');
    }
    if (currentForm == 'addTask') {
        document.getElementById('msgNewTaskMbl').classList.remove('display-none');
    }
}