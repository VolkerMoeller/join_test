// -----------------
// work.js-functions:
// -----------------

// 1st
// showCurrentContent()

// 2nd
// showHelpContent()

// 3rd
// showInfoContentById()

// 4th
// currentNavView()

// 5th
// viewDefaultContent()


// 1st:
function showCurrentContent() {
    hideAllWorkContent();
    let selectedMenuBtn = getSelectedMenuBtn();
    let selectedMenuBtnId = selectedMenuBtn.getAttribute('id');
    let currentCntId = provideCurrentContentId(selectedMenuBtnId);
    document.getElementById(currentCntId).classList.remove('display-none');
}


// 2nd:
function showHelpContent() {
    hideAllWorkContent();
    document.getElementById('cntCenterHelp').classList.remove('display-none');
}


// 3rd:
function showInfoContentById(cntId) {
    resetNavigationView();
    hideAllWorkContent();
    document.getElementById(cntId).classList.remove('display-none');
    setTxtBtnInfoById(cntId);
}


// 4th:
function currentNavView(currentBtnId) {
    let twinBtn = getTheButtonTwin(currentBtnId);
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById(currentBtnId);
    setCurrentBtnById(twinBtn);
    showLeftAndBottomMenu();
}

// 5th
function viewDefaultContent(defaultBtnId) {
    viewDefaultBtnById(defaultBtnId);
    showCurrentContent();
    initPageContent();
}


// --------------------
// 1st-level-functions:
// --------------------


// 1st
// ..
// hideAllWorkContent()
// getSelectedMenuBtn()
// provideCurrentContentId()

// 2nd
// ..
// hideAllWorkContent() --> see above

// 3rd
// ..
// resetNavigationView() --> main.js
// hideAllWorkContent() --> see above
// setTxtBtnInfoById()

// 4th
// ..
// getTheButtonTwin() --> workInitial.js
// resetNavigationView() --> main.js
// resetNavigationViewMbl() --> main.js
// setCurrentBtnById() --> workInitial.js
// setCurrentBtnById() --> workInitial.js
// showLeftAndBottomMenu()

// 5th
// ..
// viewDefaultBtnById()
// showCurrentContent() --> see above
// initPageContent()

// 6th
// ..
// resetSVGHvr()
// currentNavView() --> workContent.js


// 1st:
// ..
function hideAllWorkContent() {
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.add('display-none');
    });
}


// 1st:
// ..
function getSelectedMenuBtn() {
    let selectedMenuBtn = document.querySelector('.menu-btn-hvr-selected');
    if (!selectedMenuBtn) {
        selectedMenuBtn = document.querySelector('.menu-btn-hvr-mbl-selected');
    }
    return selectedMenuBtn;
}


// 1st:
// ..
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


// 3rd:
// ..
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


// 4th:
// ..
function showLeftAndBottomMenu() {
    setTimeout(() => {
        document.getElementById('left-menu').classList.remove('display-none');
        document.getElementById('btm-menu').classList.remove('display-none');
    }, 10);
}


// 5th:
// ..
function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}


// 5th:
// ..
function initPageContent() {
    new PageAssigns();
}


// 6th:
// ..
function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}


// --------------------
// 2nd-level-functions:
// --------------------

// 5th
// ...
// resetSVGHvr()
// currentNavView() --> workContent.js


// 5th:
// ...
function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}