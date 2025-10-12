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
    let data = await getFormInputData();
    let newTask = new Task(data, taskIndex);
    let userIndex = loadLocalStorageObject('currentUser').id;
    debugger;
    await storageNewTask(userIndex, newTask);
    taskData.push(userIndex, taskIndex, newTask);
    return taskData;
}


// --------------------
// 2nd-level-functions:
// --------------------

// initGetNextTaskId() --> general.js
// getFormInputData()

async function getFormInputData() {
    let formInputData = [];
    const inputs = document.getElementById("formAddTask").elements;
    let title = inputs.title.value;
    let dueDate = inputs.dueDate.value;
    let category = inputs.category.value;
    let prio = inputs.priority.value;
    let description = inputs.description.value;
    formInputData.push(title, dueDate, category, prio, description);
    return formInputData;
}