class CurrentUser {
    id = '';
    name = '';
    initial = '';
    color = '';


    constructor(userId, user) {
        this.id = 'userId' + paddingId(userId);
        this.name = user.name;
        this.initial = user.initial;
        this.color = user.color;
    }


    paddingId(id) {
        id = id.toString();
        id = id.padStart(4, "0");
        return id;
    }
}

