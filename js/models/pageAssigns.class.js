class PageAssigns {

    constructor() {
        this.initSumContent();
        this.initAddContent();
        this.initBoardContent();
        this.initContactsContent();
    }


    initSumContent() {
        scrollElementToTop('mainCenterSum');
        updateSumContent();
        initSumView();
    }


    initAddContent() {
        scrollElementToTop('mainCenterAdd');
        genUserContactList();
        genContactBadges();
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