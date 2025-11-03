// --------------------------
// workContentMenu-functions:
// ---------------+----------

// 1st
// showSmallMenu()

// 2nd
// hideSmallMenu()

// 3rd
// initOvlFrameForAnimMenu()


// 4th
// animSmallMenuFwd()


// 1st:
function showSmallMenu() {
    genSmallMenu();
    animSmallMenu();
}


// 2nd:
function hideSmallMenu() {
    setTimeout(() => {
        resetOverlayV2();
    }, 10);
}


// 3rd:
function initOvlFrameForAnimMenu() {
    let ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.remove('ovl-hide');
    ovlFrame.classList.add('ovl-show-nav');
}


// 4th:
function animSmallMenuFwd() {
    let smallNav = document.querySelector('.nav-cnt');
    smallNav.classList.remove('display-none');
    smallNav.classList.remove('from-left-out-off-sight');
    smallNav.classList.add('from-top-right-into-view');
}


// --------------------
// 1st-level-functions:
// --------------------

// 1st
// ..
// genSmallMenu()
// animSmallMenu()

// 2nd
// ..
// resetOverlay() --> main.js


// 1st:
// ..
function genSmallMenu() {
    document.getElementById('ovlFrame').innerHTML = '';
    document.getElementById('ovlFrame').innerHTML = genHTMLSmallMenu();
}

// 1st:
// ..
function animSmallMenu() {
    initOvlFrameForAnimMenu();
    animSmallMenuFwd();
}


// --------------------
// 2nd-level-functions:
// --------------------

// 1st
// ...
// genHTMLSmallMenu() --> genOvls.js

// 1st
// ...
// initOvlFrameForAnimMenu() --> work.js
// animSmallMenuFwd() --> work.js