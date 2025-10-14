// ---------------------
// addTask.js-functions:
// ---------------------

// initNewTask()
// getFormInputDataTest()
// selectSubtasks()

async function initCreateNewTask() {
    let newTask = await createNewTask();
    console.log(newTask);
    // handleSubtasks(taskData);
    // handleAssignedContacts(taskData);
    // animateMsg('addTask.html', 'msgAddTaskSuccess', 'board.html');
    // await saveTasksGroups();
    viewDefaultContent('mnuBtn4th');
}


function getFormInputDataTest() {
    const inputs = document.getElementById("formAddTask").elements;
    console.log(inputs);
}


// function selectSubtasks() {
//     const subtaskInputs = getSubtaskInputs()
//     const subtaskTexts = getSubtaskTexts()
//     const subtaskInputIds = getSubtaskInputIds(subtaskInputs);
//     const subtaskTextIds = getSubtaskInputIds(subtaskTexts);
//     const subtaskValues = getSubtaskInputValues(subtaskInputs);
//     const subtasks = {
//         'subtasksInputIds': subtaskInputIds,
//         'subtasksTextIds': subtaskTextIds,
//         'subtasksValues': subtaskValues,
//     };
//     return subtasks;
// }


// function getSubtaskInputs() {
//     const subtaskInputs = document.querySelectorAll('.subtask-edit-container input');
//     return subtaskInputs;
// }


// function getSubtaskTexts() {
//     const subtaskTexts = document.querySelectorAll('.user-subtasks-list-text li');
//     return subtaskTexts;
// }


// function getSubtaskInputIds(subtaskInputs) {
//     const subtaskInputIds = [];
//     subtaskInputs.forEach(subtask => {
//         subtaskInputIds.push(subtask.id);
//     });
//     return subtaskInputIds;
// }


// function getSubtaskTextIds(subtaskInputs) {
//     const subtaskInputIds = [];
//     subtaskInputs.forEach(subtask => {
//         subtaskInputIds.push(subtask.id);
//     });
//     return subtaskInputIds;
// }


// function getSubtaskInputValues(subtaskInputs) {
//     const subtaskInputValues = [];
//     subtaskInputs.forEach(subtask => {
//         subtaskInputValues.push(subtask.value);
//     });
//     return subtaskInputValues;
// }

// --------------------
// 1st-level-functions:
// --------------------

// createNewTask()
// viewDefaultContent() --> work.js


async function createNewTask() {
    let taskIndex = await initGetNextTaskId();
    let newTask = new Task(taskIndex);
    let userIndex = loadLocalStorageObject('currentUser').id;
    await storageNewTask(userIndex, newTask);
    return newTask;
}


// --------------------
// 2nd-level-functions:
// --------------------

// initGetNextTaskId() --> general.js
// loadLocalStorageObject() --> main.js
// storageNewTask() --> general.js
