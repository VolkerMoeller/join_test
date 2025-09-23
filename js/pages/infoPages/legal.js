// -------------------
// legal.js-functions:
// -------------------

// initLegal()

async function initLegal() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    navigationView();
    setNavBtnMblSelected();
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