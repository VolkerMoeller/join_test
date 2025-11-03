// -------------------------
// workContentTop-functions:
// -------------------------

// 1st
// viewDefaultContent()


// 1st:
function viewDefaultContent(defaultBtnId) {
    viewDefaultBtnById(defaultBtnId);
    showCurrentContent();
    initPageContent();
}


// --------------------
// 1st-level-functions:
// --------------------

// 1st
// ..
// viewDefaultBtnById()
// showCurrentContent() --> see above
// initPageContent()


// 1st:
// ..
function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}

// 1st:
// ..
function initPageContent() {
    new PageAssigns();
}


// --------------------
// 2nd-level-functions:
// --------------------

// 1st
// ...
// resetSVGHvr()
// currentNavView() --> workContent.js


// 1st:
// ...
function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}