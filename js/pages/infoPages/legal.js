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
}


function switchToPrivacyPage() {
    window.location.href = 'privacy.html';
    history.replaceState({}, '', 'legal.html');
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


function setNavBtnMblSelected() {
    let navBtnMbl = document.getElementById('txtBtnLegalMbl');
    navBtnMbl.disabled = true;
    navBtnMbl.classList.remove('txt-btn-btm');
    navBtnMbl.classList.add('txt-btn-btm-selected');
}