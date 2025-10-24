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

    constructor(userData) {
        this.id = 'userId' + userData[0];
        this.name = userData[1];
        this.eMail = userData[2];
        this.password = userData[3];
        this.getInitials();
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
}