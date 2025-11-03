// --------------------
// 1st-level-functions:
// --------------------

// viewDefaultContent()


function viewDefaultContent(defaultBtnId) {
    viewDefaultBtnById(defaultBtnId);
    showCurrentContent();
    initPageContent();
}


// --------------------
// 1st-level-functions:
// --------------------

// viewDefaultBtnById()
// showCurrentContent() --> see above
// initPageContent(defaultBtnId)

// resetSVGHvr()
// currentNavView() --> see above


function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}


function initPageContent() {
    new PageAssigns();
}


function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}