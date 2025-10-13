class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    priority = '';
    description = '';
    state = 'toDo';
    formData = '';
    subtaskId = '0';


    constructor(taskIndex) {
        this.taskId = 'taskId' + taskIndex;
        this.formData = this.getFormInputData();
        this.title = this.formData.title.value;
        this.dueDate = this.formData.dueDate.value;
        this.category = this.formData.category.value;
        this.priority = this.formData.priority.value;
        this.description = this.formData.description.value;
    }


    getFormInputData() {
        const inputs = document.getElementById("formAddTask").elements;
        return inputs;
    }
}