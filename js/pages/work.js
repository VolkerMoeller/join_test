// -----------------
// work.js-functions:
// -----------------

// initWork()
// returnToLogIn()
// setMenuIcnHvrClrSVG()
// resetMenuIcnHvrClrSVG()


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


function hideAllWorkContent() {
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.add('display-none');
    });
}


function getIdOfCurrentContent() {
    let selectedMenuBtn = document.querySelector('.menu-btn-hvr-selected');
    let selectedMenuBtnId = selectedMenuBtn.getAttribute('id');
    let currentCntId = provideCurrentContentId(selectedMenuBtnId);
    console.log(currentCntId);
}


function provideCurrentContentId(menuBtnId) {
    let referenceObject = {
        mnuBtn2nd: 'cntCenterSum',
        mnuBtn3rd: 'cntCenterAdd',
        mnuBtn4th: 'cntCenterBoard',
        mnuBtn5th: 'cntCenterContacts',
    }
    let contentId = referenceObject[menuBtnId];
    return contentId;
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

// viewDefaultContent()
// viewDefaultBtnById()
// viewDefaultContentById()


function viewDefaultContent(defaultBtnId) {
    viewDefaultBtnById(defaultBtnId);
    viewDefaultContentById(defaultBtnId);
}


function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}


function viewDefaultContentById(defaultBtn) {
    console.log(defaultBtn);
}


// --------------------
// 1st-level-functions:
// --------------------

// resetSVGHvr()
// currentNavView() --> work.js


function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}