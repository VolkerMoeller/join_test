/**
 * Handles one-time initialization for the different work views.
 *
 * Each view (summary, add, board, contacts) is initialized only once,
 * the first time it is requested.
 */
class PageAssigns {
    constructor() {
        /**
         * Tracks which views have already been initialized.
         * @type {Set<string>}
         */
        this.initializedViews = new Set();
    }

    /**
     * Ensures that the given view is initialized exactly once.
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
