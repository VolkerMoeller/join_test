// ---------------------
// addTask.js-functions:
// ---------------------

// 1st
// initCreateNewTask()

// 2nd
// initCreateNewSubtask()


// 1st
async function initCreateNewTask() {
    let newTask = await createNewTask();
    console.log(newTask);
    // handleAssignedContacts(taskData);
    // animateMsg('addTask.html', 'msgAddTaskSuccess', 'board.html');
    resetFormAddTask();
    viewDefaultContent('mnuBtn4th');
}


// 2nd
async function initCreateNewSubtask() {
    let subtaskId = await createNewSubtaskId();
    let text = await genSubtaskListText(subtaskId);
    genSubtaskListInput(subtaskId);
    updateCurrentSubtaskObj(subtaskId, text);
    scrollElementToBottom('mainCenterAdd');
    scrollElementToBottom('cntCenterAdd');
}


// --------------------
// 1st-level-functions:
// --------------------

// .1st
// createNewTask()
// resetFormAddTask() --> main.js
// viewDefaultContent() --> work.js

// .2nd
// createNewSubtaskId() 
// genSubtaskListText()
// genSubtaskListInput()
// updateCurrentSubtaskObj()
// scrollElementToBottom() --> main.js


async function createNewSubtaskId() {
    let subtaskId = updateCurrentSubtaskId();
    let userId = loadLocalStorageObject('currentUser').id;
    let nextSubtaskId = await loadData(`users/${userId}/nextSubtaskId`);
    subtaskId = parseInt(subtaskId);
    nextSubtaskId = parseInt(nextSubtaskId);
    subtaskId = nextSubtaskId + subtaskId;
    subtaskId = 'subtask' + subtaskId;
    return subtaskId;
}


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
