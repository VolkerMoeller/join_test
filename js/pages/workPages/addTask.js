// ---------------------
// addTask.js-functions:
// ---------------------

// initNewTask()

async function initNewTask() {
    // setCurrentState('ToDo');
    let taskData = await getTaskData();
    handleSubtasks(taskData);
    handleAssignedContacts(taskData);
    animateMsg('addTask.html', 'msgAddTaskSuccess', 'board.html');
    await saveTasksGroups();
}


// --------------------
// 1st-level-functions:
// --------------------


async function getTaskData() {
    let taskData = [];
    let taskIndex = await initGetNextTaskId();
    debugger;
    let data = await getFormInputData();
    let state = loadLocalStorageObject('currentState');
    let newTask = new Task(data, taskIndex, state);
    let userIndex = loadLocalStorageObject('currentUser').id;
    await storageNewTask(userIndex, newTask);
    taskData.push(userIndex, taskIndex, newTask);
    return taskData;
}


// --------------------
// 2nd-level-functions:
// --------------------

// initGetNextTaskId() --> general.js