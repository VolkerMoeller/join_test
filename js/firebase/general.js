// ----------------------
// general-functions
// ----------------------


// initDatabase()
// getNextId()
// updateNextId()


async function initDatabase() {
    await deleteData('');
    putInitDataToFirebase();
}


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
}


async function getNextSubtaskId() {
    let userId = loadLocalStorageObject('currentUser').id;
    let nextSubtaskId = await loadData(`users/${userId}/nextSubtaskId`)
    return nextSubtaskId;
}

async function saveNextSubtaskId(nextSubtaskId) {
    let userId = loadLocalStorageObject('currentUser').id;
    await putData(`users/${userId}/nextSubtaskId`, nextSubtaskId);
}


// -------------------
// 1st-level-functions
// -------------------

// deleteData() --> basic.js
// putInitDataToFirebase()

// loadData() --> basic.js
// paddingId() --> main.js

// loadData() --> basic.js
// putData() --> basic.js
// paddingId() --> main.js


function putInitDataToFirebase() {
    let initData = {
        'nextUserId': '1',
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
        'color': 'var(--main2nd)',
        'contacts': '',
        'eMail': 'guest@user.de',
        'id': 'userId0000',
        'initial': 'G',
        'name': 'Guest User',
        'nextContactId': '0',
        'nextSubtaskId': '0',
        'nextTaskId': '0',
        'password': '',
        'tasks': '',
        'tasksGroups': {
            'done': '2',
            'feedback': '3',
            'inBoard': '9',
            'progress': '2',
            'toDo': '4',
            'urgent': '1'
        },
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
    await putData(`users/${newUser['id']}`, newUser);
}


// -------------------
// 1st-level-functions
// -------------------

// getNextId() --> see above
// updateNextId() --> see above

// putData() --> basic.js






// ------------------
// new-task-functions
// ------------------


// initGetNextTaskId()
// storageNewTask()

async function initGetNextTaskId() {
    let userId = loadLocalStorageObject('currentUser').id;
    let nextTaskId = await getNextId(`users/${userId}/nextTaskId`);
    await updateNextId(`users/${userId}/nextTaskId`);
    return nextTaskId;
}

async function storageNewTask(userIndex, newTask) {
    await putData(`users/${userIndex}/tasks/${newTask.taskId}`, newTask);
}


// -------------------
// 1st-level-functions
// -------------------

// getNextId() --> see above
// updateNextId() --> see above

// putData --> basic.js




// ------------------
// use-data-functions
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