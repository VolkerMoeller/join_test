/**
 * Handles one-time initialization logic for all work views.
 *
 * Each view (summary, add, board, contacts) has an initialization routine
 * that prepares DOM content, generates lists, resets scroll positions, etc.
 * 
 * PageAssigns ensures that every view is initialized exactly once and only
 * at the moment it is first requested (lazy initialization).
 *
 * Usage:
 *   const assigns = new PageAssigns();
 *   assigns.ensureInitialized('summary');
 */
class PageAssigns {
    constructor() {
        /**
         * Tracks which views have already run their initialization logic.
         * @type {Set<string>}
         */
        this.initializedViews = new Set();
    }

    /**
     *  Ensures that a view is initialized only once
     *
     * @param {string} viewName - Logical view name (e.g. "summary", "add", "board", "contacts").
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
}
