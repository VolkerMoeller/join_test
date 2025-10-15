class User {
    color = 'var(--main2nd)';
    contacts = '';
    eMail = '';
    id = '';
    initial = '';
    name = '';
    nextContactId = '0';
    nextSubtaskId = '0';
    nextTaskId = '0';
    password = '';
    tasks = '';
    tasksGroups = {
        'toDo': '0',
        'progress': '0',
        'feedback': '0',
        'done': '0',
        'inBoard': '0',
        'urgent': '0',
    };

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