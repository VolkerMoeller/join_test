/** @type {PageAssigns|null} */
let pageAssigns = null;

/**
 * @typedef {Object} ViewConfig
 * @property {string|null} desktopBtnId - ID of the desktop navigation button for this view, or null if none.
 * @property {string|null} mobileBtnId - ID of the mobile navigation button for this view, or null if none.
 * @property {string} contentId - ID of the main content container for this view.
 * @property {string|null} scrollTarget - ID of the element that should be scrolled to top when entering the view, or null.
 * @property {boolean} nav - Whether the main navigation bar should be visible for this view.
 * @property {Function} [pageAssign] - Function that is executed once to initialize this view.
 */

/**
 * Central configuration for all views.
 * Static facts per view, not runtime state.
 * @type {Record<string, ViewConfig>}
 */
const VIEW_CONFIG = {
    summary: {
        desktopBtnId: 'mnuBtn2nd',
        mobileBtnId: 'mnuBtnMbl2nd',
        contentId: 'cntCenterSum',
        scrollTarget: null,
        nav: true,
        pageAssign: initSummaryOnce
    },
    add: {
        desktopBtnId: 'mnuBtn3rd',
        mobileBtnId: 'mnuBtnMbl3rd',
        contentId: 'cntCenterAdd',
        scrollTarget: 'formInputsFrameContainer',
        nav: true,
        pageAssign: initAddTaskOnce
    },
    board: {
        desktopBtnId: 'mnuBtn4th',
        mobileBtnId: 'mnuBtnMbl4th',
        contentId: 'cntCenterBoard',
        scrollTarget: null,
        nav: true,
        pageAssign: initBoardOnce
    },
    contacts: {
        desktopBtnId: 'mnuBtn5th',
        mobileBtnId: 'mnuBtnMbl5th',
        contentId: 'cntCenterContacts',
        scrollTarget: 'contactsList',
        nav: true,
        pageAssign: initContactsOnce
    },
    help: {
        desktopBtnId: null,
        mobileBtnId: null,
        contentId: 'cntCenterHelp',
        scrollTarget: 'cntCenterHelp',
        nav: false,
        pageAssign: initHelpOnce
    },
    legal: {
        desktopBtnId: null,
        mobileBtnId: null,
        contentId: 'cntCenterLegal',
        scrollTarget: 'cntCenterLegal',
        nav: false,
        pageAssign: initLegalOnce
    },
    privacy: {
        desktopBtnId: null,
        mobileBtnId: null,
        contentId: 'cntCenterPrivacy',
        scrollTarget: 'cntCenterPrivacy',
        nav: false,
        pageAssign: initPrivacyOnce
    }
};

/**
 * Hält den Laufzeit-Zustand pro View.
 * initialized: wurde pageAssign schon ausgeführt?
 * Weitere Felder können später ergänzt werden (z.B. lastSelectedContactId).
 * @type {Record<string, { initialized: boolean }>}
 */
const VIEW_STATE = {};

const BOARD_NAV_BTN_ID = 'mnuBtn4th';



/**
 * One-time initialization for the "add" view.
 * - Builds the add task form DOM structure.
 * - Wires all event listeners that belong to the add view.
 *
 * Called at most once via ensureInitialized('add').
 */
async function initAddTaskOnce() {
    // 1. Build the main form inside the content container
    await genAddTaskForm(); // creates #formAddTask and all its children

    // 2. Wire up event listeners for this view
    wireAddViewEvents();

    // 3. Optional: initial contacts/badges on first load
    await genUserContactList();
    await genContactBadges();
}


function initSummaryOnce() {
    updateSumContent();
    initSumView();
}
function initBoardOnce() { }
function initContactsOnce() {
    genContactsListBtn();
    showResponsiveView();
}
function initHelpOnce() { }
function initLegalOnce() { }
function initPrivacyOnce() { }


/**
 * Attaches all event listeners for the "add" view.
 * Called only once from initAddTaskOnce().
 */
