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

// 6th
// genFloatingAddTask()


// 1st: 
async function genContactsListBtn() {
    let contacts = await getContactsSort();
    let indexTabs = [];
    document.getElementById('contactsListBtns').innerHTML = '';
    contacts.forEach((contact, i) => {
        let contactId = contact['id'];
        let indexTab = getIndexTab(contact);
        indexTabs.push(indexTab);
        let color = contact['color'];
        let initial = contact['initial'];
        let name = contact['name'];
        let mail = contact['eMail'];
        let state = checkState(i, indexTabs);
        if (i > 0)
            document.getElementById('contactsListBtns').innerHTML += genHTMLContactsListBtn(indexTab, color, initial, name, mail, state, i, contactId);
    });
}


// 2nd:
async function initClickedContactBtn(indexBtn, contactId) {
    let justBtnId = 'contactsListBtn' + indexBtn;
    let alreadyBtnId = getAlreadyClickedBtnId();
    console.log('contact: ', contactId);
    console.log('just clicked: ', justBtnId);
    console.log('already clicked: ', alreadyBtnId);

    if (alreadyBtnId !== false) {
        document.getElementById(alreadyBtnId).classList.add('contacts-list-btn');
        document.getElementById(alreadyBtnId).classList.remove('contacts-list-btn-clicked');
    }

    document.getElementById(justBtnId).classList.remove('contacts-list-btn');
    document.getElementById(justBtnId).classList.add('contacts-list-btn-clicked');

    if (justBtnId == alreadyBtnId) {
        if (document.getElementById('floatingContactFrame').innerHTML == '') {
            let contacts = await getContactsSort();
            genFloatingContact(contactId, contacts);
        } else {
            document.getElementById('floatingContactFrame').innerHTML = '';
            document.getElementById(justBtnId).classList.add('contacts-list-btn');
            document.getElementById(justBtnId).classList.remove('contacts-list-btn-clicked');
        }
    } else {
        let contacts = await getContactsSort();
        genFloatingContact(contactId, contacts);
    }

    toggleContactMobileView();
}


// 3rd:
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


// 4th:
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


// 5th:
async function genFloatingContact(contactId, contacts) {
    document.getElementById('floatingContactFrame').innerHTML = '';
    let color = getValueOutOfArrWthObjs(contacts, contactId, 'id', 'color');
    let initial = getValueOutOfArrWthObjs(contacts, contactId, 'id', 'initial');
    let name = getValueOutOfArrWthObjs(contacts, contactId, 'id', 'name');
    let email = getValueOutOfArrWthObjs(contacts, contactId, 'id', 'eMail');
    let phone = getValueOutOfArrWthObjs(contacts, contactId, 'id', 'phone');
    document.getElementById('floatingContactFrame').innerHTML = genHTMLFloatingContact(color, initial, name, email, phone);
    await includeHTMLById('w3-include-svg-2nd');
}


// 6th:
async function genFloatingAddTask() {
    document.getElementById('mainCenterAdd').innerHTML = '';
    document.getElementById('formContactsAddTask').innerHTML = genHTMLFormAddTask('form-add-float', 'footnote-dsk-float', 'form-panel-float');
    await includeHTMLById('w3-include-svg-2nd');
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
function getAlreadyClickedBtnId() {
    let alreadyClickedBtnId;
    let alreadyClickedBtn = document.querySelector('.contacts-list-btn-clicked');
    if (alreadyClickedBtn) {
        alreadyClickedBtnId = alreadyClickedBtn['id'];
    } else { alreadyClickedBtnId = false; }
    return alreadyClickedBtnId;
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
// function displayClickedBtn(currentClickedBtnId, indexBtn) {
//     let btnId = 'contactsListBtn' + indexBtn;
//     document.getElementById(btnId).classList.add('contacts-list-btn-clicked');
//     if (btnId == currentClickedBtnId) {
//         document.getElementById(btnId).classList.remove('contacts-list-btn-clicked');
//     }
// }
function displayClickedBtn(alreadyBtnId, indexBtn) {
    let justBtnId = 'contactsListBtn' + indexBtn;
    // let btnIdAlready = 'contactsListBtn' + currentClickedBtnId;
    console.log(alreadyBtnId);
    console.log(justBtnId);
    if (alreadyBtnId == justBtnId) { console.log('equal') };
    document.getElementById(justBtnId).classList.add('contacts-list-btn-clicked');
    document.getElementById(justBtnId).classList.remove('contacts-list-btn');
    document.getElementById(alreadyBtnId).classList.add('contacts-list-btn');
    document.getElementById(alreadyBtnId).classList.remove('contacts-list-btn-clicked');
    // if (btnId !== currentClickedBtnId) {
    //     document.getElementById(btnId).classList.add('contacts-list-btn-clicked');
    //     document.getElementById(btnId).classList.remove('contacts-list-btn');
    // }
}