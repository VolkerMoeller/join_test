/**
 * Coordinates one-time initialization logic for all work views.
 *
 * This class implements lazy initialization for view-specific content:
 * each view (e.g. "summary", "add", "board", "contacts") is initialized
 * only once, the first time it is requested.
 *
 * Typical responsibilities per view:
 *  - Preparing initial DOM state (scroll, visibility, layout).
 *  - Generating dynamic lists and forms.
 *  - Wiring up view-local event handlers.
 *
 * Usage:
 *   const assigns = new PageAssigns();
 *   assigns.ensureInitialized('summary');
 */
class PageAssigns {
    constructor() {
        /**
          * Tracks which view names have already been initialized.
          * The keys must match the logical view names used in VIEW_CONFIG.
          *
          * @type {Set<string>}
          */
        this.initializedViews = new Set();
    }

    /**
     * Ensures that the specified view runs its initialization logic exactly once.
     *
     * If the view has already been initialized in this session, this method
     * returns immediately without repeating the setup.
     *
     * @param {string} viewName - Logical view identifier (e.g. "summary", "add", "board", "contacts").
     * @returns {void}
     */
    ensureInitialized(viewName) {
        if (!viewName) {
            console.warn('PageAssigns.ensureInitialized: viewName is missing');
            return;
        }

        if (this.initializedViews.has(viewName)) {
            return; // Already initialized → nothing to do
        }

        switch (viewName) {
            case 'summary':
                this.initSumContent();
                break;
            case 'add':
                this.initAddContent();
                break;
            case 'board':
                this.initBoardContent();
                break;
            case 'contacts':
                this.initContactsContent();
                break;
            case 'help':
                this.initHelpContent();
                break;
            default:
                console.warn(
                    `PageAssigns.ensureInitialized: no init handler for view "${viewName}"`
                );
                return;
        }

        this.initializedViews.add(viewName);
    }

    initSumContent() {
        scrollElementToTop('mainCenterSum');
        updateSumContent();
        initSumView();
    }

    initAddContent() {
        genAddTaskForm();
        scrollElementToTop('mainCenterAdd');
        genUserContactList();
        genContactBadges();
        handleMobileBtn();
    }

    initBoardContent() {
        scrollElementToTop('mainCenterBoard');
    }

    initContactsContent() {
        scrollElementToTop('mainCenterContacts');
        genContactsListBtn();
        showResponsiveView();
    }

    /**
     * One-time initialization for the help view.
     *
     * @returns {void}
     */
    initHelpContent() {
        scrollElementToTop('cntCenterHelp');
        // weitere Help-spezifische Initialisierungen hier einbauen
    }
}
