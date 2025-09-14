// -------------------
// legal.js-functions:
// -------------------

// initLegal()


async function initLegal() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    externalView();
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// externalView()


function externalView() {
    let userStatus = loadLocalStorageObject('userStatus');
    if (userStatus == 'external') { externalHeader(); }

}


// --------------------
// 2nd-level-functions:
// --------------------

// externalHeader()

function externalHeader() {
    let userBtn = document.querySelector('.housing-header-right');
    userBtn.classList.add('display-none');
};