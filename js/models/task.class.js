class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    prio = '';
    description = '';
    state = 'toDo';

    constructor(taskData, taskIndex) {
        this.taskId = 'taskId' + taskIndex;
        this.title = taskData['title'];
        this.dueDate = taskData['dueDate'];
        this.category = taskData['category'];
        this.prio = taskData['priority'];
        this.description = taskData['description'];
    }
}