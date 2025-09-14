// -------------------
// info.js-functions:
// -------------------

// externalView()

function externalView() {
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
};