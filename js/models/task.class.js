class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    prio = '';
    description = '';
    state = 'toDo';

    // constructor(taskData, taskIndex) {
    //     this.taskId = 'taskId' + taskIndex;
    //     this.title = taskData['title'];
    //     this.dueDate = taskData['dueDate'];
    //     this.category = taskData['category'];
    //     this.prio = taskData['priority'];
    //     this.description = taskData['description'];
    // }

    constructor(taskIndex) {
        this.taskId = 'taskId' + taskIndex;
        this.title = this.getFormInputData().title;
        // this.dueDate = taskData['dueDate'];
        // this.category = taskData['category'];
        // this.prio = taskData['priority'];
        // this.description = taskData['description'];
    }

    getFormInputData() {
        const inputs = document.getElementById("formAddTask").elements;
        const formData = {
            'title': inputs.title.value,
            'dueDate': inputs.dueDate.value,
            'category': inputs.category.value,
            'prio': inputs.priority.value,
            'description': inputs.description.value
        }
        return formData;
    }
}