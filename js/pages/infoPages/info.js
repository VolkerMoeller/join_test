// -------------------
// info.js-functions:
// -------------------

// externalView()

function externalView() {
    let userStatus = loadLocalStorageObject('userStatus');
    if (userStatus == 'external') { externalHeader(); }

}


// --------------------
// 2nd-level-functions:
// --------------------

// laodLocalStorageObject() --> main.js
// externalHeader()

function externalHeader() {
    let userBtn = document.querySelector('.housing-header-right');
    userBtn.classList.add('display-none');
};