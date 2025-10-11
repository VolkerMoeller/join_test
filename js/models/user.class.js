class User {
    id = '';
    name = '';
    eMail = '';
    password = '';
    initial = '';
    color = 'var(--main2nd)';
    tasksGroups = {
        'toDo': '0',
        'progress': '0',
        'feedback': '0',
        'done': '0',
        'inBoard': '0',
        'urgend': '0'
    }
    contacts = '';
    tasks = '';

    constructor(userData) {
        this.id = 'userId' + userData[0];
        this.name = userData[1];
        this.eMail = userData[2];
        this.password = userData[3];
        this.getInitials();
        // this.getUserColor();
    }

    getInitials() {
        let splittedName = this.name.split(" ");
        for (let i = 0; i < splittedName.length; i++) {
            let element = splittedName[i].charAt(0);
            this.initial = this.initial + element;
            this.initial = this.initial.toUpperCase();
            this.initial = this.initial.substring(0, 2);
        }
    }

    // getUserColor() {
    //     let colorNr = Math.floor(Math.random() * 15);
    //     this.color = `var(--variant${colorNr})`;
    // }
}