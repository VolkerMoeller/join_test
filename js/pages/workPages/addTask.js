// ---------------------
// addTask.js-functions:
// ---------------------

// 1st
// initCreateNewTask()
// ---
// 2nd
// initCreateNewSubtask()
// ---

// 1st
async function initCreateNewTask() {
    let newTask = await createNewTask();
    console.log(newTask);
    initAnimWorkMessages('addTask');
    setTimeout(() => {
        // resetFormAddTask();
        // viewDefaultContent('mnuBtn4th');
    }, 800);
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
// initAnimWorkMessages() --> animMessages.js
// resetFormAddTask() --> main.js
// viewDefaultContent() --> work.js

// .2nd
// createNewSubtaskId() 
// genSubtaskListText()
// genSubtaskListInput()
// updateCurrentSubtaskObj() --> add.js
// scrollElementToBottom() --> main.js
// scrollElementToBottom() --> main.js


// .1st
async function createNewTask() {
    updateNextSubtaskId();
    let taskIndex = await initGetNextTaskId();
    let newTask = new Task(taskIndex);
    let userIndex = loadLocalStorageObject('currentUser').id;
    await storageNewTask(userIndex, newTask);
    return newTask;
}


// .2nd
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


// .2nd
async function genSubtaskListText(subtaskId) {
    const text = document.getElementById('subtask').value;
    document.getElementById('subtaskListText').innerHTML += genHTMLSubtaskListText(subtaskId, text);
    await includeHTMLById('w3-include-svg-2nd');
    focusInput('subtask');
    return text;
}


// .2nd
async function genSubtaskListInput(subtaskId) {
    const text = document.getElementById('subtask').value;
    document.getElementById('subtaskListInput').innerHTML += genHTMLSubtaskListInput(subtaskId, text);
    await includeHTMLById('w3-include-svg-2nd');
    focusInput('subtask');
}


// --------------------
// 2nd-level-functions:
// --------------------

// .1st
// ..
// updateNextSubtaskId()
// initGetNextTaskId() --> general.js
// loadLocalStorageObject() --> main.js
// storageNewTask() --> general.js


// .2nd
// ..
// updateCurrentSubtaskId() --> add.js
// loadLocalStorageObject() --> main.js
// loadData() --> basic.js


// .2nd
// ..
// genHTMLSubtaskListText() --> genHTMLElements.js
// includeHTMLById() --> main.js
// focusInput() --> main.js


// .2nd
// ..
// genHTMLSubtaskListInput() --> genHTMLElements.js
// includeHTMLById() --> main.js
// focusInput() --> main.js


// .1st
// ..
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