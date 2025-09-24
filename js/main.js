// -------------------
// main-functions:
// -------------------

// --- initial-functions:

// includeHTML()
// changeSvgPathClass()
// setClrSchemeInit()
// invertLogoClr()
// setUserStatusExternal()
// setUserStatusGuest()
// setUserStatusUser()

// --- local-storage-functions:

// saveLocalStorageObject()
// loadLocalStorageObject()

// --- basic-navigation-functions:

// switchToWorkPagesAsGuest()
// switchToSignPages()
// changeCntMain()
// changePageCSS()
// resetNavigationView()
// resetNavigationViewMbl()

// --- overlay-functions:

// showOverlay()
// resetOverlay()
// handleOverlay()

// --- help-functions:

// toggleElements()
// focusInput()
// readingUserStatus()
// getWindowWidth()
// getWindowHeight()
// doSth()
// windowClose()


async function includeHTML() {
    await includeHTMLById('w3-include-html');
    await includeHTMLById('w3-include-overlay');
    await includeHTMLById('w3-include-template');
    await includeHTMLById('w3-include-variant');
    await includeHTMLById('w3-include-svg');
}


function changeSvgPathClass(container, actualClass, targetClass) {
    let pathsMain = container.querySelectorAll(`path[class=${actualClass}]`);
    for (let i = 0; i < pathsMain.length; i++) {
        pathsMain[i].setAttribute('class', targetClass);
    }
}


function setClrSchemeInit() {
    let colorSchemeId = checkColorSchemeId();
    setClrScheme(colorSchemeId);
}


function invertLogoClr() {
    const logo = document.querySelector('.logo-desktop-main');
    changeSvgPathClass(logo, 'path-def-1st', 'path-white')
}


function setUserStatusExternal() {
    saveLocalStorageObject('userStatus', 'external');
}


function setUserStatusUser() {
    saveLocalStorageObject('userStatus', 'user');
}


function setUserStatusGuest() {
    saveLocalStorageObject('userStatus', 'guest');
}


function saveLocalStorageObject(key, obj) {
    let objAsString = JSON.stringify(obj);
    localStorage.setItem(key, objAsString);
}


function loadLocalStorageObject(key) {
    let obj = localStorage.getItem(key);
    obj = JSON.parse(obj);
    if (obj) return obj;
}


async function changeOvl(target) {
    const cntCenter = document.querySelector('.ovl-frame');
    cntCenter.setAttribute('w3-include-overlay', `./assets/templates/overlays/${target}`);
    await includeHTMLById('w3-include-overlay');
}


function switchToWorkPagesAsGuest() {
    window.location.assign('workPage.html');
    setUserStatusGuest();
}


function switchToSignPages() {
    window.location.assign('signPage.html');
    setUserStatusExternal();
}


function changeCntMain() {
    const cntMain = document.querySelector('.main');
    cntMain.setAttribute('w3-include-html', './assets/templates/workPages/cntMain.html');
}


function changePageCSS() {
    const pageCSS = document.getElementById('pageCSS');
    pageCSS.setAttribute('href', './assets/css/pages/workPages.css');
}


function resetNavigationView() {
    let navBtnsSelected = document.querySelectorAll('.menu-btn-hvr-selected');
    navBtnsSelected.forEach(navBtnSelected => {
        navBtnSelected.classList.remove('menu-btn-hvr-selected');
        navBtnSelected.classList.add('menu-btn-hvr');
    });

    let navBtns = document.querySelectorAll('.menu-btn-hvr');
    navBtns.forEach(navBtn => {
        navBtn.classList.remove('display-none');
        navBtn.disabled = false;
    });

    let fstNavBtn = document.querySelector('.menu-btn-hvr');
    fstNavBtn.classList.add('display-none');
}


function resetNavigationViewMbl() {
    let navBtnsSelected = document.querySelectorAll('.menu-btn-hvr-mbl-selected');
    navBtnsSelected.forEach(navBtnSelected => {
        navBtnSelected.classList.remove('menu-btn-hvr-mbl-selected');
        navBtnSelected.classList.add('menu-btn-hvr-mbl');
    });

    let navBtns = document.querySelectorAll('.menu-btn-hvr-mbl');
    navBtns.forEach(navBtn => {
        navBtn.classList.remove('display-none');
        navBtn.disabled = false;
    });


    let fstNavBtn = document.querySelector('.menu-btn-hvr-mbl');
    fstNavBtn.classList.add('display-none');
}


function showOverlay() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show-anim-bg');
}


function resetOverlay() {
    resetOverlayFrame();
    resetOverlayMsg();
    resetOverlayNav();
}


function handleOverlay() {
    let overlay = document.querySelector('.ovl-frame');
    let overlayNotShown = overlay.classList.contains('ovl-hide');
    if (overlayNotShown) {
        setupOverlayForInput();
        setupSignElementsOnTop();
    }
}


function toggleElements(id1st, id2nd) {
    const element1st = document.getElementById(id1st);
    const element2nd = document.getElementById(id2nd);
    element1st.classList.toggle('display-none');
    element2nd.classList.toggle('display-none');
}


function checkOverlay() {
    let overlay = document.querySelector('.ovl-frame');
    if (!overlay.classList.contains('ovl-show-input')) {
        handleOverlay();
    }
}


function focusInput(fieldId) {
    document.getElementById(fieldId).focus();
}


function readingUserStatus() {
    const userStatus = loadLocalStorageObject('userStatus');
    return userStatus;
}


function getWindowWidth() {
    return window.innerWidth;
}


function getWindowHeight() {
    return window.innerHeight;
}


function doSth() {
    console.log('doSth()');
}


function windowClose() {
    window.close();
}


function goBack() {
    history.back();
}


// -------------------
// 1st-level-functions
// -------------------

// includeHTMLById()
// checkColorSchemeId()
// setClrScheme()
// changeSvgPathClass() --> see above
// saveLocalStorageObject() --> see above
// saveLocalStorageObject() --> see above
// saveLocalStorageObject() --> see above
// setUserStatusGuest() --> see above
// includeHTMLById() --> see above
// resetOverlayFrame()
// resetOverlayMsg()
// resetOverlayNav()
// setupOverlayForInput()
// setupSignElementsOnTop() --> sign.js
// handleOverlay() --> see above
// loadLocalStorageObject() --> see above


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


function resetOverlayFrame() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.add('ovl-hide');
    overlay.classList.remove('ovl-show-anim-bg');
    overlay.classList.remove('ovl-show-input');
    overlay.classList.remove('ovl-show-nav');
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


function resetOverlayNav() {
    let msgAnim = 'from-top-right-into-view';
    let overlNav = document.querySelector('.nav-cnt');
    if (overlNav) {
        overlNav.classList.remove(msgAnim);
        overlNav.classList.add('display-none');
    }
}


function setupOverlayForInput() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show-input');
}


// -------------------
// 2nd-level-functions
// -------------------

// loadLocalStorageObject() - see above
// saveLocalStorageObject() - see above
// changeClrScheme()


function changeClrScheme() {
    let schemeId = loadLocalStorageObject('colorScheme');
    document.getElementById('linkClrs').setAttribute('href', `./assets/css/main/clrSchemes/${schemeId}-colors.css`);
}


// -------------------
// 3rd-level-functions
// -------------------

// loadLocalStorageObject() - see above