function wireAddViewEvents() {
    const form = document.getElementById('formAddTask');
    if (!form) return;

    // --- 1) Submit: the single source of truth for creating a task ---
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Collect form state FIRST (your existing logic)
        getFormInputData();

        // Then create the task (your existing logic)
        await initCreateNewTask();
    });

    // --- 2) Input validation / enabling submit button ---
    // Replace inline onkeyup="enableBtnIfFormFilled()"
    form.addEventListener('input', (event) => {
        const id = event.target?.id;
        if (id === 'title' || id === 'dueDate' || id === 'category') {
            enableBtnIfFormFilled();
        }
        if (id === 'assigned') {
            searchContactsByInput();
            enableBtnIfFormFilled();
        }
    });

    // --- 3) Focus-based behaviors (bubbling focusin) ---
    // Replace inline onfocus / onclick on inputs
    form.addEventListener('focusin', (event) => {
        const id = event.target?.id;

        if (id === 'assigned') {
            initFocusInputSelect('assigned');
        }
        if (id === 'category') {
            initFocusInputSelect('category');
        }
        if (id === 'subtask') {
            initShowSubtaskPanel('subtask');
        }
    });

    // --- 4) Click handling via delegation (icons, dropdowns, subtask panel, clear, etc.) ---
    form.addEventListener('click', (event) => {
        const t = event.target;

        // Due date icon: <div class="input-container-icon" onclick="focusInput('dueDate')">
        if (t.closest('.input-container-icon')?.querySelector('[w3-include-svg-2nd="./assets/img/svgHTML/34-event.html"]')) {
            focusInput('dueDate');
            return;
        }

        // Assigned dropdown open/close (wrappers have ids)
        if (t.closest('#dropDownAssOpen')) {
            openAssignedOverlay();
            return;
        }
        if (t.closest('#dropDownAssClose')) {
            OverlayManager.close('add.assigned');
            return;
        }

        // Category dropdown open/close
        if (t.closest('#dropDownCatOpen')) {
            openCategoryOverlay();
            return;
        }
        if (t.closest('#dropDownCatClose')) {
            OverlayManager.close('add.category');
            return;
        }

        // Subtask panel close
        if (t.closest('#inputSubtaskClose')) {
            OverlayManager.close('add.subtask');
            return;
        }

        // Subtask panel add subtask
        if (t.closest('#inputSubtaskAdd')) {
            initCreateNewSubtask();
            return;
        }

        // Clear button
        if (t.closest('#clearBtnAddTask')) {
            resetFormAddTask();
            return;
        }

        // Removed for now, as addTask does not yet work as a float.
        // Back/close float button
        // if (t.closest('#btnBack5Hvr')) {
        //     endAnimAddTaskFloat();
        //     return;
        // }

        // Open float button via initAnimAddTaskFloat() 
        // - Not yet implemented, partly because the form does not yet function correctly as a float.

    });

    // --- 5) Category selection: radio change ---
    const categoryList = document.getElementById('categoryList');
    if (categoryList) {
        categoryList.addEventListener('change', (event) => {
            const radio = event.target;
            if (radio && radio.name === 'category') {
                handleCategorySelection(radio.value);
                initOnclickDropDownClose('category');
                enableBtnIfFormFilled();
            }
        });
    }

    // --- 6) Assigned contacts list: delegation for dynamically generated buttons ---
    // You generate buttons into #userContactList. Those clicks should be handled here.
    const userContactList = document.getElementById('userContactList');
    if (userContactList) {
        userContactList.addEventListener('click', (event) => {
            const btn = event.target.closest('button[id^="contactListBtn"]');
            if (!btn) return;

            const index = btn.id.replace('contactListBtn', ''); // "0", "1", ...
            const checkedId = `3checked${index}`;
            const defaultId = `5default${index}`;

            // 1) Toggle checkbox visuals (same as inline)
            toggleElements(checkedId, defaultId);

            // 2) Toggle button CSS + checkbox paths/rects
            tglContactListBtnCSS(btn.id);

            // 3) Update badges display
            showClickedBadges();

            // Optional: If you *really* need this side effect:
            // checkIfChecked(defaultId);
        });
    }

}


/**
 * Updates the content of the "add" view.
 * Called on every view change to "add".
 * - Resets the form to a clean state.
 * - Rebuilds contacts and badges.
 */
function updateContentAdd() {
    resetFormAddTask();
}

function updateContentSummary() { }
function updateContentBoard() { }
function updateContentContacts() { }
function updateContentHelp() { }
function updateContentLegal() { }
function updateContentPrivacy() { }

function showMainNavigation() { }
function hideMainNavigation() { }


function openAssignedOverlay() {
    initOnclickDropDownOpen('assigned');

    const container = document.getElementById('assignedContainer');
    const list = document.getElementById('userContactList');

    OverlayManager.open(
        'add.assigned',
        (t) => (container && container.contains(t)) || (list && list.contains(t)),
        closeAssignedDropdown
    );
}


function openCategoryOverlay() {
    initOnclickDropDownOpen('category');

    const container = document.getElementById('categoryContainer');
    const list = document.getElementById('categoryList');

    OverlayManager.open(
        'add.category',
        (t) => (container && container.contains(t)) || (list && list.contains(t)),
        closeCategoryDropdown
    );
}


