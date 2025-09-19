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
    showLeftMenu();
}


function returnToLogIn() {
    window.close();
    saveLocalStorageObject('userStatus', 'external');
}


function setMenuIcnHvrClrSVG(icnId1, icnId2) {
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


function resetMenuIcnHvrClrSVG(icnId1, icnId2) {
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


// --------------------
// 1st-level-functions:
// --------------------


// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()
// showLeftMenu()

// saveLocalStorageObject() --> main.js


function defaultHeaderView() {
    let userStatus = readingUserStatus()
    if (userStatus == 'guest') { guestHeader(); }
    if (userStatus == 'user') { userHeader(); }
}


function showLeftMenu() {
    setTimeout(() => {
        document.getElementById('left-menu').classList.remove('display-none');
    }, 10);
}


// --------------------
// 2nd-level-functions:
// --------------------

// readingUserStatus() --> main.js
// guestHeader()
// userHeader()


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