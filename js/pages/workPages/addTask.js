// ---------------------
// addTask.js-functions:
// ---------------------

// initNewTask()

async function initNewTask() {
    let taskData = await getTaskData();
    debugger;
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
    const inputs = document.getElementById("formAddTask").elements;
    const formInputData = {
        'title': inputs.title.value,
        'dueDate': inputs.dueDate.value,
        'category': inputs.category.value,
        'prio': inputs.priority.value,
        'description': inputs.description.value
    }
    return formInputData;
}