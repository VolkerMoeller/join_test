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


function setupAddElementsOnTop() {
    document.getElementById('assignedContainer').classList.add('z-index-4');
}


function resetOverlayFrameSelect() {
    resetOverlayFrame();
    resetInputAssigned();
    dropDownCloseById('userContactList');
    // resetSpaceforList();
}


function initFocusInputSelect(inputId) {
    handleOverlayForSelect();
    initToggleDropDown();
    dropDownOpenById('userContactList');
}


function initOnclickDropDownOpen() {
    toggleElements('dropDownOpen', 'dropDownClose');
    focusInput('assigned');
    dropDownOpenById('userContactList');
    // makeSpaceforList();
}




function initOnclickDropDownClose() {
    toggleElements('dropDownOpen', 'dropDownClose');
    resetOverlayFrame();
    emptyInputFieldById('assigned');
    dropDownCloseById('userContactList');
    // resetSpaceforList();
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
    toggleElements('dropDownOpen', 'dropDownClose');
    emptyInputFieldById('assigned');
}


function initToggleDropDown() {
    let assignedBtnDefault = selectAssignedBtnDefault();
    if (assignedBtnDefault) {
        toggleElements('dropDownOpen', 'dropDownClose');
        focusInput('assigned');
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
    let dropDownOpen = false;
    dropDownOpen = document.getElementById('dropDownClose').classList.contains('display-none');
    return dropDownOpen;
}


function checkIfChecked(id) {
    let checked = false;
    checked = document.getElementById(id).classList.contains('display-none');
    return checked;
}