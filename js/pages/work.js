// -----------------
// work.js-functions:
// -----------------

// initial functions:

// initWork()
// returnToLogIn()
// setMenuIcnHvrClrSVG()
// resetMenuIcnHvrClrSVG()
// genHvrBtns();

// content functions:

// showCurrentContent()
// showHelpContent()
// showInfoContentById()


async function initWork() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    defaultNavView();
    genHvrBtns();
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


function genHvrBtns() {
    let btnReferences = {
        'btnBackHelp': 'showCurrentContent()'
    };
    Object.keys(btnReferences).forEach(btnBack => {
        document.getElementById(btnBack).innerHTML = genHovBtn(btnBack, btnReferences[btnBack]);
    });
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
    resetHelpBtns();
}


function showHelpContent() {
    hideAllWorkContent();
    document.getElementById('cntCenterHelp').classList.remove('display-none');
    hideHelpBtns();
}


function showInfoContentById(cntId) {
    resetNavigationView();
    hideAllWorkContent();
    document.getElementById(cntId).classList.remove('display-none');
    hideHelpBtns();
    setTxtBtnInfoById(cntId);
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


function resetHelpBtns() {
    document.getElementById('btnHelp').classList.remove('display-none');
    document.getElementById('helpBtnSmallMenu').classList.remove('display-none');
}


function hideHelpBtns() {
    document.getElementById('btnHelp').classList.add('display-none');
    document.getElementById('helpBtnSmallMenu').classList.add('display-none');
}


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
    }, 10);
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