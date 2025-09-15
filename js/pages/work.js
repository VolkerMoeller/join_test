// -----------------
// work.js-functions:
// -----------------

// initWork()
// returnToLogIn()


async function initWork() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
}


function returnToLogIn() {
    window.close();
    saveLocalStorageObject('userStatus', 'external');
}

// --------------------
// 1st-level-functions:
// --------------------


// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()


function defaultHeaderView() {
    let userStatus = loadLocalStorageObject('userStatus');
    if (userStatus == 'external') { externalHeader(); }
    if (userStatus == 'user') { userHeader(); }
}


// --------------------
// 2nd-level-functions:
// --------------------

// laodLocalStorageObject() --> main.js
// externalHeader()

function externalHeader() {
    console.log('external Header');
};

function userHeader() {
    console.log('user Header');
    document.querySelector('.housing-header-right').classList.remove('display-none');
};