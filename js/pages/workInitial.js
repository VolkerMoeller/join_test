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

    const errors = await safeBatch(setupSteps);

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
// #region SVG Hover Color Control – for the main menu btns

// -----------------------
// SVG Hover Color Control
// -----------------------

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


// .1st:
// ..
function defaultHeaderView() {
    const userStatus = readingUserStatus && readingUserStatus();
    if (userStatus === 'guest') { guestHeader(); }
    if (userStatus === 'user') { userHeader(); }
}


// .1st:
// ..
function defaultNavView() {
    // Attach buttons
    initMenuButtonEvents();

    // Then set the default view
    safeCall(() => setView('summary'), 'defaultNavView → setView(summary)');
}



// .1st:
// ..
async function genHvrBtns() {
    const btnMap = {
        btnBackHelp: {
            icnId: 'bntBack4',
            handler: showCurrentContent
        },
        btnBackLegal: {
            icnId: 'bntBack6',
            handler: showCurrentContent
        },
        btnBackPrivacy: {
            icnId: 'bntBack5',
            handler: showCurrentContent
        }
    };

    // 1. Phase: Buttons als HTML einsetzen
    for (const [containerId, spec] of Object.entries(btnMap)) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container "${containerId}" not found`);
            continue;
        }
        container.innerHTML = genHTMLHvrBtn(spec.icnId);
    }

    // SVG/HTML-Includes laden
    await includeHTMLById('w3-include-hvr-btn');

    // 2. Phase: Events für Hover + Click setzen
    for (const [, spec] of Object.entries(btnMap)) {
        const normalBtn = document.getElementById(spec.icnId);
        const hoverBtn = document.getElementById(`${spec.icnId}Hvr`);

        if (!normalBtn || !hoverBtn) {
            console.warn(`Buttons for iconId "${spec.icnId}" not found`);
            continue;
        }

        const showHover = () => {
            normalBtn.classList.add('display-none');
            hoverBtn.classList.remove('display-none');
        };

        const showNormal = () => {
            hoverBtn.classList.add('display-none');
            normalBtn.classList.remove('display-none');
        };

        normalBtn.addEventListener('mouseenter', showHover);
        hoverBtn.addEventListener('mouseleave', showNormal);

        const handleClick = event => {
            event.preventDefault();
            spec.handler();
        };

        normalBtn.addEventListener('click', handleClick);
        hoverBtn.addEventListener('click', handleClick);
    }
}


// .1st:
// ..
function genBtnUser() {
    let currentUser = loadLocalStorageObject('currentUser');
    document.getElementById('btnUser').innerHTML = '';
    document.getElementById('btnUser').innerHTML = genHTMLBtnUser(currentUser['initial']);
}


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