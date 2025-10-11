class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    prio = '';
    description = '';
    state = '';

    constructor(taskData, taskIndex, state) {
        this.taskId = 'taskId' + taskIndex;
        this.title = taskData[0];
        this.dueDate = taskData[1];
        this.category = taskData[2];
        this.prio = taskData[3];
        this.description = taskData[4];
        this.state = state;
    }
}