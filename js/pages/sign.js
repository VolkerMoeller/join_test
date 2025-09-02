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


function visibilityPassword(id) {
    let pwToSet = {
        lockIcnLogIn: 'password',
        lockIcnSignUp: 'passwordConfirm'
    }
    let inputPw = document.getElementById(pwToSet[id]);
    if (inputPw.type === 'password') {
        inputPw.type = 'text';
    } else {
        inputPw.type = 'password';
    }
}


function showVisibilityBtn() {
    let containers = document.querySelectorAll('.visibility-container');
    containers.forEach(container => {
        container.classList.remove('display-none');
    });
    document.getElementById('lockIcnLogIn').classList.add('display-none');
    document.getElementById('lockIcnSignUp').classList.add('display-none');
}


function hideVisibilityBtn() {
    let containers = document.querySelectorAll('.visibility-container');
    containers.forEach(container => {
        container.classList.add('display-none');
    });
    document.getElementById('lockIcnLogIn').classList.remove('display-none');
    document.getElementById('lockIcnSignUp').classList.remove('display-none');
}


function handleInputIcon(id) {
    let toToggle = {
        lockIcnLogIn: ['pwVsbOff', 'pwVsbOn'],
        lockIcnSignUp: ['pwConfirmVsbOff', 'pwConfirmVsbOn']
    }
    let element = document.getElementById(id);
    let elementNotShown = element.classList.contains('display-none')
    if (!elementNotShown) {
        element.classList.add('display-none');
    } else {
        visibilityPassword(id);
        toggleElements(toToggle[id][0], toToggle[id][1]);
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

function toggleSignFormsBack() {
    toggleSignForms();
    setSignUpRequiredOff();
}

function toggleSignFormsForward() {
    toggleSignForms();
    setSignUpRequiredOn();
}


function toggleSignForms() {
    changeFormInputs();
    toggleLoginElements();
    toggleSignUpElements();
}


function changeFormInputs() {
    let classes = ['form-inputs-log-in', 'form-inputs-sign-up'];
    let formInput = document.getElementById('formInputs');
    classes.forEach(cls => {
        formInput.classList.toggle(cls);
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