class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    prio = '';
    description = '';
    state = 'toDo';

    
    constructor(taskIndex) {
        this.taskId = 'taskId' + taskIndex;
        this.title = this.getFormInputData().title;
        this.dueDate = this.getFormInputData().dueDate;
        this.category = this.getFormInputData().category;
        this.prio = this.getFormInputData().priority;
        this.description = this.getFormInputData().description;
    }


    getFormInputData() {
        const inputs = document.getElementById("formAddTask").elements;
        const formData = {
            'title': inputs.title.value,
            'dueDate': inputs.dueDate.value,
            'category': inputs.category.value,
            'priority': inputs.priority.value,
            'description': inputs.description.value
        }
        return formData;
    }
}