// -----------------
// work.js-functions:
// -----------------

// 1st
// showCurrentContent()

// 2nd
// showHelpContent()

// 3rd
// showInfoContentById()


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