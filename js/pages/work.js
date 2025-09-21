// -----------------
// work.js-functions:
// -----------------

// initWork()
// returnToLogIn()
// toggleMenuIcnClrSVG()


async function initWork() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    defaultNavView();
}


function returnToLogIn() {
    window.close();
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


// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()
// defaultNavView()
// currentNavView()
// showLeftAndBottomMenu()
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


function currentNavView(currentBtnId) {
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById(currentBtnId);
    showLeftAndBottomMenu();
}


function currentNavViewMbl(currentBtnId) {
    resetNavigationViewMbl();
    // setCurrentBtnById(currentBtnId);
    // showLeftAndBottomMenu();
}


function showLeftAndBottomMenu() {
    setTimeout(() => {
        document.getElementById('left-menu').classList.remove('display-none');
        document.getElementById('btm-menu').classList.remove('display-none');
    }, 10);
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

// -----------------
// cntTop-functions:
// -----------------


function showSmallMenu() {
    showOverlay();
    animSmallMenu();
}


function hideSmallMenu() {
    setTimeout(() => {
        resetOverlay();
    }, 1000);
}


function animSmallMenu() {
    initOvlFrameForAnimMenu();
    animSmallMenuFwd();
}


function initOvlFrameForAnimMenu() {
    let ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.remove('ovl-show-anim-bg');
    ovlFrame.classList.add('ovl-show-nav');
}


function animSmallMenuFwd() {
    let smallNav = document.querySelector('.nav-cnt');
    smallNav.classList.remove('display-none');
    smallNav.classList.remove('from-left-out-off-sight');
    smallNav.classList.add('from-top-right-into-view');
}


// ------------------
// cntMenu-functions:
// ------------------

// viewSum()
// viewAdd()
// viewBoard()
// viewCont()


function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}

function viewSum() {
    resetSVGHvr();
    currentNavView('mnuBtn2nd');
}


function viewAdd() {
    resetSVGHvr();
    currentNavView('mnuBtn3rd');
}


function viewBoard() {
    resetSVGHvr();
    currentNavView('mnuBtn4th');
}


function viewCont() {
    resetSVGHvr();
    currentNavView('mnuBtn5th');
}


function viewSumMbl() {
    resetSVGHvr();
    currentNavViewMbl('mnuBtnMbl2nd');
}


function viewAddMbl() {
    resetSVGHvr();
    currentNavViewMbl('mnuBtnMbl3rd');
}


function viewBoardMbl() {
    resetSVGHvr();
    currentNavViewMbl('mnuBtnMbl4th');
}


function viewContMbl() {
    resetSVGHvr();
    currentNavViewMbl('mnuBtnMbl5th');
}

// --------------------
// 1st-level-functions:
// --------------------

// resetSVGHvr()

function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}