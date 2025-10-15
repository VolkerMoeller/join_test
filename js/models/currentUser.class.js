class CurrentUser {
    id = '';
    name = '';
    initial = '';
    color = '';
    tasksGroups = '';


    constructor(userId, user) {
        this.id = paddingId(userId);
        this.name = user.name;
        this.initial = user.initial;
        this.color = user.color;
        this.tasksGroups = user.tasksGroups;
    }


    paddingId(id) {
        id = id.toString();
        id = id.padStart(4, "0");
        return id;
    }
}