function openSubtaskPanelOverlay() {
    initShowSubtaskPanel('subtask');

    const subtaskContainer = document.getElementById('inputContainerSubtask');
    const subtaskPanel = document.getElementById('inputSubtaskPanel');

    OverlayManager.open(
        'add.subtask',
        (t) =>
            (subtaskContainer && subtaskContainer.contains(t)) ||
            (subtaskPanel && subtaskPanel.contains(t)),
        () => closeSubtaskInput()
    );
}



/**
 * Central SPA routing function for the JOIN work area.
 *
 * Switches the application to the specified logical view.
 *
 * Responsibilities:
 *  - Validates the view name against VIEW_CONFIG.
 *  - Ensures one-time initialization of the view (via ensureInitialized).
 *  - Updates navigation state (desktop + mobile navigation).
 *  - Updates the main content for the target view.
 *
 * Error handling:
 *  - On unknown view names, throws an Error which is caught locally.
 *  - Wraps the entire routing logic in a try/catch and delegates logging
 *    of unexpected runtime errors to logViewError().
 *
 * @param {string} viewName - Logical view identifier (e.g. "summary", "add", "board", "contacts", "help").
 * @returns {void}
 */
function setView(viewName) {
    try {
        const config = VIEW_CONFIG[viewName];

        if (!config) {
            throw new Error(`Unknown view "${viewName}"`);
        }

        // 1. One-time initialization for this view
        ensureInitialized(viewName);

        // 2. Remember last navigation view (for back button logic)
        rememberLastNavView(viewName, config);

        // 3. Update navigation (desktop + mobile)
        updateNavigation(viewName);

        // 4. Update content (data + DOM)
        updateContent(viewName);

    } catch (error) {
        logViewError(viewName, error);
    }
}


/**
 * Ensures that the given view has been initialized exactly once.
 * If a pageAssign function is configured, it will be executed at most once.
 *
 * @param {string} viewName
 */
function ensureInitialized(viewName) {
    const config = VIEW_CONFIG[viewName];
    if (!config) return;

    const state = (VIEW_STATE[viewName] ??= { initialized: false });

    if (!state.initialized && typeof config.pageAssign === 'function') {
        config.pageAssign();
        state.initialized = true;
    }


}



function updateNavigation(viewName) {
    const config = VIEW_CONFIG[viewName];
    if (!config) return;

    // Vorhandene Logik aus updateNavigationForView hierhin ziehen
    updateNavigationForView(viewName, config);
}


/**
 * Updates the content for the given view.
 * - Switches visible content container based on VIEW_CONFIG[viewName].contentId
 * - Runs view-specific content logic
 * - Resets scroll position
 *
 * @param {string} viewName
 */
function updateContent(viewName) {
    // 1. Switch visible content container
    showContentForView(viewName);

    // 2. Run view-specific content update
    switch (viewName) {
        case 'summary':
            updateContentSummary();
            break;
        case 'add':
            updateContentAdd();
            break;
        case 'board':
            updateContentBoard();
            break;
        case 'contacts':
            updateContentContacts();
            break;
        case 'help':
            updateContentHelp();
            break;
        case 'legal':
            updateContentLegal();
            break;
        case 'privacy':
            updateContentPrivacy();
            break;
        default:
            console.warn(`No updateContent implementation for view: ${viewName}`);
    }

    // 3. Reset scroll
    resetScrollPosition(viewName);
}


/**
 * Resets the scroll position for the configured scroll target of the view.
 *
 * @param {string} viewName
 */
function resetScrollPosition(viewName) {
    const config = VIEW_CONFIG[viewName];
    if (!config || !config.scrollTarget) return;

    // scrollTarget is treated as an element ID
    const target = document.getElementById(config.scrollTarget);
    if (target) {
        target.scrollTop = 0;
    }
}


function rememberLastNavView(viewName, config) {
    const hasNavButtons = !!config.desktopBtnId || !!config.mobileBtnId;
    if (!hasNavButtons) {
        return; // help/legal/privacy should NOT overwrite lastNavViewName
    }
    lastNavViewName = viewName;
}


/**
 * Routes back from an info view (help/legal/privacy) to the last normal
 * navigation view (summary/add/board/contacts).
 *
 * If nothing was noted, it returns to the “summary” view.
 *
 * @returns {void}
 */
function handleBackFromInfoView() {
    const targetView = lastNavViewName || 'summary';
    safeCall(
        () => setView(targetView),
        `setView(${targetView}) from info back button`
    );
}


/**
 * Updates navigation state for the given view configuration.
 *
 * Responsibilities:
 *  - Determines whether the view is associated with navigation buttons.
 *  - For navigable views, activates the primary button and its twin
 *    (desktop + mobile) via currentNavView().
 *  - For non-navigable views (e.g. help/legal overlays), resets navigation
 *    and ensures the menus remain visible.
 *
 * This function does not manipulate content sections; it only deals with
 * navigation styling and visibility.
 *
 * @param {string} viewName - Logical view identifier (for logging/debugging).
 * @param {{desktopBtnId: (string|null), mobileBtnId: (string|null)}} config - Navigation-related view config.
 * @returns {void}
 */
