let blockAssignedOpenOnFocusUntil = 0;

function blockAssignedFocusOpen(ms = 250) {
    blockAssignedOpenOnFocusUntil = Date.now() + ms;
}

function isAssignedFocusOpenBlocked() {
    return Date.now() < blockAssignedOpenOnFocusUntil;
}


function isAssignedOpen() {
    const list = document.getElementById('userContactList');
    return list && list.classList.contains('drop-down-anim');
    // oder: !list.classList.contains('drop-up-anim') je nach deinem CSS
}


function isAssignedDropdownOpen() {
    const list = document.getElementById('userContactList');
    return !!(list && list.classList.contains('drop-down-anim') && !list.classList.contains('drop-up-anim'));
}


function setAssignedIconOpenState(isOpen) {
    if (isOpen) {
        hideElement('dropDownAssignedOpen');
        showElement('dropDownAssignedClose');
    } else {
        showElement('dropDownAssignedOpen');
        hideElement('dropDownAssignedClose');
    }
}


function setCategoryIconOpenState(isOpen) {
    if (isOpen) {
        hideElement('dropDownCategoryOpen');
        showElement('dropDownCategoryClose');
    } else {
        showElement('dropDownCategoryOpen');
        hideElement('dropDownCategoryClose');
    }
}


function setupAddElementsOnTop(inputId) {
    if (inputId == 'assigned') {
        document.getElementById('assignedContainer').classList.add('z-index-4');
    }
    if (inputId == 'category') {
        document.getElementById('categoryContainer').classList.add('z-index-4');
    }
}


function resetAddElementsDefault(inputId) {
    if (inputId == 'assigned') {
        document.getElementById('assignedContainer').classList.remove('z-index-4');
    }
    if (inputId == 'category') {
        document.getElementById('categoryContainer').classList.remove('z-index-4');
    }
}


function closeAssignedDropdown() {
    resetInputAssigned();
    dropDownCloseById('userContactList');
    resetAddElementsDefault('assigned');
    showBadgeList();
    removeDisplayNone();
}

function closeCategoryDropdown() {
    resetInputCategory();
    dropDownCloseById('categoryList');
    resetAddElementsDefault('category');
    enableBtnIfFormFilled();
}


function initFocusInputSelect(inputId) {
    if (inputId == 'assigned') {
        hideBadgeList();
        dropDownOpenById('userContactList');
    }
    if (inputId == 'category') {
        dropDownOpenById('categoryList');
        document.getElementById('technicalTask').focus();
    }
}


function isAssignedDropdownOpen() {
    const closeIcon = document.getElementById('dropDownAssignedClose');
    return closeIcon && !closeIcon.classList.contains('display-none');
}

function isCategoryDropdownOpen() {
    const closeIcon = document.getElementById('dropDownCategoryClose');
    return closeIcon && !closeIcon.classList.contains('display-none');
}


function initOnclickDropDownOpen(inputId) {
    if (inputId === 'assigned') {
        if (isAssignedDropdownOpen()) return; // schon offen -> nichts tun
        hideBadgeList();
        setAssignedIconOpenState(true);
        focusInput('assigned');
        dropDownOpenById('userContactList');
    }

    if (inputId === 'category') {
        if (isCategoryDropdownOpen()) return; // schon offen -> nichts tun
        setCategoryIconOpenState(true);
        dropDownOpenById('categoryList');
    }
}


function initOnclickDropDownClose(inputId) {
    if (inputId == 'assigned') {
        blockAssignedFocusOpen(300); // verhindert sofortiges Re-Open durch Focus
        showBadgeList();
        setAssignedIconOpenState(false);
        emptyInputFieldById(inputId);
        dropDownCloseById('userContactList');
        resetAddElementsDefault(inputId);
        removeDisplayNone();
    }
    if (inputId == 'category') {
        setAssignedIconOpenState(false);
        dropDownCloseById('categoryList');
        resetAddElementsDefault(inputId);
        enableBtnIfFormFilled();
    }
}


