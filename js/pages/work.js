// -----------------
// work.js-functions:
// -----------------

// initWork()
// returnToLogIn()


async function initWork() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
}


function returnToLogIn() {
    window.close();
    saveLocalStorageObject('userStatus', 'external');
}


// --------------------
// 1st-level-functions:
// --------------------


// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()
// saveLocalStorageObject() --> main.js


function defaultHeaderView() {
    let userStatus = loadLocalStorageObject('userStatus');
    // default external:
    if (userStatus == 'external') { externalHeader(); }
    if (userStatus == 'guest') { guestHeader(); }
    if (userStatus == 'user') { userHeader(); }

}


// --------------------
// 2nd-level-functions:
// --------------------

// laodLocalStorageObject() --> main.js
// externalHeader()

function externalHeader() {
    console.log('external Header');
};

function guestHeader() {
    console.log('guest Header');
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.add('display-none');
    document.querySelector('.header-guest-btn').classList.remove('display-none');
};

function userHeader() {
    console.log('user Header');
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

