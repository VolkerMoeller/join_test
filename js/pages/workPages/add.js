// ----------------
//add.js-functions:
// ----------------

// setupAddElementsOnTop()

function setupAddElementsOnTop() {
    document.getElementById('assignedContainer').classList.add('z-index-4');
}

function resetOverlayFrameSelect() {
    resetOverlayFrame();
    resetInputAssigned();
}



function resetInputAssigned() {
    toggleElements('dropDownOpen', 'dropDownClose');
}


function initToggleDropDown() {
}