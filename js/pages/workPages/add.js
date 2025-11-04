// ----------------
//add.js-functions:
// ----------------

// 1st setupAddElementsOnTop()
// 2nd resetAddElementsDefault()
// 3rd resetOverlayFrameSelect()
// 4th initFocusInputSelect()
// 5th initOnclickDropDownOpen()
// 6th initOnclickDropDownClose()
// 7th tglContactListBtnCSS()
// 8th handleCategorySelection()
// 9th checkIfChecked()
// 10th showSubtaskPanel()
// 11th hideSubtaskPanel()
// 12th initShowSubtaskPanel()
// 13th resetOverlayFrameSubtask()
// 14th setupSubtasksElementsOnTop()
// 15th closeSubtaskInput()
// 16th initShowSubtaskInput()
// 17th resetOverlayFrameSubtaskEdit()
// 18th setupSubtasksEditElementsOnTop()
// 19th updateDefaultSubtaskId()
// 20th resetFormAddTask()
// 21th 
// 22th
// 23th
// 24th
// 25th genUserContactList
// 26th
// 27th searchContactsByInput()
// 28th genAddTaskForm()
// 29th enableBtnIfFormFilled()


// 1st
function setupAddElementsOnTop(inputId) {
    if (inputId == 'assigned') {
        document.getElementById('assignedContainer').classList.add('z-index-4');
    }
    if (inputId == 'category') {
        document.getElementById('categoryContainer').classList.add('z-index-4');
    }
}


// 2nd
function resetAddElementsDefault(inputId) {
    if (inputId == 'assigned') {
        document.getElementById('assignedContainer').classList.remove('z-index-4');
    }
    if (inputId == 'category') {
        document.getElementById('categoryContainer').classList.remove('z-index-4');
    }
}


// 3rd
function resetOverlayFrameSelect(inputId) {
    resetOverlayFrame();
    if (inputId == 'assigned') {
        resetInputAssigned();
        dropDownCloseById('userContactList');
        resetAddElementsDefault(inputId);
        showBadgeList();
        removeDisplayNone();
    }
    if (inputId == 'category') {
        resetInputCategory();
        dropDownCloseById('categoryList');
        resetAddElementsDefault(inputId);
    }
}


// 4th

function initFocusInputSelect(inputId) {
    handleOverlayForSelect(inputId);
    initToggleDropDown(inputId);
    if (inputId == 'assigned') {
        hideBadgeList();
        dropDownOpenById('userContactList');
    }
    if (inputId == 'category') {
        dropDownOpenById('categoryList');
        document.getElementById('technicalTask').focus();
    }
}


// 5th

function initOnclickDropDownOpen(inputId) {
    if (inputId == 'assigned') {
        justOpened = selectAssignedBtnDefault();
    }
    handleOverlayForSelect(inputId);
    if (inputId == 'assigned') {
        hideBadgeList();
        toggleElements('dropDownAssOpen', 'dropDownAssClose');
        focusInput('assigned');
        dropDownOpenById('userContactList');
    }
    if (inputId == 'category') {
        toggleElements('dropDownCatOpen', 'dropDownCatClose');
        dropDownOpenById('categoryList');
    }
}


