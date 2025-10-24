class PageAssigns {

    constructor() {
        this.initSumContent();
        this.initAddContent();
        this.initBoardContent();
        this.initContactsContent();
    }

    initSumContent() {
        updateSumContent();
        scrollElementToTop('mainCenterSum');
    };
    initAddContent() {
        scrollElementToTop('mainCenterAdd');
    };
    initBoardContent() { };
    initContactsContent() { };
};