function updateNavigationForView(viewName, config) {
    const hasNavButtons = !!config.desktopBtnId || !!config.mobileBtnId;

    if (!hasNavButtons) {
        // Views such as “Help,” “Legal,” etc. without a menu button
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
 * Updates the visible content section for the given view configuration.
 *
 * Responsibilities:
 *  - Hides all existing work content sections (using hideAllWorkContent()).
 *  - Shows the configured content section.
 *  - Optionally scrolls a configured scrollTarget element to the top.
 *
 * @param {string} viewName
 * @param {{contentId: string, scrollTarget?: string}} config
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

    if (config.scrollTarget) {
        const scrollEl = document.getElementById(config.scrollTarget);
        if (!scrollEl) {
            console.warn(
                `updateContentForView: scrollTarget "${config.scrollTarget}" for view "${viewName}" not found`
            );
        } else {
            scrollElementToTop(config.scrollTarget);
        }
    }
}


/**
 * Shows the content container for the given view
 * and hides all other view content containers.
 *
 * Uses VIEW_CONFIG[viewName].contentId for lookup.
 *
 * @param {string} viewName
 */
function showContentForView(viewName) {
    const targetConfig = VIEW_CONFIG[viewName];
    if (!targetConfig) {
        console.warn(`showContentForView: unknown view "${viewName}"`);
        return;
    }

    const targetContentId = targetConfig.contentId;
    if (!targetContentId) {
        console.warn(`showContentForView: no contentId configured for view "${viewName}"`);
        return;
    }

    // 1. Hide all known content containers
    Object.values(VIEW_CONFIG).forEach(cfg => {
        if (!cfg.contentId) return;

        const el = document.getElementById(cfg.contentId);
        if (!el) return;

        el.classList.add('display-none');
    });

    // 2. Show the target content container
    const targetEl = document.getElementById(targetContentId);
    if (!targetEl) {
        console.warn(`showContentForView: element with id "${targetContentId}" not found`);
        return;
    }

    targetEl.classList.remove('display-none');
}


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


function showHelpContent() {
    hideAllWorkContent();
    document.getElementById('cntCenterHelp').classList.remove('display-none');
}


// function showInfoContentById(cntId) {
//     resetNavigationView();
//     hideAllWorkContent();
//     document.getElementById(cntId).classList.remove('display-none');
//     setTxtBtnInfoById(cntId);
// }


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


/**
 * Attaches click handlers to all desktop and mobile menu buttons.
 *
 * - For login buttons (1st), it calls returnToLogIn().
 * - For all other menu buttons, it resolves the logical view (VIEW_CONFIG)
 *   and calls setView(viewName) in a safeCall wrapper.
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

            // Special case: Login-Buttons
            if (id === 'mnuBtn1st' || id === 'mnuBtnMbl1st') {
                returnToLogIn();
                return;
            }

            const viewName = getViewNameForButtonId(id);
            if (!viewName) {
                console.warn(
                    'initMenuButtonEvents: no view mapped for button id',
                    id
                );
                return;
            }

            safeCall(() => setView(viewName), `setView(${viewName}) from menu click`);
        });
    });
}


/**
 * Legacy helper: switches to the view that belongs to the given button id.
 *
 * Prefer using setView(viewName) directly where possible.
 *
 * @param {string} buttonId
 * @returns {void}
 */
function viewDefaultContent(buttonId) {
    const viewName = getViewNameForButtonId(buttonId);

    if (!viewName) {
        console.warn(
            'viewDefaultContent: no view mapped for button id',
            buttonId
        );
        return;
    }

    safeCall(() => setView(viewName), `setView(${viewName}) from viewDefaultContent`);
}


/**
 * Resolves the logical view name for a given navigation button id.
 *
 * It checks both desktopBtnId and mobileBtnId in VIEW_CONFIG.
 *
 * @param {string} buttonId - The DOM id of the clicked navigation button.
 * @returns {string|null} - The matching view name, or null if none found.
 */
function getViewNameForButtonId(buttonId) {
    if (!buttonId) {
        return null;
    }

    for (const [viewName, config] of Object.entries(VIEW_CONFIG)) {
        if (config.desktopBtnId === buttonId || config.mobileBtnId === buttonId) {
            return viewName;
        }
    }

    return null;
}


/**
 * Hides all work content sections by adding the "display-none" class.
 */
function hideAllWorkContent() {
    const contents = document.querySelectorAll('.content');
    contents.forEach(el => el.classList.add('display-none'));
}


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