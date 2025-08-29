async function initSign() {
    await includeHTML();
    setClrSchemeInit();
}


function focusInputBy(id) {
    document.getElementById(id).focus();
}


function checkValidLogInInput() {
    checkValidInput('eMail');
    checkValidInput('password');
}


function checkValidInput(id) {
    let inputField = document.getElementById(id);
    if (inputField.checkValidity()) {
        inputField.classList.remove('invalid-input');
    } else {
        inputField.classList.add('invalid-input');
    }
}


function visibilityPassword() {
    let inputPw = document.getElementById('password');
    if (inputPw.type === 'password') {
        inputPw.type = 'text';
    } else {
        inputPw.type = 'password';
    }
}


function showVisibilityBtn() {
    document.querySelector('.visibility-container').classList.remove('display-none');
    document.getElementById('lockIcon').classList.add('display-none');
}


function hideVisibilityBtn() {
    document.querySelector('.visibility-container').classList.add('display-none');
    document.getElementById('lockIcon').classList.remove('display-none');
}


function handleVisibilityBtn() {
    let element = document.querySelector('.ovl-frame');
    if (element.classList.contains('ovl-show-input')) {
        toggleElements('visibilityOffBtn', 'visibilityOnBtn');
    }
}


function handleInputIcon() {
    let element = document.getElementById('lockIcon');
    let elementNotShown = element.classList.contains('display-none')
    if (!elementNotShown) {
        element.classList.add('display-none');
    } else {
        visibilityPassword();
        toggleElements('visibilityOffBtn', 'visibilityOnBtn');
    }

}