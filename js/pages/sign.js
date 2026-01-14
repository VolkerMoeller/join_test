async function initSign() {
    await includeHTML();
    setClrSchemeInit();
    saveLocalStorageObject('currentSubtaskId', '0');
    saveLocalStorageObject('currentSubtaskObj', {});
    storageGuest();
}

async function createNewUser() {
    let userData = await getUserData();
    let newUser = new User(userData);
    await storageFirebaseNewUser(newUser);
    return newUser;
}


async function getUserData() {
    let userData = [];
    let id = await initGetNextUserId();
    let name = document.getElementById('name').value;
    let eMail = document.getElementById('eMail').value;
    let password = document.getElementById('password').value;
    userData.push(id, name, eMail, password);
    return userData;
}


function checkInput() {
    let form = checkCurrentSignForm();
    if (form == 'LogIn') {
        checkInputLogIn();
    }
}


function toggleSignFormsBack() {
    setSignUpRequiredOff();
    defaultFormSettings();
    // resetOverlayFrame();
    setTimeout(() => {
        blurInputField();
    }, 1);
    scrollWindowToTop();
}


function checkWarningStyle(id) {
    let noMatch = document.getElementById(id).classList.contains('no-match-input');
    if (noMatch) {
        removeWarningNoMatchLogIn();
        removeWarningNoMatchSignUp();
        warningTextOff();
    }
}


function focusInputField(fieldId, lockIcnId) {
    focusInput(fieldId);
    handlePwIcn(lockIcnId);
}


function switchCheckboxIcnAndSignUpBtn() {
    toggleCheckboxIcns();
    toggleOnOffSignUpBtn();
}


function hoverCheckboxIcns() {
    let icns = document.querySelectorAll('.checkbox-icn-container button');
    icns.forEach(icn => {
        icn.classList.toggle('opacity-0');
        icn.classList.toggle('opacity-1');
    });
}


function setSignUpRequiredOff() {
    let name = document.getElementById('name');
    name.required = false;
    let passwordConfirm = document.getElementById('passwordConfirm');
    passwordConfirm.required = false;
}


async function initCheckInputSignUp() {
    let currentPw = document.getElementById('password').value;
    let currentConfirm = document.getElementById('passwordConfirm').value;
    let success = false;
    if (currentPw !== '' && currentConfirm !== '') {
        success = checkInputSignUp();
    }
    if (success) {
        await createNewUser();
        scrollWindowToTop();
        initAnimSignMessages();
    }
}


async function checkInputLogIn() {
    let isUser = false;
    isUser = await checkIfUser();
    if (!isUser) {
        warningTextOn();
        addWarningNoMatchLogIn();
    } else {
        warningTextOff();
        removeWarningNoMatchLogIn();
        setUserStatusUser();
        navToSumPage();
    }
}


function defaultFormSettings() {
    toggleSignForms();
    clearInputs();
    warningTextOff();
    resetWarningNoMatch();
    resetCheckbox();
}


function blurInputField() {
    document.getElementById('eMail').blur();
}


