// ----------------------
// new-database-functions
// ----------------------

let initData = {
    'nextUserId': '1',
    'nextContactId': '0',
    'nextTaskId': '0'
}

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




// ------------------
// new-user-functions
// ------------------

// initGetNextUserId()
// storageFirebNewUser()


async function initGetNextUserId() {
    let nextUserId = await getNextId('initData/nextUserId/');
    await updateNextId('initData/nextUserId/');
    return nextUserId;
}

async function storageFirebNewUser(newUser) {
    let userData = {
        'eMail': newUser['eMail'],
        'name': newUser['name'],
        'password': newUser['password'],
        'color': newUser['color'],
        'contacts': newUser['contacts'],
        'tasks': newUser['tasks'],
        'tasksGroups': newUser['tasksGroups'],
        'initial': newUser['initial'],
        'eMail': newUser['eMail'],
    }
    await putData(`users/${newUser['id']}`, userData);
}


// -------------------
// 1st-level-functions
// -------------------

// getNextId()
// updateNextId()

// putData() --> basic.js


async function getNextId(path) {
    let nextId = await loadData(path);
    nextId = paddingId(nextId);
    return nextId;
}


async function updateNextId(path) {
    let nextId = await loadData(path);
    nextId++;
    nextId = nextId.toString();
    await putData(path, nextId);
    nextId = paddingId(nextId);
    // return nextId;
}


// -------------------
// 3rd-level-functions
// -------------------

// loadData() --> basic.js
// paddingId() --> main.js

// loadData() --> basic.js
// putData() --> basic.js
// paddingId() --> main.js