// 7th
function tglContactListBtnCSS(id) {
    document.getElementById(id).classList.toggle('contact-list-btn');
    document.getElementById(id).classList.toggle('contact-list-btn-clicked');
    tglCSSCheckBox(id);
}


// 8th
function handleCategorySelection(text) {
    let category = document.getElementById('category');
    category.value = text;
}


// 10th

function showSubtaskPanel() {
    document.getElementById('inputSubtaskPanel').classList.remove('display-none');
}

// 11th

function hideSubtaskPanel() {
    document.getElementById('inputSubtaskPanel').classList.add('display-none');
}

// 12th:
function initShowSubtaskPanel(inputId) {
    showSubtaskPanel();
    scrollElementToBottom('formInputsFrameContainer');
}


// 14th:
function setupSubtasksElementsOnTop() {
    document.getElementById('inputContainerSubtask').classList.add('z-index-4');
}


// 15th:
function closeSubtaskInput() {
    closeInput('subtask');
    hideSubtaskPanel();
    scrollElementToTop('formInputsFrameContainer');
}


// 16th
function initShowSubtaskInput(subtaskId) {
    let subtaskContainerInputId = subtaskId + 'InputContainer';
    let subtaskInputId = subtaskId + 'Input';
    focusInput(subtaskInputId);
    document.getElementById(subtaskContainerInputId).classList.toggle('z-index--1')
    document.getElementById(subtaskContainerInputId).classList.toggle('z-index-1')
}


// 17th
function resetOverlayFrameSubtaskEdit(subtaskId) {
    let editSubtaskId = subtaskId + 'InputContainer';
    // resetOverlayFrame();
    let inputContainer = document.getElementById(editSubtaskId);
    if (inputContainer) {
        inputContainer.classList.remove('z-index-4');
        inputContainer.classList.add('z-index--1');
    }
}


// 19th
function updateCurrentSubtaskId() {
    let currentSubtaskId = loadLocalStorageObject('currentSubtaskId');
    if (!currentSubtaskId) {
        currentSubtaskId = '0';
    } else {
        currentSubtaskId++;
        currentSubtaskId = currentSubtaskId.toString();
    }
    saveLocalStorageObject('currentSubtaskId', currentSubtaskId);
    return currentSubtaskId;
}


// 20th:
function resetFormAddTask() {
    saveLocalStorageObject('currentSubtaskId', '0');
    saveLocalStorageObject('currentSubtaskObj', {});
    document.getElementById('subtaskListText').innerHTML = '';
    document.getElementById('subtaskListInput').innerHTML = '';
    genUserContactList();
    genContactBadges();
    document.getElementById('userContactBadges').classList.add('display-none');
    resetFormById('formAddTask');

}


// 21th
function updateCurrentSubtaskObj(key, value) {
    let currentSubtaskObj = loadLocalStorageObject('currentSubtaskObj');
    if (!currentSubtaskObj) {
        currentSubtaskObj = {};
    } else {
        currentSubtaskObj[key] = value;
    }
    saveLocalStorageObject('currentSubtaskObj', currentSubtaskObj);
}


// 22th
async function rebuildSubtaskList() {
    let currentSubtaskObj = loadLocalStorageObject('currentSubtaskObj');
    if (currentSubtaskObj) {
        document.getElementById('subtaskListText').innerHTML = '';
        document.getElementById('subtaskListInput').innerHTML = '';
        subtaskArrs = Object.entries(currentSubtaskObj);
        subtaskArrs.forEach(subtaskArr => {
            const subtaskId = subtaskArr[0];
            const text = subtaskArr[1];
            document.getElementById('subtaskListText').innerHTML += genHTMLSubtaskListText(subtaskId, text);
            document.getElementById('subtaskListInput').innerHTML += genHTMLSubtaskListInput(subtaskId, text);
        });
    }
    await includeHTMLById('w3-include-svg-2nd');
}


