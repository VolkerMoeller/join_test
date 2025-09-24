// -------------------
// legal.js-functions:
// -------------------

// initLegal()
// switchToPrivacyPage()

async function initLegal() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    navigationView();
    setNavBtnMblSelected();
    setHistoryState();
}


function switchToPrivacyPage() {
    window.location.assign('./privacy.html');
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView() --> main.js
// navigationView() --> info.js
// setNavBtnMblSelected()
// setHistoryState()


function setNavBtnMblSelected() {
    let navBtnMbl = document.getElementById('txtBtnLegalMbl');
    navBtnMbl.disabled = true;
    navBtnMbl.classList.remove('txt-btn-btm');
    navBtnMbl.classList.add('txt-btn-btm-selected');
}


function setHistoryState() {
    history.pushState({}, '', 'signPage.html');
}