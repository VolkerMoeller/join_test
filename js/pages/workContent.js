const VIEW_CONFIG = {
    summary: {
        desktopBtnId: 'mnuBtn2nd',
        mobileBtnId: 'mnuBtnMbl2nd',
        contentId: 'cntCenterSum'
    },
    add: {
        desktopBtnId: 'mnuBtn3rd',
        mobileBtnId: 'mnuBtnMbl3rd',
        contentId: 'cntCenterAdd'
    },
    board: {
        desktopBtnId: 'mnuBtn4th',
        mobileBtnId: 'mnuBtnMbl4th',
        contentId: 'cntCenterBoard'
    },
    contacts: {
        desktopBtnId: 'mnuBtn5th',
        mobileBtnId: 'mnuBtnMbl5th',
        contentId: 'cntCenterContacts'
    },
    help: {
        desktopBtnId: null,              // no menu button
        mobileBtnId: null,
        contentId: 'cntCenterHelp'
    }
    // later possibly legal, privacy, etc.
};


const LOGIN_NAV_BTN_ID = 'mnuBtn1st';
const SUMMARY_NAV_BTN_ID = 'mnuBtn2nd';
const ADDTASK_NAV_BTN_ID = 'mnuBtn3rd';
const BOARD_NAV_BTN_ID = 'mnuBtn4th';
const CONTACTS_NAV_BTN_ID = 'mnuBtn5th';


// -----------------
// work.js-functions:
// -----------------


// 1st
// setView(viewName)

// 2nd
// showCurrentContent()

// 3rd
// showHelpContent()

// 4th
// showInfoContentById()

// 5th
// currentNavView()

// 6th
// initMenuButtonEvents()

// 7th
// viewDefaultContent()


// 1st:
/**
 * Switches the application to a specific logical view (e.g. "summary", "board", "contacts", "help").
 *
 * Responsibilities:
 *  - Delegates navigation update to a dedicated helper.
 *  - Hides all other content sections and shows the selected one.
 *  - Wraps the whole process in a try/catch to avoid hard failures.
 *
 * @param {string} viewName - The name of the view to activate.
 * @returns {void}
 */
function setView(viewName) {
    try {
        const config = VIEW_CONFIG[viewName];

        if (!config) {
            throw new Error(`Unknown view "${viewName}"`);
        }

        updateNavigationForView(viewName, config);
        updateContentForView(viewName, config);
    } catch (error) {
        logViewError(viewName, error);
    }
}

/**
 * Updates navigation state based on the provided view configuration.
 *
 * @param {string} viewName
 * @param {{desktopBtnId: (string|null), mobileBtnId: (string|null)}} config
 * @returns {void}
 */
function updateNavigationForView(viewName, config) {
    const hasNavButtons = !!config.desktopBtnId || !!config.mobileBtnId;

    if (!hasNavButtons) {
        // Views wie "help", "legal", etc. ohne Menü-Button
        resetNavigationView();
        resetNavigationViewMbl();
        showLeftAndBottomMenu();
        return;
    }

    // Program-controlled call: Prefer desktop as primary button,
    // otherwise mobile as a fallback.
    const primaryBtnId = config.desktopBtnId || config.mobileBtnId;
    const twinBtnId = config.mobileBtnId && config.desktopBtnId
        ? config.mobileBtnId
        : null;

    currentNavView(primaryBtnId, twinBtnId);
}


/**
 * Updates the visible content area for the given view.
 *
 * @param {string} viewName
 * @param {{contentId: string}} config
 * @returns {void}
 */
function updateContentForView(viewName, config) {
    hideAllWorkContent();

    const content = document.getElementById(config.contentId);
    if (!content) {
        throw new Error(
            `Content element "${config.contentId}" for view "${viewName}" not found`
        );
    }

    content.classList.remove('display-none');
}




// 2nd:
/**
 * Displays the content section that corresponds to the currently selected
 * navigation button.
 *
 * Workflow:
 *  1. Hides all content sections.
 *  2. Retrieves the currently active navigation button (desktop or mobile).
 *  3. Resolves the content ID associated with that button.
 *  4. Displays the correct content section.
 *
 * Defensive behavior:
 *  - If no active button is found, a warning is logged and the function stops.
 *  - If the button has no ID or the mapping fails, warnings are shown.
 *  - If the target content element does not exist in the DOM, the function exits safely.
 *
 * @returns {void}
 */
