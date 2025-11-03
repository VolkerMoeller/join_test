// -----------------
// work.js-functions:
// -----------------


// initWork()
// returnToLogIn()
// setMenuIcnHvrClrSVG()
// resetMenuIcnHvrClrSVG()


// ------------------
// initial-functions:
// ------------------

async function initWork() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    defaultNavView();
    genHvrBtns();
    genBtnUser();
    initPageContent();
}


function returnToLogIn() {
    window.location.assign('./signPage.html');
    saveLocalStorageObject('userStatus', 'external');
}


function setMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
    let defaultBtn = document.getElementById(btnId).classList.contains('menu-btn-hvr-selected');
    if (!defaultBtn) {
        let menuIcnIds = [icnId1, icnId2];
        for (let i = 0; i < menuIcnIds.length; i++) {
            const menuIcnId = menuIcnIds[i];
            if (menuIcnId) {
                let menuIcn = document.getElementById(menuIcnId);
                menuIcn.classList.remove('menu-icon');
                menuIcn.classList.add('menu-icon-hvr');
            }
        }
    }
}


function resetMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
    let defaultBtn = document.getElementById(btnId).classList.contains('menu-btn-hvr-selected');
    if (!defaultBtn) {
        let menuIcnIds = [icnId1, icnId2];
        for (let i = 0; i < menuIcnIds.length; i++) {
            const menuIcnId = menuIcnIds[i];
            if (menuIcnId) {
                let menuIcn = document.getElementById(menuIcnId);
                menuIcn.classList.add('menu-icon');
                menuIcn.classList.remove('menu-icon-hvr');
            }
        }
    }
}


// --------------------
// 1st-level-functions:
// --------------------


// --> initWork()

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()
// defaultNavView()
// genHvrBtns()
// initSumView()
// genBtnUser()
// genSumRectCnt()

// --> returnToLogIn()

// saveLocalStorageObject() --> main.js



function defaultHeaderView() {
    let userStatus = readingUserStatus()
    if (userStatus == 'guest') { guestHeader(); }
    if (userStatus == 'user') { userHeader(); }
}


function defaultNavView() {
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById('mnuBtn2nd');
    setCurrentBtnById('mnuBtnMbl2nd');
    showLeftAndBottomMenu();
}


async function genHvrBtns() {
    let btnRefs = {
        'btnBackHelp': ['bntBack4', 'showCurrentContent()'],
        'btnBackLegal': ['bntBack6', 'showCurrentContent()'],
        'btnBackPrivacy': ['bntBack5', 'showCurrentContent()']
    };
    Object.keys(btnRefs).forEach(element => {
        document.getElementById(element).innerHTML = genHTMLHvrBtn(btnRefs[element][0], btnRefs[element][1]);
    });
    await includeHTMLById('w3-include-hvr-btn');
}


function initSumView() {
    let windowWidth = getWindowWidth();
    if (windowWidth > 1440) {
        genWelcomeDesktop();
        resetOverlayV2();
    } else {
        document.getElementById('ovlFrame').classList.add('ovl-fade-out');
        genWelcomeMobile();
        setTimeout(() => {
            resetOverlayV2();
        }, 2000);
    }
    let userStatus = loadLocalStorageObject('userStatus');
    if (userStatus == 'user') {
        toggleGreeting();
    }
}


function genBtnUser() {
    let currentUser = loadLocalStorageObject('currentUser');
    document.getElementById('btnUser').innerHTML = '';
    document.getElementById('btnUser').innerHTML = genHTMLBtnUser(currentUser['initial']);
}


// --------------------
// 2nd-level-functions:
// --------------------

// readingUserStatus() --> main.js
// guestHeader()
// userHeader()

// resetNavigationView() --> main.js
// setCurrentBtnById()
// showLeftAndBottomMenu() --> see above
// getTheButtonTwin()
// resetNavigationView() --> see above
// resetNavigationViewMbl() --> main.js
// setCurrentBtnById() --> see above
// setCurrentBtnById() --> see above
// showLeftAndBottomMenu() --> see above

// genHTMLHvrBtn() --> genHovBtn.js
// includeHTMLById() --> main.js

// getWindowWidth() --> main.js
// genWelcomeDesktop() --> sum.js
// resetOverlayV2() --> main.js
// genWelcomeMobile() --> sum .js
// resetOverlayV2() --> main.js
// loadLocalStorageObject() --> main.js
// toggleGreeting() --> sum.js

// loadLocalStorageObject() --> main.js
// genHTMLBtnUser() --> genHTMLElements.js

// loadLocalStorageObject() --> main.js
// genHTMLSumRectCnt() --> genHTMLElements.js


function guestHeader() {
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.add('display-none');
    document.querySelector('.header-guest-btn').classList.remove('display-none');
};


function userHeader() {
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.remove('display-none');
    document.querySelector('.header-guest-btn').classList.add('display-none');
};


function setCurrentBtnById(defBtnId) {
    let sumNavBtn = document.getElementById(defBtnId);
    if (sumNavBtn.classList.contains('menu-btn-hvr')) {
        sumNavBtn.classList.remove('menu-btn-hvr');
        sumNavBtn.classList.add('menu-btn-hvr-selected');
        sumNavBtn.disabled = true;
    }
    if (sumNavBtn.classList.contains('menu-btn-hvr-mbl')) {
        sumNavBtn.classList.remove('menu-btn-hvr-mbl');
        sumNavBtn.classList.add('menu-btn-hvr-mbl-selected');
        sumNavBtn.disabled = true;
    }
}


function getTheButtonTwin(defBtnId) {
    let twinBtnId;
    switch (defBtnId) {
        case 'mnuBtnMbl1st':
            twinBtnId = 'mnuBtn1st';
            break
        case 'mnuBtnMbl2nd':
            twinBtnId = 'mnuBtn2nd';
            break
        case 'mnuBtnMbl3rd':
            twinBtnId = 'mnuBtn3rd';
            break
        case 'mnuBtnMbl4th':
            twinBtnId = 'mnuBtn4th';
            break
        case 'mnuBtnMbl5th':
            twinBtnId = 'mnuBtn5th';
            break
        case 'mnuBtn1st':
            twinBtnId = 'mnuBtnMbl1st';
            break
        case 'mnuBtn2nd':
            twinBtnId = 'mnuBtnMbl2nd';
            break
        case 'mnuBtn3rd':
            twinBtnId = 'mnuBtnMbl3rd';
            break
        case 'mnuBtn4th':
            twinBtnId = 'mnuBtnMbl4th';
            break
        case 'mnuBtn5th':
            twinBtnId = 'mnuBtnMbl5th';
            break
    }
    return twinBtnId;
}