let initData = {
    'nextUserId': '1',
    'nextContactId': '0',
    'nextTaskId': '0'
}


// ---------------------------------
// initialization-database-functions
// ---------------------------------

// initDatabase()

async function initDatabase() {
    await deleteData('');
    putInitDataToFirebase();
}

// -------------------
// 1st-level-functions
// -------------------

// deleteData() --> basic.js
// putInitDataToFirebase()


function putInitDataToFirebase() {
    putData(`initData/`, initData);
    storageGuest();
}

// -------------------
// 2nd-level-functions
// -------------------

// putData() --> basic.js
// storageGuest()


async function storageGuest() {
    let guestData = {
        'eMail': 'guest@user.de',
        'name': 'Guest User',
        'password': '',
        'color': 'var(--main2nd)',
        'initial': 'GU',
        'eMail': 'guest@user.de',
    }
    await putData(`users/userId0000/`, guestData);
}


// -------------------
// 3rd-level-functions
// -------------------

// putData() --> basic.js