function showCurrentContent() {
    const selectedMenuBtn = getSelectedMenuBtn();
    if (!selectedMenuBtn) {
        console.warn('showCurrentContent: no selected menu button found');
        return;
    }

    const id = selectedMenuBtn.id; // z.B. "mnuBtn2nd" oder "mnuBtnMbl4th"
    const normalizedId = id.replace('Mbl', ''); // mnuBtnMbl2nd -> mnuBtn2nd

    const menuToView = {
        mnuBtn2nd: 'summary',
        mnuBtn3rd: 'add',
        mnuBtn4th: 'board',
        mnuBtn5th: 'contacts'
    };

    const viewName = menuToView[normalizedId];

    if (!viewName) {
        console.warn(`showCurrentContent: no view mapped for menu id "${id}"`);
        return;
    }

    setView(viewName);
}




// 3rd:
function showHelpContent() {
    hideAllWorkContent();
    document.getElementById('cntCenterHelp').classList.remove('display-none');
}


// 4th:
function showInfoContentById(cntId) {
    resetNavigationView();
    hideAllWorkContent();
    document.getElementById(cntId).classList.remove('display-none');
    setTxtBtnInfoById(cntId);
}


// 5th
/**
 * Updates the navigation state when a menu button is activated.
 *
 * Responsibilities:
 *  - Resets desktop and mobile navigation styles.
 *  - Marks the given button and its "twin" (desktop/mobile counterpart) as selected.
 *  - Ensures that the left and bottom navigation menus are visible.
 *
 * Defensive behavior:
 *  - If neither primary nor twin ID are provided, a warning is logged.
 *  - If the primary button cannot be resolved, a warning is logged and the function exits safely.
 *  - If no twin button can be resolved, only the primary button is updated, and a warning is logged.
 *
 * @param {string} currentBtnId - The ID of the navigation button that was activated (desktop or mobile).
 * @param {string} [twinBtnId] - Optional explicit twin button ID (desktop/mobile counterpart).
 * @returns {void}
 */
function currentNavView(currentBtnId, twinBtnId) {
    if (!currentBtnId && !twinBtnId) {
        console.warn('currentNavView: both currentBtnId and twinBtnId are missing');
        return;
    }

    const primaryId = currentBtnId || twinBtnId;
    const primaryBtn = primaryId ? document.getElementById(primaryId) : null;

    if (!primaryBtn) {
        console.warn(
            `currentNavView: primary button with id "${primaryId}" not found`
        );
        return;
    }

    let resolvedTwinId = twinBtnId;
    if (!resolvedTwinId) {
        resolvedTwinId = getTheButtonTwin(primaryId);
        if (!resolvedTwinId) {
            console.warn(
                `currentNavView: no twin button id found for "${primaryId}"`
            );
        }
    }

    // Reset all navigation buttons (desktop + mobile)
    resetNavigationView();
    resetNavigationViewMbl();

    // Activate the primary button
    setCurrentBtnById(primaryId);

    // Activate twin button if available
    if (resolvedTwinId) {
        setCurrentBtnById(resolvedTwinId);
    }

    // Ensure nav UI is visible
    showLeftAndBottomMenu();
}



// 6th
/**
 * Attaches click handlers to all desktop and mobile menu buttons.
 *
 * - For login buttons (1st), it calls returnToLogIn().
 * - For all other menu buttons, it calls viewDefaultContent(id),
 *   so navigation state and content are updated consistently.
 */
function initMenuButtonEvents() {
    const menuButtons = document.querySelectorAll('.menu-btn-hvr, .menu-btn-hvr-mbl');

    menuButtons.forEach(btn => {
        if (btn.dataset.menuBound === 'true') return;

        btn.dataset.menuBound = 'true';

        btn.addEventListener('click', event => {
            event.preventDefault();

            const id = btn.id;
            if (!id) {
                console.warn('initMenuButtonEvents: menu button without id', btn);
                return;
            }

            // Special case: Login-Button
            if (id === 'mnuBtn1st' || id === 'mnuBtnMbl1st') {
                returnToLogIn();
                return;
            }

            // Standard case: Summary/Add/Board/Contacts etc.
            viewDefaultContent(id);
        });
    });
}


