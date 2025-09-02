async function initSign() {
    await includeHTML();
    setClrSchemeInit();
}


function focusInputBy(id) {
    document.getElementById(id).focus();
}


function checkValidLogInInput() {
    checkValidInput('eMailLogIn');
    checkValidInput('passwordLogIn');
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
    let inputPw = document.getElementById('passwordLogIn');
    if (inputPw.type === 'password') {
        inputPw.type = 'text';
    } else {
        inputPw.type = 'password';
    }
}


function showVisibilityBtn() {
    document.querySelector('.visibility-container').classList.remove('display-none');
    document.getElementById('lockIcnLogIn').classList.add('display-none');
}


function hideVisibilityBtn() {
    document.querySelector('.visibility-container').classList.add('display-none');
    document.getElementById('lockIcnLogIn').classList.remove('display-none');
}


function handleInputIcon() {
    let element = document.getElementById('lockIcnLogIn');
    let elementNotShown = element.classList.contains('display-none')
    if (!elementNotShown) {
        element.classList.add('display-none');
    } else {
        visibilityPassword();
        toggleElements('pwVsbOff', 'pwVsbOn');
    }

}

// warning text

function warningTextLogIn() {
    let eMail = document.getElementById('eMailLogIn');
    let password = document.getElementById('passwordLogIn');
    if (!password.validity.valid || !eMail.validity.valid) {
        warningTextOn();
    } else
        warningTextOff();
}


function warningTextOn() {
    let warnings = document.querySelectorAll('.version-warning');
    warnings.forEach(warning => {
        let warningOff = warning.classList.contains('opacity-0');
        if (warningOff) {
            warning.classList.remove('opacity-0');
        }
    });
}


function warningTextOff() {
    let warnings = document.querySelectorAll('.version-warning');
    warnings.forEach(warning => {
        let warningOff = warning.classList.contains('opacity-0');
        if (!warningOff) {
            warning.classList.remove('opacity-0');
        }
    });
    // let warning = document.querySelector('.version-warning');
    // let warningOff = warning.classList.contains('display-none');
    // if (!warningOff) {
    //     warning.classList.add('display-none');
    // }
}


function toggleSignElementsOnTop() {
    let selectors = ['.input-container', '.form-sign input', '.content-right button', '.outside-bottom a', '.form-btn-frame', '.clr-scheme-panel'];
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

// handle Overlays for SignUp and LogIn


function toggleSignOvls() {
    let ovls = document.querySelectorAll('.ovl');
    for (let i = 0; i < ovls.length; i++) {
        const ovl = ovls[i];
        let ovlNotShown = ovl.classList.contains('display-none');
        if (!ovlNotShown) { ovl.classList.add('display-none') }
        else { ovl.classList.remove('display-none') };
    }
}


// toggle form sign-up / form log-in

function changeClasses() {
    let classes = ['form-inputs-log-in', 'form-inputs-sign-up'];
    let formInput = document.getElementById('formInputs');
    classes.forEach(cls => {
        formInput.toggle(cls);
    });
}