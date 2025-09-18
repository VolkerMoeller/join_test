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
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView() --> main.js
// navigationView() --> info.js