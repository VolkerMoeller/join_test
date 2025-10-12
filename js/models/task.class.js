class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    priority = '';
    description = '';
    state = 'toDo';


    constructor(taskIndex) {
        this.taskId = 'taskId' + taskIndex;
        this.formData = this.getFormInputData();
        this.title = this.formData.title;
        this.dueDate = this.formData.dueDate;
        this.category = this.formData.category;
        this.priority = this.formData.priority;
        this.description = this.formData.description;
    }


    getFormInputData() {
        const inputs = document.getElementById("formAddTask").elements;
        console.log(inputs);
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