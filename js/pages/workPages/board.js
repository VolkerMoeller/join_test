async function initAnimAddTaskFloat() {
    await includeHTMLById('w3-include-overlay');
    showOverlayForMsg();
    genFloatingAddTask();
    scrollElementToTop('mainCenterAdd');
    genUserContactList();
    genContactBadges();
}

function endAnimAddTaskFloat() {
    resetFormAddTask();
    animFlowHideAddTask();
    setTimeout(() => {
        resetOverlay();
        viewDefaultContent(BOARD_NAV_BTN_ID);
    }, 225);
}


function animFlowShowAddTask() {
    document.getElementById('formAddTask').classList.remove('form-add-anim-hide');
    document.getElementById('formAddTask').classList.add('form-add-anim-show');
}

function animFlowHideAddTask() {
    document.getElementById('formAddTask').classList.remove('form-add-anim-show');
    document.getElementById('formAddTask').classList.add('form-add-anim-hide');
}                                                                               