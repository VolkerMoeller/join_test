class Contact {
    id = ''
    name = '';
    eMail = '';
    phone = '';
    initial = '';
    color = '';


    constructor(contact, contactIndex) {
        this.id = 'contactId' + contactIndex;
        this.name = contact[0];
        this.eMail = contact[1];
        this.phone = contact[2];
        this.getInitials();
        this.getUserColor();
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

    getUserColor() {
        let colorNr = Math.floor(Math.random() * 15);
        this.color = `var(--variant${colorNr})`;
    }
}