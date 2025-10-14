// ---------------------
// addTask.js-functions:
// ---------------------

// initNewTask()
// getFormInputDataTest()

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


function selectSubtasks() {
    const subtasks = document.querySelectorAll('.user-subtasks-list-text li');
    subtasks.forEach(subtask => {
        console.log(subtask.innerHTML);
    });
    return subtasks;
}