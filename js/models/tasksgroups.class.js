class Tasksgroups {
    done = '0';
    feedback = '0';
    inBoard = '0';
    progress = '0';
    toDo = '0';
    urgent = '0';

    constructor() {
        this.tasks = this.getTasksFromFirebase();

    }

    async getTasksFromFirebase() {
        let user = this.loadLocalStorageObject('currentUser');
        let userId = user['id'];
        console.log(userId);
        let currentTasks = await this.loadData(`users/${userId}/tasks`);
        console.log(currentTasks);
    }

    loadLocalStorageObject(key) {
        let obj = localStorage.getItem(key);
        obj = JSON.parse(obj);
        if (obj) return obj;
    }

    async loadData(path = '') {
        let response = await fetch(BASE_URL + path + '.json');
        return responseToJson = await response.json();
    }
}