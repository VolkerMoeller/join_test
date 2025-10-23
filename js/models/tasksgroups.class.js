class Tasksgroups {
    done;
    feedback;
    inBoard;
    progress;
    toDo;
    urgent;


    constructor(tasksgroups) {
        this.done = String(tasksgroups[0]);
        this.feedback = (tasksgroups[1]);
        this.progress = tasksgroups[2];
        this.toDo = tasksgroups[3];
        this.inBoard = String(this.toDo + this.progress + this.feedback);
        this.feedback = String(tasksgroups[1]);
        this.progress = String(tasksgroups[2]);
        this.toDo = String(tasksgroups[3]);
        this.urgent = '0';
    }

}