// 23th
function deleteSubtask(subtaskId) {
    let subtaskObj = loadLocalStorageObject('currentSubtaskObj');
    if (subtaskObj) {
        delete subtaskObj[subtaskId];
        saveLocalStorageObject('currentSubtaskObj', subtaskObj);
    }
    rebuildSubtaskList();
}


// 24th
function checkSubtask(subtaskId) {
    let subtaskObj = loadLocalStorageObject('currentSubtaskObj');
    if (subtaskObj) {
        let inputId = subtaskId + 'Input';
        let newText = document.getElementById(inputId).value;
        subtaskObj[subtaskId] = newText;
        saveLocalStorageObject('currentSubtaskObj', subtaskObj);
    }
    rebuildSubtaskList();
}


// 25th
async function genUserContactList() {
    let userContactsSort = await getContactsSort();
    document.getElementById('userContactList').innerHTML = '';
    userContactsSort.forEach((contact, i) => {
        let name = contact['name'];
        let initial = contact['initial'];
        let color = contact['color'];
        let id = contact['id'];
        document.getElementById('userContactList').innerHTML += genHTMLUserContactListBtn(name, initial, i, color, id);
    });
    await includeHTMLById('w3-include-svg-2nd');
}


// 26th
async function genContactBadges() {
    let userContactsSort = await getContactsSort();
    document.getElementById('userContactBadges').innerHTML = '';
    let badgeData = getArrsOfBadgeData(userContactsSort);
    badgeData[0].forEach((color, i) => {
        let initial = badgeData[1][i];
        document.getElementById('userContactBadges').innerHTML += genHTMLContactBadge(i, color, initial);
    });
}


// 27th
function searchContactsByInput() {
    let searchInput = document.getElementById('assigned').value;
    let searchListElements = document.querySelectorAll('.user-contact-list .contact-list-btn');
    if (searchInput) {
        searchListElements.forEach(element => {
            element.classList.add('display-none');
        });
    }
    if (!searchInput) {
        searchListElements.forEach(element => {
            element.classList.remove('display-none');
        });
    }
    searchListElements.forEach(element => {
        let btnId = element['id'].split('contactListBtn')
        btnId = btnId[1];
        let contactNameId = 'contactListName' + btnId;
        let contactName = document.getElementById(contactNameId).innerHTML;
        searchInput = searchInput.toLowerCase();
        contactName = contactName.toLowerCase();
        if (contactName.startsWith(searchInput)) {
            element.classList.remove('display-none');
        }
    });
}

// 28th
async function genAddTaskForm() {
    document.getElementById('mainCenterAdd').innerHTML = '';
    document.getElementById('mainCenterAdd').innerHTML = genHTMLFormAddTask('formAddTask');
    await includeHTMLById('w3-include-svg-2nd');
}


// 29th
function enableBtnIfFormFilled() {
    let formFilled = checkIfFormFilled();
    if (formFilled == true) {
        document.getElementById('submitBtnAddTask').disabled = false;
    }
}



function resetInputAssigned() {
    toggleElements('dropDownAssignedOpen', 'dropDownAssignedClose');
    emptyInputFieldById('assigned');
}


function dropDownCloseById(id) {
    document.getElementById(id).classList.remove('drop-down-anim');
    document.getElementById(id).classList.add('drop-up-anim');
}


function showBadgeList() {
    document.getElementById('userContactBadges').classList.remove('display-none');
}


function removeDisplayNone() {
    let searchListElements = document.querySelectorAll('.user-contact-list .contact-list-btn');
    searchListElements.forEach(element => {
        element.classList.remove('display-none');
    });
}


function resetInputCategory() {
    toggleElements('dropDownCategoryOpen', 'dropDownCategoryClose');
}


function dropDownOpenById(id) {
    document.getElementById(id).classList.add('drop-down-anim');
    document.getElementById(id).classList.remove('drop-up-anim');
}


