class Task {
    taskId = '';
    title = '';
    dueDate = '';
    category = '';
    priority = '';
    description = '';
    state = 'toDo';
    subtasks = '';


    constructor(taskIndex) {
        this.taskId = 'taskId' + taskIndex;
        this.formData = this.getFormInputData();
        this.title = this.formData.title.value;
        this.dueDate = this.formData.dueDate.value;
        this.category = this.formData.category.value;
        this.priority = this.formData.priority.value;
        this.description = this.formData.description.value;
        this.subtasks = this.selectSubtasks();
    }


    getFormInputData() {
        const inputs = document.getElementById("formAddTask").elements;
        return inputs;
    }

    selectSubtasks() {
        const subtaskInputs = this.getSubtaskInputs()
        const subtaskTexts = this.getSubtaskTexts()
        const subtaskInputIds = this.getSubtaskInputIds(subtaskInputs);
        const subtaskTextIds = this.getSubtaskInputIds(subtaskTexts);
        const subtaskValues = this.getSubtaskInputValues(subtaskInputs);
        const subtasks = {
            'subtasksInputIds': subtaskInputIds,
            'subtasksTextIds': subtaskTextIds,
            'subtasksValues': subtaskValues,
        };
        return subtasks;
    }


    getSubtaskInputs() {
        const subtaskInputs = document.querySelectorAll('.subtask-edit-container input');
        return subtaskInputs;
    }


    getSubtaskTexts() {
        const subtaskTexts = document.querySelectorAll('.user-subtasks-list-text li');
        return subtaskTexts;
    }


    getSubtaskInputIds(subtaskInputs) {
        const subtaskInputIds = [];
        subtaskInputs.forEach(subtask => {
            subtaskInputIds.push(subtask.id);
        });
        return subtaskInputIds;
    }


    getSubtaskTextIds(subtaskInputs) {
        const subtaskInputIds = [];
        subtaskInputs.forEach(subtask => {
            subtaskInputIds.push(subtask.id);
        });
        return subtaskInputIds;
    }


    getSubtaskInputValues(subtaskInputs) {
        const subtaskInputValues = [];
        subtaskInputs.forEach(subtask => {
            subtaskInputValues.push(subtask.value);
        });
        return subtaskInputValues;
    }
}