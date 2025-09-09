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


// visibility btn

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


// input overlay

function toggleSignElementsOnTop() {
    let selectors = ['.input-container', '.form-sign input', '.cnt-right button', '.outside-bottom a', '.form-btn-back', '.clr-scheme-panel', '.accept-terms-container'];
    for (let i = 0; i < selectors.length; i++) {
        let elements = document.querySelectorAll(selectors[i]);
        if (elements) {
            elements.forEach(element => {
                element.classList.toggle('z-index-4');
            });
        }
    }
}


// clear input fields

function clearInputs() {
    let selector = ['.input-container input'];
    let containers = document.querySelectorAll(selector);
    if (containers) {
        containers.forEach(container => {
            container.value = '';
        });
    }
}


// handle overlays for signUp and logIn

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
    clearInputs();
    warningTextOff();
    resetWarningNoMatch();
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


// checkInput

function checkInput() {
    let form = checkCurrentForm();
    if (form == 'LogIn') {
        checkInputLogIn();
    }
}


function checkCurrentForm() {
    let form = 'LogIn';
    let element = document.querySelector('.form-title');
    if (element.classList.contains('display-none')) {
        form = 'SignUp';

    }
    return form;
}


function checkInputLogIn() {
    let fits = checkEmailAndPassword();
    if (!fits) {
        warningTextOn();
        addWarningNoMatchLogIn();
    } else {
        warningTextOff();
        removeWarningNoMatchLogIn();
        console.log('msg Log In');
    }
}


function toggleWarningNoMatchLogIn() {
    let matchInputs = ['eMail', 'password'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.toggle('no-match-input');
    });
}


function addWarningNoMatchLogIn() {
    let matchInputs = ['eMail', 'password'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.add('no-match-input');
    });
}


function removeWarningNoMatchLogIn() {
    let matchInputs = ['eMail', 'password'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.remove('no-match-input');
    });
}


function checkInputSignUp() {
    let fits = checkPwAndPwConfirm();
    if (!fits) {
        warningTextOn();
        addWarningNoMatchSignUp();
    } else {
        warningTextOff();
        removeWarningNoMatchSignUp();
        console.log('msg Sign up');
    }
}


function toggleWarningNoMatchSignUp() {
    document.getElementById('passwordConfirm').classList.toggle('no-match-input');
}


function addWarningNoMatchSignUp() {
    document.getElementById('passwordConfirm').classList.add('no-match-input');
}


function removeWarningNoMatchSignUp() {
    document.getElementById('passwordConfirm').classList.remove('no-match-input');
}


function resetWarningNoMatch() {
    let matchInputs = ['name', 'eMail', 'password', 'passwordConfirm'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.remove('no-match-input');
    });
}


function checkEmailAndPassword() {
    let currentEMail = document.getElementById('eMail').value;
    let currentPw = document.getElementById('password').value;
    if (currentEMail == 'gans@gmx.de' && currentPw == '123') {
        return true;
    } else {
        return false;
    }
}


function checkPwAndPwConfirm() {
    let currentPw = document.getElementById('password').value;
    let currentConfirm = document.getElementById('passwordConfirm').value;
    if (!currentPw == '' || !currentPw == '') {
        if (currentPw == currentConfirm) {
            return true;
        } else {
            return false;
        }
    }
}


function checkWarningStyle(id) {
    let noMatch = document.getElementById(id).classList.contains('no-match-input');
    if (noMatch) {
        // document.getElementById(id).classList.remove('no-match-input');
        removeWarningNoMatchLogIn();
        removeWarningNoMatchSignUp();
        warningTextOff();
    }

}


// check accept terms

function checkAcceptTerms() {
    let btn = document.getElementById('signUpBtn');
    let status = btn.hasAttribute('disabled');
    if (status) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}