// setClrScheme

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



function changeToSignUp() {
    changeCntCenter('signUp');
    changeCntRight('signUp');
}


function backToLogIn() {
    changeCntCenter('logIn');
    changeCntRight('logIn');
}


async function changeCntCenter(target) {
    const cntCenter = document.querySelector('.content-center');
    cntCenter.setAttribute('w3-include-variable', `./assets/templates/signPages/${target}/cntCenter.html`);
    await includeHTMLById('w3-include-variable');
}


async function changeCntRight(target) {
    const cntCenter = document.querySelector('.content-right');
    cntCenter.setAttribute('w3-include-variable', `./assets/templates/signPages/${target}/cntRight.html`);
    await includeHTMLById('w3-include-variable');
}


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


// async function changeToSignPages() {
//     const pageCSS = document.getElementById('pageCSS');
//     pageCSS.setAttribute('href', './assets/css/pages/signPages.css');
//     const cntMain = document.querySelector('.main');
//     cntMain.setAttribute('w3-include-html', './assets/templates/signPages/cntMain.html');
//     changeOvl('ovlSign.html');
//     includeHTML();
// }


function toggleOverlay() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.toggle('ovl-hide');
    overlay.classList.toggle('ovl-show');
}


function animMessage(className = 'show-msg-btm-cnt') {
    toggleOverlay();
    slideMessage(className);
    setTimeout(() => {
        toggleOverlay();
    }, 1500);
}


function slideMessage(className) {
    const message = document.querySelector('.msg-cnt');
    message.classList.toggle(className);
}
