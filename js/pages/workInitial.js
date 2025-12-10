// 1st
// initWork()

// 2nd
// returnToLogIn()

// 3rd
// setMenuIcnHvrClrSVG()


/**
 * Initializes the main JOIN work page.
 *
 * Runs a sequence of setup steps (HTML includes, color scheme, navigation,
 * user controls, etc.) using safeCall/safeBatch. Each step is executed
 * independently so that a failure in one does not break the entire page.
 *
 * Logging:
 *  - On full success, logs a single "Initialization successful." message.
 *  - On partial failure, logs a summary warning plus individual step errors.
 *
 * @async
 * @function initWork
 * @returns {Promise<void>} Resolves when all setup steps have finished (successfully or with warnings).
 */
async function initWork() {
    const setupSteps = [
        { fn: includeHTML, label: 'includeHTML' },
        { fn: setClrSchemeInit, label: 'setClrSchemeInit' },
        { fn: invertLogoClr, label: 'invertLogoClr' },
        { fn: initPageContent, label: 'initPageContent' },
        { fn: defaultHeaderView, label: 'defaultHeaderView' },
        { fn: defaultNavView, label: 'defaultNavView' },
        { fn: initHeaderHelpButton, label: 'initHeaderHelpButton' },
        { fn: genHvrBtns, label: 'genHvrBtns' },
        { fn: genBtnUser, label: 'genBtnUser' },
        { fn: initDesktopInfoLinks, label: 'initDesktopInfoLinks' }
    ];

    const errors = await safeBatch(setupSteps);

    if (errors.length > 0) {
        console.warn('Initialization completed with warnings:', errors);
    } else {
        console.log('Initialization successful.');
    }
}


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


function defaultHeaderView() {
    const userStatus = readingUserStatus && readingUserStatus();
    if (userStatus === 'guest') { guestHeader(); }
    if (userStatus === 'user') { userHeader(); }
}


/**
 * Sets up the default navigation state for the work page.
 *
 * Responsibilities:
 *  - Binds navigation event handlers (desktop + mobile).
 *  - Activates the default view (typically "summary") via setView().
 *  - Ensures that the navigation UI (left and bottom menus) is visible.
 *
 * This function should be called once during the initial work page setup
 * (e.g. from initWork) after HTML and PageAssigns have been initialized.
 *
 * @returns {void}
 */
function defaultNavView() {
    // Attach buttons
    initMenuButtonEvents();

    // Then set the default view
    safeCall(() => setView('summary'), 'defaultNavView → setView(summary)');
}


async function genHvrBtns() {
    const btnMap = {
        btnBackHelp: {
            icnId: 'bntBack4',
            handler: handleBackFromInfoView
        },
        btnBackLegal: {
            icnId: 'bntBack6',
            handler: handleBackFromInfoView
        },
        btnBackPrivacy: {
            icnId: 'bntBack5',
            handler: handleBackFromInfoView
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


function genBtnUser() {
    let currentUser = loadLocalStorageObject('currentUser');
    document.getElementById('btnUser').innerHTML = '';
    document.getElementById('btnUser').innerHTML = genHTMLBtnUser(currentUser['initial']);
}


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


/**
 * Initializes the desktop help button in the header.
 *
 * Wires a click handler to both the default and hover buttons so that
 * clicking the help icon always routes to the "help" view.
 *
 * @returns {void}
 */
function initHeaderHelpButton() {
    const btnDefault = document.getElementById('btnHelp1');
    const btnHover = document.getElementById('btnHelp1Hvr');

    if (!btnDefault && !btnHover) {
        console.warn('initHeaderHelpButton: no help buttons found');
        return;
    }

    const handleClick = event => {
        event.preventDefault();
        safeCall(() => setView('help'), 'setView(help) from header');
    };

    if (btnDefault) {
        btnDefault.addEventListener('click', handleClick);
    }
    if (btnHover) {
        btnHover.addEventListener('click', handleClick);
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


/**
 * Wires up click handling for the given small-menu overlay element.
 *
 * @param {HTMLElement} overlay - The overlay root element.
 * @returns {void}
 */
function initSmallMenuEvents(overlay) {
    if (!overlay) {
        console.warn('initSmallMenuEvents: overlay is missing');
        return;
    }

    const menuContainer = overlay.querySelector('.nav-cnt');
    if (!menuContainer) {
        console.warn('initSmallMenuEvents: small menu container not found');
        return;
    }

    // Klick auf den grauen Hintergrund → Menü schließen
    overlay.addEventListener('click', event => {
        if (event.target === overlay) {
            hideSmallMenu();
        }
    });

    // Delegation für Buttons im Menü
    menuContainer.addEventListener('click', event => {
        const linkBtn = event.target.closest('.js-small-menu-link');
        const logoutBtn = event.target.closest('.js-small-menu-logout');

        if (linkBtn) {
            event.preventDefault();
            const viewName = linkBtn.dataset.view;
            if (viewName) {
                hideSmallMenu();
                safeCall(() => setView(viewName), `setView(${viewName}) from small menu`);
            }
            return;
        }

        if (logoutBtn) {
            event.preventDefault();
            hideSmallMenu();
            switchToSignPages();
        }
    });
}


/**
 * Initializes desktop info links (Privacy / Legal) in the left navigation.
 *
 * Each link carries a data-view attribute and will call setView(viewName)
 * when clicked.
 *
 * @returns {void}
 */
function initDesktopInfoLinks() {
    const infoLinks = document.querySelectorAll('.js-info-link[data-view]');

    if (!infoLinks.length) {
        return;
    }

    infoLinks.forEach(link => {
        if (link.dataset.bound === 'true') return;
        link.dataset.bound = 'true';

        link.addEventListener('click', event => {
            event.preventDefault();

            const viewName = link.dataset.view;
            if (!viewName) {
                console.warn('initDesktopInfoLinks: info link without data-view', link);
                return;
            }

            safeCall(
                () => setView(viewName),
                `setView(${viewName}) from desktop info link`
            );
        });
    });
}
