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


async function createNewTask() {
    updateNextSubtaskId();
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
