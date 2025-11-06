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