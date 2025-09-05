async function initSign() {
    await includeHTML();
    setClrSchemeInit();
}


// focus input fields

function handleFocusInputFields(fieldId, lockIcnId) {
    focusInput(fieldId);
    showVisibilityBtn(lockIcnId);
    handleInputIcon(lockIcnId);
}


function focusInput(fieldId) {
    document.getElementById(fieldId).focus();
}


function handleInputIcon(lockIcnId) {
    let toToggle = {
        lockIcnPw: ['pwVsbOff', 'pwVsbOn'],
        lockIcnPwConfirm: ['pwConfirmVsbOff', 'pwConfirmVsbOn']
    }
    let element = document.getElementById(lockIcnId);
    let elementNotShown = element.classList.contains('display-none')
    if (!elementNotShown) {
        element.classList.add('display-none');
    } else {
        visibilityPassword(lockIcnId);
        toggleElements(toToggle[lockIcnId][0], toToggle[lockIcnId][1]);
    }

}

// Validation

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


function visibilityPassword(id) {
    let pwToSet = {
        lockIcnPw: 'password',
        lockIcnPwConfirm: 'passwordConfirm'
    }
    let inputPw = document.getElementById(pwToSet[id]);
    if (inputPw.type === 'password') {
        inputPw.type = 'text';
    } else {
        inputPw.type = 'password';
    }
}


function visibilityPasswordOff() {
    document.getElementById('password').type = 'password';
    document.getElementById('passwordConfirm').type = 'password';
}


function setVisibilityIconsDefault() {
    let ids = {
        pwIdsShown: ['pwVsbOff', 'pwConfirmVsbOff'],
        pwIdsNotShown: ['pwVsbOn', 'pwConfirmVsbOn']
    }
    ids['pwIdsShown'].forEach(id => {
        document.getElementById(id).classList.remove('display-none');
    });
    ids['pwIdsNotShown'].forEach(id => {
        document.getElementById(id).classList.add('display-none');
    });
}

// function showVisibilityBtn() {
//     let containers = document.querySelectorAll('.visibility-container');
//     containers.forEach(container => {
//         container.classList.remove('display-none');
//     });
//     document.getElementById('lockIcnPw').classList.add('display-none');
//     document.getElementById('lockIcnPwConfirm').classList.add('display-none');
// }

function showVisibilityBtn(lockIcnId) {
    let containerId = lockIcnId + 'VsbCont'
    document.getElementById(lockIcnId).classList.add('display-none');
    document.getElementById(containerId).classList.remove('display-none');
}


function hideVisibilityBtn() {
    let containers = document.querySelectorAll('.visibility-container');
    containers.forEach(container => {
        container.classList.add('display-none');
    });
    document.getElementById('lockIcnPw').classList.remove('display-none');
    document.getElementById('lockIcnPwConfirm').classList.remove('display-none');
}



// warning text




function checkValidation() {
    let valid = false;
    let validEmail = document.getElementById('eMail').validity.valid;
    let validPassword = document.getElementById('password').validity.valid;
    if (validEmail && validPassword) {
        valid = true;
    }
    return valid
}


function initWarningTextSignUp() {
    setSignUpRequiredOn();
    warningTextSignUp();
}


function warningTextSignUp() {
    warningTextOff();
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('passwordConfirm').value;
    if (password == passwordConfirm) {
        warningTextOff();
    } else
        warningTextOn();
}


function warningTextLogIn() {
    warningTextOff();
    let eMail = document.getElementById('eMail');
    let password = document.getElementById('password');
    if (password.validity.valid && eMail.validity.valid) {
        warningTextOff();
    } else
        warningTextOn();
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
            warning.classList.add('opacity-0');
        }
    });
}


function toggleSignElementsOnTop() {
    let selectors = ['.input-container', '.form-sign input', '.cnt-right button', '.outside-bottom a', '.form-btn-back', '.clr-scheme-panel'];
    for (let i = 0; i < selectors.length; i++) {
        let elements = document.querySelectorAll(selectors[i]);
        if (elements) {
            elements.forEach(element => {
                element.classList.toggle('z-index-4');
            });
        }
    }
}


function emptyInputFields() {
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

function toggleSignFormsBack() {
    setSignUpRequiredOff();
    defaultFormSettings();
    setTimeout(() => {
        blurInputField();
    }, 1);

}


function blurInputField() {
    document.getElementById('eMail').blur();
}


function toggleSignFormsForward() {
    setSignUpRequiredOn();
    defaultFormSettings();
}


function defaultFormSettings() {
    toggleSignForms();
    emptyInputFields();
    warningTextOff();
}


function toggleSignForms() {
    changeFormInputs();
    toggleLoginElements();
    toggleSignUpElements();
}


function changeFormInputs() {
    let classes = {
        formInputs: ['form-inputs-log-in', 'form-inputs-sign-up'],
        formSign: ['form-sign-log-in', 'form-sign-sign-up']
    };
    Object.entries(classes).forEach(([key, value]) => {
        let formInput = document.getElementById(key);
        formInput.classList.toggle(value[0]);
        formInput.classList.toggle(value[1]);
    });
}


function toggleLoginElements() {
    let logInElements = document.querySelectorAll('.log-in');
    logInElements.forEach(logInElement => {
        logInElement.classList.toggle('display-none');
    });
}


function toggleSignUpElements() {
    let signUpElements = document.querySelectorAll('.sign-up');
    signUpElements.forEach(signUpElement => {
        signUpElement.classList.toggle('display-none');
    });
}


function setSignUpRequiredOff() {
    let name = document.getElementById('name');
    name.required = false;
    let passwordConfirm = document.getElementById('passwordConfirm');
    passwordConfirm.required = false;
}


function setSignUpRequiredOn() {
    let name = document.getElementById('name');
    name.required = true;
    let passwordConfirm = document.getElementById('passwordConfirm');
    passwordConfirm.required = true;
}

// test

function checkInput() {
    let form = checkCurrentForm();
    if (form == 'LogIn') { console.log('LogIn') } else { console.log('SignUp'); }
}

function checkCurrentForm() {
    let form = 'LogIn';
    let element = document.querySelector('.form-title');
    if (element.classList.contains('display-none')) { form = 'SignUp' }
    return form;

}