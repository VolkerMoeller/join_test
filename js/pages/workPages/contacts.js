// ----------------------
// contacts.js-functions:
// ----------------------

// 1st 
// genContactsListBtn()


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

function initClickedContactBtn(indexBtn) {
    let currentClickedBtn = document.querySelector('.contacts-list-btn-clicked');
    let currentClickedBtnId;
    if (currentClickedBtn) {
        currentClickedBtnId = currentClickedBtn['id'];
    }
    let contactBtns = document.querySelectorAll('.contacts-list-btn');
    contactBtns.forEach(contact => {
        contact.classList.remove('contacts-list-btn-clicked');
    });
    let btnId = 'contactsListBtn' + indexBtn;
    document.getElementById(btnId).classList.add('contacts-list-btn-clicked');
    if (btnId == currentClickedBtnId) {
        document.getElementById(btnId).classList.remove('contacts-list-btn-clicked');
    }
}


// --------------------
// 1st-level-functions:
// --------------------

// .1st
// getIndexTab()

// .2nd
// checkState()


function getIndexTab(contact) {
    let initial = contact['initial'];
    let indexTab = initial.substring(0, 1);
    return indexTab;
}


function getIndexTabs(indexTab, indexTabs) {
    indexTabs.push(indexTab);
    return indexTab;

}

function checkState(i, indexTabs) {
    let state = 'display';
    if (i > 0) {
        if (indexTabs[i - 1] == indexTabs[i]) {
            state = 'display-none';
        }
    }
    return state;

}