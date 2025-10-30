// ----------------------
// contacts.js-functions:
// ----------------------

// 1st 
// genContactsListBtn()


async function genContactsListBtn() {
    let contacts = await getContactsSort();
    console.log(contacts);
    document.getElementById('contactsListBtns').innerHTML = '';
    let indexTab = getIndexTab();
    document.getElementById('contactsListBtns').innerHTML += genHTMLContactsListBtn(indexTab);
}


// --------------------
// 1st-level-functions:
// --------------------

// .1st
// getIndexTab()


function getIndexTab() {
    let indexTab = 'X';

    return indexTab;
}