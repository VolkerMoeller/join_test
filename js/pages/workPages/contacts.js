// ----------------------
// contacts.js-functions:
// ----------------------

// 1st 
// genContactsListBtn()

// 2nd
// initClickedContactBtn()


// 3rd
// showResponsiveView()


// 4th
// toggleContactMobileView()


// 5th
// genFloatingContact()



// 1st 
async function genContactsListBtn() {
    let contacts = await getContactsSort();
    let indexTabs = [];
    document.getElementById('contactsListBtns').innerHTML = '';
    contacts.forEach((contact, i) => {
        let indexTab = getIndexTab(contact);
        indexTabs.push(indexTab);
        let color = contact['color'];
        let initial = contact['initial'];
        let name = contact['name'];
        let mail = contact['eMail'];
        let state = checkState(i, indexTabs);
        if (i > 0)
            document.getElementById('contactsListBtns').innerHTML += genHTMLContactsListBtn(indexTab, color, initial, name, mail, state, i);
    });
}


// 2nd
function initClickedContactBtn(indexBtn) {
    let currentClickedBtnId = getCurrentClickedBtnId();
    unclickAllBtns();
    displayClickedBtn(currentClickedBtnId, indexBtn);
}


// 3rd
function showResponsiveView() {
    let mobileView = checkIfMobileView();
    if (mobileView) {
        document.getElementById('contactsList').classList.remove('display-none');
        document.getElementById('mainCenterContacts').classList.add('display-none');
    } else {
        document.getElementById('contactsList').classList.remove('display-none');
        document.getElementById('mainCenterContacts').classList.remove('display-none');
    }
}


// 4th
function toggleContactMobileView() {

    let mobileView = checkIfMobileView();
    if (mobileView) {
        let contactListShown = document.getElementById('mainCenterContacts').classList.contains('display-none');
        if (contactListShown) {
            document.getElementById('contactsList').classList.add('display-none');
            document.getElementById('mainCenterContacts').classList.remove('display-none');
        } else {
            document.getElementById('contactsList').classList.remove('display-none');
            document.getElementById('mainCenterContacts').classList.add('display-none');
        }
    }
}


// 5th
function genFloatingContact {

}

// --------------------
// 1st-level-functions:
// --------------------

// .1st
// getContactsSort() --> add.js
// getIndexTab()
// checkState()

// .2nd
// getCurrentClickedBtnId()
// unclickAllBtns()
// displayClickedBtn()


// .3rd
// checkIfMobileView() --> main.js


// .1st
// ..
function getIndexTab(contact) {
    let initial = contact['initial'];
    let indexTab = initial.substring(0, 1);
    return indexTab;
}


// .1st
// ..
function checkState(i, indexTabs) {
    let state = 'display';
    if (i > 0) {
        if (indexTabs[i - 1] == indexTabs[i]) {
            state = 'display-none';
        }
    }
    return state;

}


// .2nd
// ..
function getCurrentClickedBtnId() {
    let currentClickedBtnId;
    let currentClickedBtn = document.querySelector('.contacts-list-btn-clicked');
    if (currentClickedBtn) {
        currentClickedBtnId = currentClickedBtn['id'];
    }
    return currentClickedBtnId;
}


// .2nd
// ..
function unclickAllBtns() {
    let contactBtns = document.querySelectorAll('.contacts-list-btn');
    contactBtns.forEach(contact => {
        contact.classList.remove('contacts-list-btn-clicked');
    });
}


// .2nd
// ..
function displayClickedBtn(currentClickedBtnId, indexBtn) {
    let btnId = 'contactsListBtn' + indexBtn;
    document.getElementById(btnId).classList.add('contacts-list-btn-clicked');
    if (btnId == currentClickedBtnId) {
        document.getElementById(btnId).classList.remove('contacts-list-btn-clicked');
    }
}