// ---------------------
// addTask.js-functions:
// ---------------------

// initCreateNewTask()
// initCreateNewSubtask()

async function initCreateNewTask() {
    let newTask = await createNewTask();
    console.log(newTask);
    // handleSubtasks(taskData);
    // handleAssignedContacts(taskData);
    // animateMsg('addTask.html', 'msgAddTaskSuccess', 'board.html');
    // await saveTasksGroups();
    resetFormAddTask();
    viewDefaultContent('mnuBtn4th');
}

async function initCreateNewSubtask() {
    let subtaskId = updateCurrentSubtaskId();
    subtaskId = 'subtask' + subtaskId;
    let text = await genSubtaskListText(subtaskId);
    genSubtaskListInput(subtaskId);
    updateCurrentSubtaskObj(subtaskId, text);
}


// --------------------
// 1st-level-functions:
// --------------------

// createNewTask()
// viewDefaultContent() --> work.js

// updateNextSubtaskId() --> add.js
// genSubtaskListText()
// genSubtaskListInput()

async function createNewTask() {
    updateNextSubtaskId();
    let taskIndex = await initGetNextTaskId();
    let newTask = new Task(taskIndex);
    let userIndex = loadLocalStorageObject('currentUser').id;
    await storageNewTask(userIndex, newTask);
    return newTask;
}


async function genSubtaskListText(subtaskId) {
    const text = document.getElementById('subtask').value;
    document.getElementById('subtaskListText').innerHTML += genHTMLSubtaskListText(subtaskId, text);
    await includeHTMLById('w3-include-svg-2nd');
    focusInput('subtask');
    return text;
}


async function genSubtaskListInput(subtaskId) {
    const text = document.getElementById('subtask').value;
    document.getElementById('subtaskListInput').innerHTML += genHTMLSubtaskListInput(subtaskId, text);
    await includeHTMLById('w3-include-svg-2nd');
    focusInput('subtask');
}


// --------------------
// 2nd-level-functions:
// --------------------

// updateNextSubtaskId()
// initGetNextTaskId() --> general.js
// loadLocalStorageObject() --> main.js
// storageNewTask() --> general.js


async function updateNextSubtaskId() {
    let defaultId = await getNextSubtaskId();
    defaultId = parseInt(defaultId);
    let currentId = loadLocalStorageObject('currentSubtaskId');
    currentId = parseInt(currentId);
    defaultId = defaultId + currentId;
    defaultId = defaultId.toString();
    await saveNextSubtaskId(defaultId);
    saveLocalStorageObject('currentSubtaskId', '0');
}
