// ---------------------
// addTask.js-functions:
// ---------------------

// initNewTask()

async function initNewTask() {
    setCurrentState('ToDo');
    let taskData = await newTask();
    handleSubtasks(taskData);
    handleAssignedContacts(taskData);
    animateMsg('addTask.html', 'msgAddTaskSuccess', 'board.html');
    await saveTasksGroups();
}


// --------------------
// 1st-level-functions:
// --------------------