// ---------------------
// addTask.js-functions:
// ---------------------

// initNewTask()

async function initNewTask() {
    let newTask = await createNewTask();
    console.log(newTask);
    debugger;
    // handleSubtasks(taskData);
    // handleAssignedContacts(taskData);
    // animateMsg('addTask.html', 'msgAddTaskSuccess', 'board.html');
    // await saveTasksGroups();
}


// --------------------
// 1st-level-functions:
// --------------------


async function createNewTask() {
    let taskIndex = await initGetNextTaskId();
    let newTask = new Task(taskIndex);
    let userIndex = loadLocalStorageObject('currentUser').id;
    await storageNewTask(userIndex, newTask);
    return newTask;
}

// async function getTaskData() {
//     let taskData = [];
//     taskData.push(userIndex, taskIndex, newTask);
//     return taskData;
// }


// --------------------
// 2nd-level-functions:
// --------------------

// initGetNextTaskId() --> general.js
// getFormInputData()
// storageNewTask() --> general.js


function getFormInputDataTest() {
    const inputs = document.getElementById("formAddTask").elements;
    return inputs;
}




function selectSubtasks() {
    const subtasks = document.querySelectorAll('.user-subtasks-list-text li');
    subtasks.forEach(subtask => {
        console.log(subtask.innerHTML);
    });
    return subtasks;
}