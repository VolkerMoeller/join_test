// ------------------
//board.js-functions:
// ------------------

// 1st
// animFlowShowAddTask()

// 2nd
// animFlowHideAddTask()

// 1st:
function animFlowShowAddTask() {
    document.getElementById('formAddTask').classList.remove('form-add-anim-hide');
    document.getElementById('formAddTask').classList.add('form-add-anim-show');
}

// 2nd:
function animFlowHideAddTask() {
    document.getElementById('formAddTask').classList.remove('form-add-anim-show');
    document.getElementById('formAddTask').classList.add('form-add-anim-hide');
}                                                                               