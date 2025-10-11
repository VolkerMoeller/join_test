// -----------------
// work.js-functions:
// -----------------

// --> initial functions:

// initWork()
// returnToLogIn()
// setMenuIcnHvrClrSVG()
// resetMenuIcnHvrClrSVG()

// --> content functions:

// showCurrentContent()
// showHelpContent()
// showInfoContentById()


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
    initSumView();
    genBtnUser();
    genSumRectCnt();
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


function genSumRectCnt() {
    let tasksGroups = loadLocalStorageObject('currentUser').tasksGroups;
    let sumRects = {
        'rectToDo': [tasksGroups['toDo'], 'To-Do'],
        'rectDone': [tasksGroups['done'], 'Done'],
        'rectUrgent': [tasksGroups['urgent'], 'Urgent'],
        'rectBoard': [tasksGroups['inBoard'], 'Tasks in <br>Board'],
        'rectProgress': [tasksGroups['progress'], 'Tasks in <br>Progress'],
        'rectFeedback': [tasksGroups['feedback'], 'Awaiting <br>Feedback']
    };
    Object.entries(sumRects).forEach(([key, value]) => {
        document.getElementById(key).innerHTML = '';
        document.getElementById(key).innerHTML = genHTMLSumRectCnt(value[0], value[1]);
    });
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


// ------------------
// content-functions:
// ------------------


function showCurrentContent() {
    hideAllWorkContent();
    let selectedMenuBtn = getSelectedMenuBtn();
    let selectedMenuBtnId = selectedMenuBtn.getAttribute('id');
    let currentCntId = provideCurrentContentId(selectedMenuBtnId);
    document.getElementById(currentCntId).classList.remove('display-none');
}


function showHelpContent() {
    hideAllWorkContent();
    document.getElementById('cntCenterHelp').classList.remove('display-none');
}


function showInfoContentById(cntId) {
    resetNavigationView();
    hideAllWorkContent();
    document.getElementById(cntId).classList.remove('display-none');
    setTxtBtnInfoById(cntId);
}


// --------------------
// 1st-level-functions:
// --------------------


// hideAllWorkContent()
// getSelectedMenuBtn()
// provideCurrentContentId()
// resetHelpBtns() 

// hideAllWorkContent()
// hideHelpBtns()

// resetNavigationView() --> main.js
// hideAllWorkContent()
// hideHelpBtns() --> see above
// setTxtBtnInfoById()


function hideAllWorkContent() {
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.add('display-none');
    });
}


function getSelectedMenuBtn() {
    let selectedMenuBtn = document.querySelector('.menu-btn-hvr-selected');
    if (!selectedMenuBtn) {
        selectedMenuBtn = document.querySelector('.menu-btn-hvr-mbl-selected');
    }
    return selectedMenuBtn;
}


function provideCurrentContentId(menuBtnId) {
    let referenceObject = {
        mnuBtn2nd: 'cntCenterSum',
        mnuBtn3rd: 'cntCenterAdd',
        mnuBtn4th: 'cntCenterBoard',
        mnuBtn5th: 'cntCenterContacts',
        mnuBtnMbl2nd: 'cntCenterSum',
        mnuBtnMbl3rd: 'cntCenterAdd',
        mnuBtnMbl4th: 'cntCenterBoard',
        mnuBtnMbl5th: 'cntCenterContacts'
    }
    let contentId = referenceObject[menuBtnId];
    return contentId;
}


// function resetHelpBtns() {
//     document.getElementById('btnHelp').classList.remove('display-none');
//     document.getElementById('helpBtnSmallMenu').classList.remove('display-none');
// }


// function hideHelpBtns() {
//     document.getElementById('btnHelp').classList.add('display-none');
//     document.getElementById('helpBtnSmallMenu').classList.add('display-none');
// }


function setTxtBtnInfoById(cntId) {
    if (cntId == 'cntCenterPrivacy') {
        document.getElementById('txtBtnPrivacy').classList.remove('txt-btn-left');
        document.getElementById('txtBtnPrivacy').classList.add('txt-btn-left-selected');
        document.getElementById('txtBtnLegal').classList.add('txt-btn-left');
        document.getElementById('txtBtnLegal').classList.remove('txt-btn-left-selected');
    }
    if (cntId == 'cntCenterLegal') {
        document.getElementById('txtBtnPrivacy').classList.add('txt-btn-left');
        document.getElementById('txtBtnPrivacy').classList.remove('txt-btn-left-selected');
        document.getElementById('txtBtnLegal').classList.remove('txt-btn-left');
        document.getElementById('txtBtnLegal').classList.add('txt-btn-left-selected');
    }
}


// showLeftAndBottomMenu()
// saveLocalStorageObject() --> main.js



function currentNavView(currentBtnId) {
    let twinBtn = getTheButtonTwin(currentBtnId);
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById(currentBtnId);
    setCurrentBtnById(twinBtn);
    showLeftAndBottomMenu();
}


function showLeftAndBottomMenu() {
    setTimeout(() => {
        document.getElementById('left-menu').classList.remove('display-none');
        document.getElementById('btm-menu').classList.remove('display-none');
    }, 10);
}



// -----------------
// cntTop-functions:
// -----------------


function showSmallMenu() {
    genSmallMenu();
    animSmallMenu();
}


function hideSmallMenu() {
    setTimeout(() => {
        resetOverlayV2();
    }, 10);
}


function initOvlFrameForAnimMenu() {
    let ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.remove('ovl-hide');
    ovlFrame.classList.add('ovl-show-nav');
}


function animSmallMenuFwd() {
    let smallNav = document.querySelector('.nav-cnt');
    smallNav.classList.remove('display-none');
    smallNav.classList.remove('from-left-out-off-sight');
    smallNav.classList.add('from-top-right-into-view');
}


// --------------------
// 1st-level-functions:
// --------------------

// genSmallMenu()
// animSmallMenu()
// resetOverlay() --> main.js


function genSmallMenu() {
    document.getElementById('ovlFrame').innerHTML = '';
    document.getElementById('ovlFrame').innerHTML = genHTMLSmallMenu();
}


function animSmallMenu() {
    initOvlFrameForAnimMenu();
    animSmallMenuFwd();
}


// --------------------
// 2nd-level-functions:
// --------------------

// genHTMLSmallMenu() --> genOvls.js
// initOvlFrameForAnimMenu() --> work.js
// animSmallMenuFwd() --> work.js



// ------------------
// cntMenu-functions:
// ------------------

// viewDefaultContent()


function viewDefaultContent(defaultBtnId) {
    viewDefaultBtnById(defaultBtnId);
    showCurrentContent();
}


// --------------------
// 1st-level-functions:
// --------------------

// viewDefaultBtnById()
// showCurrentContent() --> see above
// resetSVGHvr()
// currentNavView() --> see above


function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}


function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}