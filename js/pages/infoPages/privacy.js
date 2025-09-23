// ---------------------
// privacy.js-functions:
// ---------------------

// initPrivacy()
// switchToLegalPage()

async function initPrivacy() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    navigationView();
    setNavBtnMblSelected();
}


function switchToLegalPage() {
    window.location.href = 'legal.html';
    history.replaceState({}, '', 'privacy.html');
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView() --> work.js
// navigationView() --> info.js
// setNavBtnMblSelected()


function setNavBtnMblSelected() {
    let navBtnMbl = document.getElementById('txtBtnPrivacyMbl');
    navBtnMbl.disabled = true;
    navBtnMbl.classList.remove('txt-btn-btm');
    navBtnMbl.classList.add('txt-btn-btm-selected');
}