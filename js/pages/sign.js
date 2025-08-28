async function initSign() {
    await includeHTML();
    setClrSchemeInit();
}


function focusInputBy(id) {
    document.getElementById(id).focus();
}


function checkLogInInput() {
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