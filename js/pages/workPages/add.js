// ----------------
//add.js-functions:
// ----------------

// setupAddElementsOnTop()
// resetOverlayFrameSelect()
// initFocusInputAssigned()


function setupAddElementsOnTop() {
    document.getElementById('assignedContainer').classList.add('z-index-4');
}


function resetOverlayFrameSelect() {
    resetOverlayFrame();
    resetInputAssigned();
}


function initFocusInputAssigned() {
    handleOverlayForSelect();
    initToggleDropDown();
}


function initOnclickDropDownOpen() {
    toggleElements('dropDownOpen', 'dropDownClose');
    focusInput('assigned');
}


function initOnclickDropDownClose() {
    toggleElements('dropDownOpen', 'dropDownClose');
    resetOverlayFrame();
    emptyInputFieldById('assigned');
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

// toggleElements() --> main.js
// resetOverlayFrame() --> main.js
// emptyInputFieldById() --> main.js


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



function checkIfChecked() {
    let checked = document.getElementById('contact0').checked;
    console.log(checked);
}