function removeWarningNoMatchLogIn() {
    let matchInputs = ['eMail', 'password'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.remove('no-match-input');
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


function setupSignElementsOnTop() {
    let selectors = ['.input-container', '.form-sign input', '.cnt-right button', '.outside-bottom a', '.form-btn-back', '.clr-scheme-panel', '.accept-terms-container'];
    for (let i = 0; i < selectors.length; i++) {
        let elements = document.querySelectorAll(selectors[i]);
        if (elements) {
            elements.forEach(element => {
                element.classList.add('z-index-4');
            });
        }
    }
}


function handlePwIcn(lockIcnId) {
    handleLockIcn(lockIcnId);
    handleInputIcon(lockIcnId);
}


function toggleCheckboxIcns() {
    let icns = ['checkboxChecked', 'checkboxDefault'];
    icns.forEach(icn => {
        document.getElementById(icn).classList.toggle('display-none');
    });
}


function toggleOnOffSignUpBtn() {
    let btn = document.getElementById('signUpBtn');
    let status = btn.hasAttribute('disabled');
    if (status) {
        btn.disabled = false;
        return false;
    } else {
        btn.disabled = true;
        return true;
    }
}


function checkInputSignUp() {
    let fits = checkPwAndPwConfirm();
    if (!fits) {
        warningTextOn();
        addWarningNoMatchSignUp();
        return false;
    } else {
        warningTextOff();
        removeWarningNoMatchSignUp();
        return true;
    }
}


async function checkIfUser() {
    let isUser = await compare();
    return isUser;
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


function addWarningNoMatchLogIn() {
    let matchInputs = ['eMail', 'password'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.add('no-match-input');
    });
}

function navToSumPage() {
    location.assign('./workPage.html');
}


function toggleSignForms() {
    changeFormInputs();
    toggleLoginElements();
    toggleSignUpElements();
}


function clearInputs() {
    let selector = ['.input-container input'];
    let containers = document.querySelectorAll(selector);
    if (containers) {
        containers.forEach(container => {
            container.value = '';
        });
    }
}


function resetWarningNoMatch() {
    let matchInputs = ['name', 'eMail', 'password', 'passwordConfirm'];
    matchInputs.forEach(input => {
        document.getElementById(input).classList.remove('no-match-input');
    });
}


function resetCheckbox() {
    let btn = document.getElementById('signUpBtn');
    let status = btn.hasAttribute('disabled');
    if (status == false) {
        btn.disabled = true;
        toggleCheckboxIcns();
    }
}


function handleLockIcn(lockIcnId) {
    let containerId = lockIcnId + 'VsbCont'
    document.getElementById(lockIcnId).classList.add('display-none');
    document.getElementById(containerId).classList.remove('display-none');
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


function checkPwAndPwConfirm() {
    let currentPw = document.getElementById('password').value;
    let currentConfirm = document.getElementById('passwordConfirm').value;
    if (currentPw == currentConfirm) {
        return true;
    } else {
        return false;
    }
}


function addWarningNoMatchSignUp() {
    document.getElementById('passwordConfirm').classList.add('no-match-input');
}


function removeWarningNoMatchSignUp() {
    document.getElementById('passwordConfirm').classList.remove('no-match-input');
}


async function compare() {
    let users = await getAllUsers();
    let email = document.getElementById('eMail').value;
    let password = document.getElementById('password').value;
    email = email.toLowerCase();
    password = password.toLowerCase();
    for (let i = 0; i < users.length; i++) {
        let userEmail = users[i].eMail.toLowerCase();
        let userPassword = users[i].password.toLowerCase();
        if (email == userEmail && password == userPassword) {
            rememberUserData(i, users[i]);
            return true;
        }
    }
    return false;
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


function rememberUserData(userId, user) {
    let id = userId.toString();
    let currentUser = new CurrentUser(id, user);
    saveLocalStorageObject('currentUser', currentUser);
}


function toggleSignFormsForward() {
    setSignUpRequiredOn();
    defaultFormSettings();
    resetOverlayFrame();
    setupPasswordBtn();
    scrollWindowToTop();
}


function setSignUpRequiredOn() {
    let name = document.getElementById('name');
    name.required = true;
    let passwordConfirm = document.getElementById('passwordConfirm');
    passwordConfirm.required = true;
}

function setupPasswordBtn() {
    hideVisibilityBtn();
    visibilityPasswordOff();
    setVisibilityIconsDefault();
}


function hideVisibilityBtn() {
    let containers = document.querySelectorAll('.visibility-container');
    containers.forEach(container => {
        container.classList.add('display-none');
    });
    document.getElementById('lockIcnPw').classList.remove('display-none');
    document.getElementById('lockIcnPwConfirm').classList.remove('display-none');
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