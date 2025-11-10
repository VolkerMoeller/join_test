// -----------------
// workInitial.js-functions:
// -----------------

// 1st
// initWork()

// 2nd
// returnToLogIn()

// 3rd
// setMenuIcnHvrClrSVG()


// 1st
/**
 * Initializes the main JOIN workspace.
 *
 * Sequentially runs all required setup functions.
 * If a step fails, the process continues and logs the error.
 *
 * @async
 * @function initWork
 * @returns {Promise<void>} Completes setup and logs results.
 */
async function initWork() {
    const setupSteps = [
        { fn: includeHTML, label: 'includeHTML' },
        { fn: setClrSchemeInit, label: 'setClrSchemeInit' },
        { fn: invertLogoClr, label: 'invertLogoClr' },
        { fn: defaultHeaderView, label: 'defaultHeaderView' },
        { fn: defaultNavView, label: 'defaultNavView' },
        { fn: genHvrBtns, label: 'genHvrBtns' },
        { fn: genBtnUser, label: 'genBtnUser' },
        { fn: initPageContent, label: 'initPageContent' }
    ];

    const errors = [];

    for (const step of setupSteps) {
        const ok = await safeCall(step.fn, step.label);
        if (ok !== true) errors.push(ok);
    }

    if (errors.length > 0) {
        console.warn('Initialization completed with warnings:', errors);
    } else {
        console.log('Initialization successful.');
    }
}


// 2nd:
/**
 * Redirects the user back to the login page.
 *
 * @function returnToLogIn
 * @returns {void} - Navigates the user to the login screen.
 */
function returnToLogIn() {
    window.location.assign('./signPage.html');
    saveLocalStorageObject('userStatus', 'external');
}


// 3rd:
// #region Menü-Icon Hoverfarbe

// ------------------------------
// SVG Hover Color Control
// ------------------------------

/**
 * Toggles the hover color for one or two <path> elements inside a button's SVG.
 * @param {string} btnId   - The button element ID.
 * @param {string} icnId1  - The first SVG <path> element ID.
 * @param {string} icnId2  - The second SVG <path> element ID (optional).
 * @param {boolean} isActive - true = hover color on, false = reset to default.
 */
function toggleMenuIcnHvrClrSVG(btnId, icnId1, icnId2, isActive) {
    const btnEl = document.getElementById(btnId);
    if (!btnEl || btnEl.classList.contains('menu-btn-hvr-selected')) return;

    [icnId1, icnId2].forEach(id => {
        const iconEl = id && document.getElementById(id);
        if (!iconEl) return;

        // Apply or reset hover classes depending on state
        iconEl.classList.toggle('menu-icon-hvr', isActive);
        iconEl.classList.toggle('menu-icon', !isActive);
    });
}

/** Activates hover color (used on mouseenter). */
function setMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
    toggleMenuIcnHvrClrSVG(btnId, icnId1, icnId2, true);
}

/** Resets hover color (used on mouseleave). */
function resetMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
    toggleMenuIcnHvrClrSVG(btnId, icnId1, icnId2, false);
}

// #endregion


// --------------------
// 1st-level-functions:
// --------------------


// .1st
// ..
// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()
// defaultNavView()
// genHvrBtns()
// genBtnUser()
// initPageContent() --> workContent.js

// .2nd
// ..
// saveLocalStorageObject() --> main.js


// .1st:
// ..
function defaultHeaderView() {
    let userStatus = readingUserStatus()
    if (userStatus == 'guest') { guestHeader(); }
    if (userStatus == 'user') { userHeader(); }
}

// .1st:
function defaultHeaderView() {
    const userStatus = readingUserStatus && readingUserStatus();
    if (userStatus === 'guest') { guestHeader(); }
    if (userStatus === 'user') { userHeader(); }
}



// .1st:
// ..
function defaultNavView() {
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById('mnuBtn2nd');
    setCurrentBtnById('mnuBtnMbl2nd');
    showLeftAndBottomMenu();
}


// .1st:
// ..
async function genHvrBtns() {
    let btnRefs = {
        'btnBackHelp': ['bntBack4', 'showCurrentContent()'],
        'btnBackLegal': ['bntBack6', 'showCurrentContent()'],
        'btnBackPrivacy': ['bntBack5', 'showCurrentContent()']
    };
    Object.keys(btnRefs).forEach(element => {
        document.getElementById(element).innerHTML = genHTMLHvrBtn(btnRefs[element][0], btnRefs[element][1]);
    });
    await includeHTMLById('w3-include-hvr-btn');
}


// .1st:
// ..
function genBtnUser() {
    let currentUser = loadLocalStorageObject('currentUser');
    document.getElementById('btnUser').innerHTML = '';
    document.getElementById('btnUser').innerHTML = genHTMLBtnUser(currentUser['initial']);
}


// --------------------
// 2nd-level-functions:
// --------------------

// 1st
// ...
// readingUserStatus() --> main.js
// guestHeader()
// userHeader()

// 1st
// ...
// resetNavigationView() --> main.js
// setCurrentBtnById()
// showLeftAndBottomMenu() --> see above
// getTheButtonTwin()
// resetNavigationView() --> see above
// resetNavigationViewMbl() --> main.js
// setCurrentBtnById() --> see above
// setCurrentBtnById() --> see above
// showLeftAndBottomMenu() --> see above

// 1st
// ...
// genHTMLHvrBtn() --> genHovBtn.js
// includeHTMLById() --> main.js

// 1st
// ...
// getWindowWidth() --> main.js
// genWelcomeDesktop() --> sum.js
// resetOverlayV2() --> main.js
// genWelcomeMobile() --> sum .js
// resetOverlayV2() --> main.js
// loadLocalStorageObject() --> main.js
// toggleGreeting() --> sum.js

// 1st
// ...
// loadLocalStorageObject() --> main.js
// genHTMLBtnUser() --> genHTMLElements.js

// 1st
// ...
// loadLocalStorageObject() --> main.js
// genHTMLSumRectCnt() --> genHTMLElements.js


// 1st:
// ...
function guestHeader() {
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.add('display-none');
    document.querySelector('.header-guest-btn').classList.remove('display-none');
};


// 1st:
// ...
function userHeader() {
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.remove('display-none');
    document.querySelector('.header-guest-btn').classList.add('display-none');
};


// 1st:
// ...
function setCurrentBtnById(defBtnId) {
    let sumNavBtn = document.getElementById(defBtnId);
    if (!sumNavBtn) return;
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


// 1st:
// ...
/**
 * Returns the twin button ID for a given menu button ID.
 *
 * Strategy:
 * 1. If the element declares a twin via `data-twin`, return that value (declarative).
 * 2. Otherwise infer it from naming:
 *    - If ID contains 'Mbl' → remove it.
 *    - Else insert 'Mbl' after 'mnuBtn' (e.g., mnuBtn2nd → mnuBtnMbl2nd).
 *
 * @function getTheButtonTwin
 * @param {string} defBtnId - Source button ID.
 * @returns {string|null} Twin ID, or null if the element is missing.
 */
function getTheButtonTwin(defBtnId) {
    const el = document.getElementById(defBtnId);
    if (!el) return null;

    if (el.dataset?.twin) return el.dataset.twin;

    if (!defBtnId.startsWith('mnuBtn')) {
        console.warn('Unexpected ID format:', defBtnId);
    }

    return defBtnId.includes('Mbl')
        ? defBtnId.replace('Mbl', '')
        : defBtnId.replace(/^mnuBtn/, 'mnuBtnMbl');
}