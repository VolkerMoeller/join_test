class Tasksgroups {
    done = 0;
    feedback = 0;
    inBoard = 0;
    progress = 0;
    tasks = {};
    toDo = 0;
    urgent = 0;


    constructor() {
        this.tasks = this.getTasksFromFirebase();
        this.done = this.cntToDoTasks(this.tasks, 'done');
        this.feedback = this.cntToDoTasks(this.tasks, 'feedback');
        this.progress = this.cntToDoTasks(this.tasks, 'progress');
        this.toDo = this.cntToDoTasks(this.tasks, 'toDo');
    }


    async getTasksFromFirebase() {
        let user = this.loadLocalStorageObject('currentUser');
        let userId = user['id'];
        let currentTasks = await this.loadData(`users/${userId}/tasks`);
        return currentTasks;
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


    // async cntToDoTasks(state = 'toDo') {
    //     this.tasks.then((values) => {
    //         values = Object.values(values);
    //         values.forEach(element => {
    //             if (element['state'] == state) {
    //                 ++this.toDo;
    //             }
    //         });
    //     });
    // }


    // async cntToDoTasks(tasks, state = 'toDo') {
    //     tasks = Object.values(tasks);
    //     tasks.forEach(element => {
    //         if (element['state'] == state) {
    //             ++this.toDo;
    //         }
    //     });
    // }

    cntToDoTasks(tasks, state) {
        let counter = 0;
        tasks = Object.values(tasks);
        tasks.forEach(element => {
            if (element['state'] == state) {
                ++counter;
            }
        });
        return 8;
    }
}