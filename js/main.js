let userStatus = 'guest'; // default user status

// include HTML

async function includeHTMLById(name) {
    let selector = '[' + name + ']';
    let includeElement = document.querySelectorAll(selector);
    for (let i = 0; i < includeElement.length; i++) {
        const element = includeElement[i];
        let attr = element.getAttribute(name);
        let resp = await fetch(attr);
        if (resp.ok) {
            let content = await resp.text();
            element.innerHTML = content;
        } else {
            element.innerHTML = "Page not found";
        }
    }
}


async function includeHTML() {
    await includeHTMLById('w3-include-html');
    await includeHTMLById('w3-include-overlay');
    await includeHTMLById('w3-include-template');
    await includeHTMLById('w3-include-variable');
    await includeHTMLById('w3-include-svg');
}


// change svg path class

function changeSvgPathClass(container, actualClass, targetClass) {
    let pathsMain = container.querySelectorAll(`path[class=${actualClass}]`);
    for (let i = 0; i < pathsMain.length; i++) {
        pathsMain[i].setAttribute('class', targetClass);
    }
}

// setClrScheme

function setClrSchemeInit() {
    let colorSchemeId = checkColorSchemeId();
    setClrScheme(colorSchemeId);
}


function checkColorSchemeId() {
    let colorSchemeId = loadLocalStorageObject('colorScheme');
    if (colorSchemeId) {
        return colorSchemeId
    } else return 1;
}


function setClrScheme(colorSchemeId) {
    if (!colorSchemeId) {
        saveLocalStorageObject('colorScheme', 1);
        changeClrScheme();
    }
    if (colorSchemeId) {
        saveLocalStorageObject('colorScheme', colorSchemeId);
        changeClrScheme();
    }
}


function changeClrScheme() {
    let schemeId = loadLocalStorageObject('colorScheme');
    document.getElementById('linkClrs').setAttribute('href', `./assets/css/main/clrSchemes/${schemeId}-colors.css`);
}




// local storage

function saveLocalStorageObject(key, obj) {
    let objAsString = JSON.stringify(obj);
    localStorage.setItem(key, objAsString);
}


function loadLocalStorageObject(key) {
    let obj = localStorage.getItem(key);
    obj = JSON.parse(obj);
    if (obj) return obj;
}


// navigation

async function changeOvl(target) {
    const cntCenter = document.querySelector('.ovl-frame');
    cntCenter.setAttribute('w3-include-overlay', `./assets/templates/overlays/${target}`);
    await includeHTMLById('w3-include-overlay');
}


async function switchToWorkPages() {
    window.location.assign('workPage.html');
}


async function switchToSignPages() {
    window.location.assign('signPage.html');
}


function changeCntMain() {
    const cntMain = document.querySelector('.main');
    cntMain.setAttribute('w3-include-html', './assets/templates/workPages/cntMain.html');
}


function changePageCSS() {
    const pageCSS = document.getElementById('pageCSS');
    pageCSS.setAttribute('href', './assets/css/pages/workPages.css');
}


function invertLogoClr() {
    const logo = document.querySelector('.logo-desktop-main');
    changeSvgPathClass(logo, 'path-def-1st', 'path-white')
}



function toggleOverlay() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.toggle('ovl-hide');
    overlay.classList.toggle('ovl-show');
}


function showOverlay() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show');
}


function resetOverlay() {
    resetOverlayFrame();
    resetOverlayMsg();
}


function resetOverlayFrame() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.add('ovl-hide');
    overlay.classList.remove('ovl-show');
    overlay.classList.remove('ovl-show-input');
}


function resetOverlayMsg() {
    let msgAnims = ['from-bottom-to-center', 'from-right-to-center'];
    let overlMsgs = document.querySelectorAll('.msg-cnt');
    overlMsgs.forEach(overlMsg => {
        for (let i = 0; i < msgAnims.length; i++) {
            const msgAnim = msgAnims[i];
            overlMsg.classList.remove(msgAnim);
            overlMsg.classList.add('display-none');
        }
    });
}


function setupOverlayForInput() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show-input');
}

function resetOverlayForInput() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.add('ovl-hide');
    overlay.classList.rmove('ovl-show-input');
}


// toggle elements

function toggleElements(id1st, id2nd) {
    const element1st = document.getElementById(id1st);
    const element2nd = document.getElementById(id2nd);
    element1st.classList.toggle('display-none');
    element2nd.classList.toggle('display-none');
}

// handle overlay

function handleOverlay() {
    let overlay = document.querySelector('.ovl-frame');
    let overlayNotShown = overlay.classList.contains('ovl-hide');
    if (overlayNotShown) {
        setupOverlayForInput();
        setupSignElementsOnTop();
    }
}


function handleOverlayBack() {
    setupOverlayForInput();
    setupSignElementsOnTop();
    setupPasswordBtn();
}


function setupPasswordBtn() {
    hideVisibilityBtn();
    visibilityPasswordOff();
    setVisibilityIconsDefault();
}



function checkOverlay() {
    let overlay = document.querySelector('.ovl-frame');
    if (!overlay.classList.contains('ovl-show-input')) {
        handleOverlay();
    }
}


//  helpers

function focusInput(fieldId) {
    document.getElementById(fieldId).focus();
}


// test

function doSth() {
    console.log('doSth()');
}