// 7th
/**
 * Resets the work view to a default state based on a given
 * navigation button ID.
 *
 * Steps:
 *  1. Marks the given button as the default active navigation button.
 *  2. Shows the content that corresponds to the currently selected button.
 *  3. Re-initializes page-specific logic via initPageContent().
 *
 * If no default button ID is provided, the function logs a warning
 * and exits safely.
 *
 * @param {string} defaultBtnId - The ID of the navigation button to use as default.
 * @returns {void}
 */
function viewDefaultContent(defaultBtnId) {
    if (!defaultBtnId) {
        console.warn('viewDefaultContent: no defaultBtnId provided');
        return;
    }

    // 1. Mark the default nav button (your existing helper)
    viewDefaultBtnById(defaultBtnId);

    // 2. Show the content mapped to the currently selected button
    showCurrentContent();

    // 3. Run any page-specific setup (PageAssigns, etc.)
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
/**
 * Hides all work content sections by adding the "display-none" class.
 */
function hideAllWorkContent() {
    const contents = document.querySelectorAll('.content');
    contents.forEach(el => el.classList.add('display-none'));
}



// 1st:
// ..
/**
 * Returns the currently selected navigation button (desktop or mobile).
 *
 * @returns {HTMLElement|null} The selected button or null if none is active.
 */
function getSelectedMenuBtn() {
    return (
        document.querySelector('.menu-btn-hvr-selected') ||
        document.querySelector('.menu-btn-hvr-mbl-selected') ||
        null
    );
}


// 1st:
// ..
/**
 * Maps a navigation button ID to its corresponding content section ID.
 *
 * @param {string} menuBtnId - The ID of the selected menu button.
 * @returns {string|null} The corresponding content ID or null if not found.
 */
function provideCurrentContentId(menuBtnId) {
    if (!menuBtnId) {
        console.warn('provideCurrentContentId: no menuBtnId provided');
        return null;
    }

    const map = {
        mnuBtn2nd: 'cntCenterSum',
        mnuBtnMbl2nd: 'cntCenterSum',
        mnuBtn3rd: 'cntCenterAdd',
        mnuBtnMbl3rd: 'cntCenterAdd',
        mnuBtn4th: 'cntCenterBoard',
        mnuBtnMbl4th: 'cntCenterBoard',
        mnuBtn5th: 'cntCenterContacts',
        mnuBtnMbl5th: 'cntCenterContacts'
    };

    const contentId = map[menuBtnId];

    if (!contentId) {
        console.warn(`provideCurrentContentId: no matching content for "${menuBtnId}"`);
        return null;
    }

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





// 5th:
// ..
// function viewDefaultBtnById(defaultBtnId) {
//     resetSVGHvr();
//     currentNavView(defaultBtnId);
// }

/**
 * Marks a navigation button (and its mobile twin) as the default active button.
 *
 * Steps:
 *  1. Reset all SVG hover icons (so no button appears hovered on page load).
 *  2. Validate the given button ID.
 *  3. Delegate to `currentNavView(defaultBtnId)` to:
 *      - reset desktop & mobile navigation
 *      - apply "selected" classes
 *      - ensure correct menu visibility
 *
 * @param {string} defaultBtnId - The ID of the navigation button to activate as default.
 * @returns {void}
 */
function viewDefaultBtnById(defaultBtnId) {
    // 1. Always reset SVG hover state.
    resetSVGHvr();

    // 2. Defensive: missing ID
    if (!defaultBtnId) {
        console.warn('viewDefaultBtnById: defaultBtnId is missing');
        return;
    }

    // 3. Defensive: check if button exists
    const btn = document.getElementById(defaultBtnId);
    if (!btn) {
        console.warn(`viewDefaultBtnById: element "${defaultBtnId}" not found`);
        return;
    }

    // 4. Hand over to your central navigation handling
    currentNavView(defaultBtnId);
}



// 5th:
// ..
function initPageContent() {
    new PageAssigns();
}


// 6th:
// ..
// function resetSVGHvr() {
//     let svgIcons = document.querySelectorAll('.menu-icon-hvr');
//     svgIcons.forEach(svgIcon => {
//         svgIcon.classList.remove('menu-icon-hvr');
//         svgIcon.classList.add('menu-icon');
//     });
// }

/**
 * Resets all SVG hover icons to their non-hover state.
 *
 * @returns {void}
 */
function resetSVGHvr() {
    const icons = document.querySelectorAll('.menu-icon-hvr');
    if (!icons.length) return;

    icons.forEach(icon => {
        icon.classList.remove('menu-icon-hvr');
        icon.classList.add('menu-icon');
    });
}