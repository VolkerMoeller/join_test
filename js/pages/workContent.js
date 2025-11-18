// -----------------
// work.js-functions:
// -----------------

// 1st
// showCurrentContent()

// 2nd
// showHelpContent()

// 3rd
// showInfoContentById()

// 4th
// currentNavView()

// 5th
// viewDefaultContent()


// 1st:
/**
 * Shows the currently selected work content.
 *
 * 1. Hides all content sections.
 * 2. Reads the currently selected menu button.
 * 3. Computes the corresponding content id.
 * 4. Shows only that content element.
 *
 * Falls irgendetwas fehlt (Button, ID, Content-Element),
 * wird eine Warnung geloggt und die Funktion bricht sauber ab.
 */
function showCurrentContent() {
    // 1. Alle Work-Content-Bereiche ausblenden
    hideAllWorkContent();

    // 2. Aktuellen Navigations-Button holen
    const selectedMenuBtn = getSelectedMenuBtn();
    if (!selectedMenuBtn) {
        console.warn('showCurrentContent: no selected menu button found');
        return;
    }

    const selectedMenuBtnId = selectedMenuBtn.id;
    if (!selectedMenuBtnId) {
        console.warn('showCurrentContent: selected menu button has no id');
        return;
    }

    // 3. Zu diesem Button die Content-ID bestimmen
    const currentCntId = provideCurrentContentId(selectedMenuBtnId);
    if (!currentCntId) {
        console.warn(
            `showCurrentContent: no content id mapped for menu button "${selectedMenuBtnId}"`
        );
        return;
    }

    // 4. Das entsprechende Content-Element im DOM holen
    const currentContent = document.getElementById(currentCntId);
    if (!currentContent) {
        console.warn(
            `showCurrentContent: content element with id "${currentCntId}" not found`
        );
        return;
    }

    // 5. Nur dieses Element sichtbar machen
    currentContent.classList.remove('display-none');
}



// 2nd:
function showHelpContent() {
    hideAllWorkContent();
    document.getElementById('cntCenterHelp').classList.remove('display-none');
}


// 3rd:
function showInfoContentById(cntId) {
    resetNavigationView();
    hideAllWorkContent();
    document.getElementById(cntId).classList.remove('display-none');
    setTxtBtnInfoById(cntId);
}


// 4th:
function currentNavView(currentBtnId) {
    let twinBtn = getTheButtonTwin(currentBtnId);
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById(currentBtnId);
    setCurrentBtnById(twinBtn);
    showLeftAndBottomMenu();
}

// 5th
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
function viewDefaultBtnById(defaultBtnId) {
    resetSVGHvr();
    currentNavView(defaultBtnId);
}


// 5th:
// ..
function initPageContent() {
    new PageAssigns();
}


// 6th:
// ..
function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
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
function resetSVGHvr() {
    let svgIcons = document.querySelectorAll('.menu-icon-hvr');
    svgIcons.forEach(svgIcon => {
        svgIcon.classList.remove('menu-icon-hvr');
        svgIcon.classList.add('menu-icon');
    });
}