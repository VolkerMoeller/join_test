// ----------------------
// new-database-functions
// ----------------------


// initDatabase()


async function initDatabase() {
    // all data will be deleted with ''
    await deleteData('');
    putInitDataToFirebase();
}


// -------------------
// 1st-level-functions
// -------------------

// deleteData() --> basic.js
// putInitDataToFirebase()


function putInitDataToFirebase() {
    let initData = {
        'nextUserId': '1',
        'nextContactId': '0',
        'nextTaskId': '0'
    }
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

async function storageFirebaseNewUser(newUser) {
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





// ------------------
// use data functions
// ------------------

// getAllUsers()


async function getAllUsers() {
    let storagedUsers = await loadData(`users/`);
    if (storagedUsers) {
        let allUsers = buildAllUsers(storagedUsers);
        return allUsers;
    }
}


// -------------------
// 1st-level-functions
// -------------------

// loadData() --> basic.js
// buildAllUsers()


function buildAllUsers(storagedUsers) {
    let allUsersKeys = Object.keys(storagedUsers);
    let allUsers = Object.values(storagedUsers);
    allUsers.forEach((user, id) => {
        let index = allUsersKeys[id];
        user['userId'] = index;
    });
    return allUsers;
}