function makeSpaceforList() {
    let assignedInputs = document.getElementById('assignedInputs');
    assignedInputs.setAttribute('style', 'height: 300px');
    let mainCenterAdd = document.getElementById('mainCenterAdd');
    mainCenterAdd.scrollTo({
        top: 300,
        left: 0,
        behavior: "smooth",
    });
}


function resetSpaceforList() {
    let assignedInputs = document.getElementById('assignedInputs');
    assignedInputs.setAttribute('style', 'height: auto');
    let mainCenterAdd = document.getElementById('mainCenterAdd');
    mainCenterAdd.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}


function tglCSSCheckBox(id) {
    let rectId = id + 'Rect';
    let path0Id = id + 'Path0';
    let path1Id = id + 'Path1';
    let rectClassDef = 'checkbox-default-rect';
    let pathClassDef = 'checkbox-default-path';
    let rectClassClicked = 'checkbox-clicked-rect';
    let pathClassClicked = 'checkbox-clicked-path';
    tglCSSRect(rectId, rectClassDef);
    tglCSSRect(rectId, rectClassClicked);
    tglCSSRect(path0Id, pathClassDef);
    tglCSSRect(path0Id, pathClassClicked);
    tglCSSRect(path1Id, pathClassDef);
    tglCSSRect(path1Id, pathClassClicked);
}


// .25th
async function getContactsSort() {
    userId = loadLocalStorageObject('currentUser').id;
    let userContacts = await getArrOfUserContacts(userId);
    let userContactsSort = getUserContactsSort(userContacts);
    userContactsSort = userFirst(userContactsSort);
    return userContactsSort;
}


// .25th
async function getArrOfUserContacts() {
    let userContacts = await getContactsFromFirebase();
    userContacts = Object.values(userContacts);
    return userContacts;
}


// .25th
function getUserContactsSort(userContacts) {
    let userContactsSort = [];
    userContactsSort = sortArrOfObj(userContacts);
    return userContactsSort;
}


// .25th
function userFirst(userContactsSort) {
    let fstContactId;
    userContactsSort.forEach((contact, i) => {
        if (contact['id'] == 'contactId0000') fstContactId = i;
    });
    userContactsSort.splice(0, 0, userContactsSort[fstContactId]);
    fstContactId++;
    userContactsSort.splice(fstContactId, 1);
    return userContactsSort;
}


// .29th:
function checkIfFormFilled() {
    let formFilled = false;
    let title = document.getElementById('title').value;
    let dueDate = document.getElementById('dueDate').value;
    let category = document.getElementById('category').value;
    if (title && dueDate && category) { formFilled = true }
    return formFilled;
}


function getArrsOfBadgeData(userContactsSort) {
    let colorsArr = [];
    let initialsArr = [];
    userContactsSort = Object.values(userContactsSort);
    userContactsSort.forEach(element => {
        colorsArr.push(element['color']);
        initialsArr.push(element['initial']);
    });
    return [colorsArr, initialsArr];
}


function showClickedBadges() {
    getFormInputData();
    let contactBtns = document.querySelectorAll('.user-contact-list button');
    contactBtns.forEach((contactBtn, i) => {
        document.getElementById(`contactListBadge${i}`).classList.add('display-none');
        if (contactBtn.classList.contains('contact-list-btn-clicked')) {
            document.getElementById(`contactListBadge${i}`).classList.remove('display-none');
        };
    });
}


function selectAssignedBtnDefault() {
    let dropDownAssignedOpen = false;
    dropDownAssignedOpen = document.getElementById('dropDownAssignedClose').classList.contains('display-none');
    return dropDownAssignedOpen;
}


function hideBadgeList() {
    document.getElementById('userContactBadges').classList.add('display-none');

}


function selectCategoryBtnDefault() {
    let dropDownCategoryOpen = false;
    dropDownCategoryOpen = document.getElementById('dropDownCategoryClose').classList.contains('display-none');
    return dropDownCategoryOpen;
}


function tglCSSRect(id, classId) {
    document.getElementById(id).classList.toggle(classId);
}