async function initSign() {
    await includeHTML();
    focusInputBy('eMail');

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
        return true;
    } else {
        inputField.classList.add('invalid-input');
        return false;
    }
}