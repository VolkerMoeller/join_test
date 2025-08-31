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
    warningTextLogIn();

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

// warning text

function warningTextLogIn() {
    let eMail = document.getElementById('eMail');
    let password = document.getElementById('password');
    if (!password.validity.valid || !eMail.validity.valid) {
        warningTextOn();
    } else
        warningTextOff();
}


function warningTextOn() {
    let warning = document.querySelector('.version-warning');
    let warningOff = warning.classList.contains('display-none');
    if (warningOff) {
        warning.classList.remove('display-none');
    }
}


function warningTextOff() {
    let warning = document.querySelector('.version-warning');
    let warningOff = warning.classList.contains('display-none');
    if (!warningOff) {
        warning.classList.add('display-none');
    }
}


function toggleSignElementsOnTop() {
    let selectors = ['.input-container', '.form-sign input', '.content-right button', '.outside-bottom a', '.btn-frame'];
    for (let i = 0; i < selectors.length; i++) {
        let elements = document.querySelectorAll(selectors[i]);
        if (elements) {
            elements.forEach(element => {
                element.classList.toggle('z-index-4');
            });
        }
    }
}


function emptySignInputFields() {
    let selectors = ['.input-container input'];
    for (let i = 0; i < selectors.length; i++) {
        let elements = document.querySelectorAll(selectors[i]);
        if (elements) {
            elements.forEach(element => {
                element.value = '';
            });
        }
    }
}