// 6th
function initOnclickDropDownClose(inputId) {
    let floatAddTask = document.querySelector('.form-add-float');
    console.log(floatAddTask);
    if (inputId == 'assigned') {
        showBadgeList();
        toggleElements('dropDownAssOpen', 'dropDownAssClose');
        if (!floatAddTask) resetOverlayFrame();
        emptyInputFieldById(inputId);
        dropDownCloseById('userContactList');
        resetAddElementsDefault(inputId);
        document.getElementById('userContactList').classList.remove('drop-up-anim');
        removeDisplayNone();
    }
    if (inputId == 'category') {
        toggleElements('dropDownCatOpen', 'dropDownCatClose');
        if (!floatAddTask) resetOverlayFrame();
        dropDownCloseById('categoryList');
        resetAddElementsDefault(inputId);
        document.getElementById('categoryList').classList.remove('drop-up-anim');
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

// 9th
function checkIfChecked(id) {
    let checked = false;
    checked = document.getElementById(id).classList.contains('display-none');
    return checked;
}

// 10th

function showSubtaskPanel() {
    document.getElementById('inputSubtaskPanel').classList.remove('display-none');
}

// 11th

function hideSubtaskPanel() {
    document.getElementById('inputSubtaskPanel').classList.add('display-none');
}

// 12th

function initShowSubtaskPanel(inputId) {
    handleOverlayForSubtasks(inputId);
    showSubtaskPanel();
}

// 13th

function resetOverlayFrameSubtask() {
    resetOverlayFrame();
    hideSubtaskPanel();
    document.getElementById('inputContainerSubtask').classList.remove('z-index-4')
}


// 14th
function setupSubtasksElementsOnTop() {
    document.getElementById('inputContainerSubtask').classList.add('z-index-4');
}


// 15th
function closeSubtaskInput() {
    closeInput('subtask');
    hideSubtaskPanel();
    resetOverlayFrameSubtask();
}


// 16th
function initShowSubtaskInput(subtaskId) {
    let subtaskContainerInputId = subtaskId + 'InputContainer';
    let subtaskInputId = subtaskId + 'Input';
    handleOverlayForEditSubtask(subtaskId);
    focusInput(subtaskInputId);
    document.getElementById(subtaskContainerInputId).classList.toggle('z-index--1')
    document.getElementById(subtaskContainerInputId).classList.toggle('z-index-1')
}


// 17th
function resetOverlayFrameSubtaskEdit(subtaskId) {
    let editSubtaskId = subtaskId + 'InputContainer';
    resetOverlayFrame();
    let inputContainer = document.getElementById(editSubtaskId);
    if (inputContainer) {
        inputContainer.classList.remove('z-index-4');
        inputContainer.classList.add('z-index--1');
    }
}


// 18th
function setupSubtasksEditElementsOnTop(subtaskId) {
    let editSubtaskId = subtaskId + 'InputContainer';
    let inputContainer = document.getElementById(editSubtaskId);
    if (inputContainer) {
        inputContainer.classList.toggle('z-index-1');
        inputContainer.classList.add('z-index-4');
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


// 20th
function resetFormAddTask() {
    resetFormById('formAddTask');
    saveLocalStorageObject('currentSubtaskId', '0');
    saveLocalStorageObject('currentSubtaskObj', {});
    document.getElementById('subtaskListText').innerHTML = '';
    document.getElementById('subtaskListInput').innerHTML = '';
    resetOverlayFrameSubtask('subtask');
    genUserContactList();
    genContactBadges();
    document.getElementById('userContactBadges').classList.add('display-none');

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
    console.log(formFilled);
}


// --------------------
// 1st-level-functions:
// --------------------

// 3rd
// resetOverlayFrame() --> main.js
// resetInputAssigned()
// dropDownCloseById()
// resetAddElementsDefault() --> see above
// showBadgeList()
// removeDisplayNone()
// resetInputCategory()
// dropDownCloseById() --> see above
// resetAddElementsDefault() --> see above


// 4th
// handleOverlayForSelect() --> main.js
// initToggleDropDown()
// dropDownOpenById() --> see above
// dropDownOpenById() --> see above


// 5th
// selectAssignedBtnDefault()
// handleOverlayForSelect() --> main.js
// hideBadgeList()
// toggleElements() --> main.js
// focusInput() --> main.js
// dropDownOpenById() --> see above
// toggleElements() --> main.js
// dropDownOpenById() -->see above


// 6th
// showBadgeList() -->
// toggleElements() --> main.js
// resetOverlayFrame() --> main.js
// emptyInputFieldById() --> main.js
// dropDownCloseById() --> see above
// resetAddElementsDefault() --> see above
// toggleElements() --> main.js
// resetOverlayFrame() --> main.js
// emptyInputFieldById() --> main.js
// dropDownCloseById() --> see above
// resetAddElementsDefault() --> see above
// removeDisplayNone() --> see above

// .7th
// tglCSSCheckBox()

// .16th
// toggleElementsZindex() --> main.js
// focusInput() --> main.js

// .25th
// getArrOfUserContacts()
// getUserContactsSort()
// userFirst()
// getArrsOfBadgeData()
// genHTMLUserContactListBtn() --> genHTMLELements.

// .29th
// checkIfFormFilled


function resetInputAssigned() {
    toggleElements('dropDownAssOpen', 'dropDownAssClose');
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
    toggleElements('dropDownCatOpen', 'dropDownCatClose');
}


function initToggleDropDown(inputId) {
    if (inputId == 'assigned') {
        let assignedBtnDefault = selectAssignedBtnDefault();
        if (assignedBtnDefault) {
            toggleElements('dropDownAssOpen', 'dropDownAssClose');
            focusInput(inputId);
        }
    }
    if (inputId == 'category') {
        let assignedBtnDefault = selectCategoryBtnDefault();
        if (assignedBtnDefault) {
            toggleElements('dropDownCatOpen', 'dropDownCatClose');
            focusInput(inputId);
        }
    }
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
async function getArrOfUserContacts(userId) {
    // let userContacts = await loadData(`users/${userId}/contacts`);
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


// function getArrsOfBadgeData(userContacts) {
//     let colorsArr = [];
//     let initialsArr = [];
//     userContacts = Object.values(userContacts);
//     userContacts.forEach(element => {
//         colorsArr.push(element['color']);
//         initialsArr.push(element['initial']);
//     });
//     return [colorsArr, initialsArr];
// }


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



// --------------------
// 2nd-level-functions:
// --------------------

// toggleElements() --> main.js
// emptyInputFieldById() --> main.js

// toggleElements() --> main.js
// emptyInputFieldById() --> main.js

// selectAssignedBtnDefault()
// toggleElements() --> main.js
// focusInput() --> main.js

// selectCategoryBtnDefault()
// toggleElements() --> main.js
// focusInput() --> main.js

//  tglCSSRect()


function selectAssignedBtnDefault() {
    let dropDownAssOpen = false;
    dropDownAssOpen = document.getElementById('dropDownAssClose').classList.contains('display-none');
    return dropDownAssOpen;
}


function hideBadgeList() {
    document.getElementById('userContactBadges').classList.add('display-none');

}


function selectCategoryBtnDefault() {
    let dropDownCatOpen = false;
    dropDownCatOpen = document.getElementById('dropDownCatClose').classList.contains('display-none');
    return dropDownCatOpen;
}


function tglCSSRect(id, classId) {
    document.getElementById(id).classList.toggle(classId);
}