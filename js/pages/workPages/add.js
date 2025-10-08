// ----------------
//add.js-functions:
// ----------------

// setupAddElementsOnTop()
// resetOverlayFrameSelect()
// initFocusInputSelect()
// initFocusInputCategory()
// initOnclickDropDownOpen()
// initOnclickDropDownClose()
// tglContactListBtnCSS()


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


function initFocusInputSelect(inputId) {
    handleOverlayForSelect(inputId);
    initToggleDropDown(inputId);
    if (inputId == 'assigned') {
        dropDownOpenById('userContactList');
    }
    if (inputId == 'category') {
        dropDownOpenById('categoryList');
    }
}


function initOnclickDropDownOpen(inputId) {
    if (inputId == 'assigned') {
        handleOverlayForSelect(inputId);
        toggleElements('dropDownAssOpen', 'dropDownAssClose');
        // focusInput('assigned');
        dropDownOpenById('userContactList');
    }
    if (inputId == 'category') {
        handleOverlayForSelect(inputId);
        toggleElements('dropDownCatOpen', 'dropDownCatClose');
        // focusInput('category');
        dropDownOpenById('categoryList');
    }
}


function initOnclickDropDownClose(inputId) {
    if (inputId == 'assigned') {
        toggleElements('dropDownAssOpen', 'dropDownAssClose');
        resetOverlayFrame();
        emptyInputFieldById(inputId);
        dropDownCloseById('userContactList');
        resetAddElementsDefault(inputId);
    }
    if (inputId == 'category') {
        toggleElements('dropDownCatOpen', 'dropDownCatClose');
        resetOverlayFrame();
        emptyInputFieldById(inputId);
        dropDownCloseById('categoryList');
        resetAddElementsDefault(inputId);
    }
}


function tglContactListBtnCSS(id) {
    document.getElementById(id).classList.toggle('contactListBtn');
    document.getElementById(id).classList.toggle('contactListBtnClicked');
    tglCSSCheckBox(id);
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


function tglCSSRect(id, classId) {
    document.getElementById(id).classList.toggle(classId);

}

// --------------------
// 1st-level-functions:
// --------------------

// resetOverlayFrame() --> main.js
// resetInputAssigned()

// handleOverlayForSelect() --> main.js
// initToggleDropDown()

// toggleElements() --> main.js
// focusInput() --> main.js
// dropDownOpenById()
// makeSpaceforList()

// toggleElements() --> main.js
// resetOverlayFrame() --> main.js
// emptyInputFieldById() --> main.js
// resetSpaceforList()


function resetInputAssigned() {
    toggleElements('dropDownAssOpen', 'dropDownAssClose');
    emptyInputFieldById('assigned');
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
        let assignedBtnDefault = selectAssignedBtnDefault();
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


function dropDownCloseById(id) {
    document.getElementById(id).classList.remove('drop-down-anim');
    document.getElementById(id).classList.add('drop-up-anim');
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


// --------------------
// 2nd-level-functions:
// --------------------

// toggleElements() --> main.js
// emptyInputFieldById() --> main-js

// selectAssignedBtnDefault()

// toggleElements() --> main.js
// focusInput() --> main.js



function selectAssignedBtnDefault() {
    let dropDownAssOpen = false;
    dropDownAssOpen = document.getElementById('dropDownAssClose').classList.contains('display-none');
    return dropDownAssOpen;
}


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