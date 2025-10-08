// ----------------
//add.js-functions:
// ----------------

// setupAddElementsOnTop()
// resetAddElementsDefault()
// resetOverlayFrameSelect()
// initFocusInputSelect()
// initOnclickDropDownOpen()
// initOnclickDropDownClose()
// tglContactListBtnCSS()
// handleCategorySelection()


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
    if (inputId == 'assigned') {
        toggleElements('dropDownAssOpen', 'dropDownAssClose');
        resetOverlayFrame();
        emptyInputFieldById(inputId);
        dropDownCloseById('userContactList');
        resetAddElementsDefault(inputId);
        document.getElementById('userContactList').classList.remove('drop-up-anim');
    }
    if (inputId == 'category') {
        toggleElements('dropDownCatOpen', 'dropDownCatClose');
        resetOverlayFrame();
        emptyInputFieldById(inputId);
        dropDownCloseById('categoryList');
        resetAddElementsDefault(inputId);
        document.getElementById('categoryList').classList.remove('drop-up-anim');
    }
}


// 7th
function tglContactListBtnCSS(id) {
    document.getElementById(id).classList.toggle('contactListBtn');
    document.getElementById(id).classList.toggle('contactListBtnClicked');
    tglCSSCheckBox(id);
}


// 8th
function handleCategorySelection(text) {
    let category = document.getElementById('category');
    category.value = text;
    category.placeholder = text;
}

// --------------------
// 1st-level-functions:
// --------------------

// 3rd
// resetOverlayFrame() --> main.js
// resetInputAssigned()
// dropDownCloseById()
// resetAddElementsDefault() --> see above
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
// toggleElements() --> main.js
// focusInput() --> main.js
// dropDownOpenById() --> see above
// toggleElements() --> main.js
// dropDownOpenById() -->see above


// 6th
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


// 7th
//  tglCSSCheckBox()


function resetInputAssigned() {
    toggleElements('dropDownAssOpen', 'dropDownAssClose');
    emptyInputFieldById('assigned');
}


function dropDownCloseById(id) {
    document.getElementById(id).classList.remove('drop-down-anim');
    document.getElementById(id).classList.add('drop-up-anim');
}


function resetInputCategory() {
    toggleElements('dropDownCatOpen', 'dropDownCatClose');
    emptyInputFieldById('category');
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


function selectAssignedBtnDefault() {
    let dropDownAssOpen = false;
    dropDownAssOpen = document.getElementById('dropDownAssClose').classList.contains('display-none');
    return dropDownAssOpen;
}


function dropDownOpenById(id) {
    document.getElementById(id).classList.add('drop-down-anim');
    document.getElementById(id).classList.remove('drop-up-anim');
}


function makeSpaceforList() {
    let assignedInputs = document.getElementById('assignedInputs');
    assignedInputs.setAttribute('style', 'height: 300px');
    let mainCenterAddTask = document.getElementById('mainCenterAddTask');
    mainCenterAddTask.scrollTo({
        top: 300,
        left: 0,
        behavior: "smooth",
    });
}


function resetSpaceforList() {
    let assignedInputs = document.getElementById('assignedInputs');
    assignedInputs.setAttribute('style', 'height: auto');
    let mainCenterAddTask = document.getElementById('mainCenterAddTask');
    mainCenterAddTask.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}


function tglCSSCheckBox(id) {
    console.log('hier');
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


// --------------------
// 2nd-level-functions:
// --------------------

// toggleElements() --> main.js
// emptyInputFieldById() --> main-js

// selectAssignedBtnDefault()

// toggleElements() --> main.js
// focusInput() --> main.js

//  tglCSSRect()




function selectCategoryBtnDefault() {
    let dropDownCatOpen = false;
    dropDownCatOpen = document.getElementById('dropDownCatClose').classList.contains('display-none');
    return dropDownCatOpen;
}


function checkIfChecked(id) {
    let checked = false;
    checked = document.getElementById(id).classList.contains('display-none');
    return checked;
}


function tglCSSRect(id, classId) {
    document.getElementById(id).classList.toggle(classId);
}