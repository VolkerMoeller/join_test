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
// viewDefaultContent()


// 1st:
/**
 * Switches the application to a specific logical view (e.g. "summary", "board", "contacts", "help").
 *
 * Responsibilities:
 *  - Activates the correct navigation button (desktop and mobile).
 *  - Hides all other content sections.
 *  - Displays the content section associated with the selected view.
 *
 * Behavior:
 *  - If the view has no assigned navigation buttons (e.g. help/info views),
 *    navigation styles are reset but content still switches correctly.
 *  - Invalid or unknown view names produce a warning and stop the process safely.
 *
 * @param {string} viewName - The name of the view to activate.
 * @returns {void}
 */
function setView(viewName) {
    const config = VIEW_CONFIG[viewName];

    if (!config) {
        console.warn(`setView: unknown view "${viewName}"`);
        return;
    }

    if (config.desktopBtnId) {
        currentNavView(config.desktopBtnId);
    } else {
        resetNavigationView();
        resetNavigationViewMbl();
        showLeftAndBottomMenu();
    }

    hideAllWorkContent();

    const content = document.getElementById(config.contentId);
    if (!content) {
        console.warn(
            `setView: content element "${config.contentId}" for view "${viewName}" not found`
        );
        return;
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
function currentNavView(currentBtnId) {
    let twinBtn = getTheButtonTwin(currentBtnId);
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById(currentBtnId);
    setCurrentBtnById(twinBtn);
    showLeftAndBottomMenu();
}

// 6th
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
function showLeftAndBottomMenu() {
    setTimeout(() => {
        document.getElementById('left-menu').classList.remove('display-none');
        document.getElementById('btm-menu').classList.remove('display-none');
    }, 10);
}


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



// --------------------
// 2nd-level-functions:
// --------------------

// 5th
// ...
// resetSVGHvr()
// currentNavView() --> workContent.js


// 5th:
// ...
// function resetSVGHvr() {
//     let svgIcons = document.querySelectorAll('.menu-icon-hvr');
//     svgIcons.forEach(svgIcon => {
//         svgIcon.classList.remove('menu-icon-hvr');
//         svgIcon.classList.add('menu-icon');
//     });
// }