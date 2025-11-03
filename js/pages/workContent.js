// -----------------
// work.js-functions:
// -----------------

// --content functions:

// showCurrentContent()
// showHelpContent()
// showInfoContentById()


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
    initPageContent();
}


// --------------------
// 1st-level-functions:
// --------------------

// viewDefaultBtnById()
// showCurrentContent() --> see above
// initPageContent(defaultBtnId)

// resetSVGHvr()
// currentNavView() --> see above


function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}


function initPageContent() {
    new PageAssigns();
}


function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}