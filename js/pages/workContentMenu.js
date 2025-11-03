// --------------------
// 1st-level-functions:
// --------------------


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
// currentNavView() --> workContent.js


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