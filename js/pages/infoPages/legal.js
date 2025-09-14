// -------------------
// legal.js-functions:
// -------------------

// initLegal()


async function initLegal() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    externelView();
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// externelView()


function externelView() {
    let userStatus = loadLocalStorageObject('userStatus');
    if (userStatus) { console.log(userStatus); }
}