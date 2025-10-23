class Tasksgroups {
    done = 0;
    feedback = 0;
    inBoard = 0;
    progress = 0;
    toDo = 0;
    urgent = 0;


    constructor(done, feedback, inBoard, progress, toDo, urgent) {
        this.done = done;
        this.feedback = feedback;
        this.inBoard = inBoard;
        this.progress = progress;
        this.toDo = toDo;
        this.urgent = urgent;
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
}
