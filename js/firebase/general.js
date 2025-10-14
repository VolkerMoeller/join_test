// ----------------------
// general-functions
// ----------------------


// initDatabase()
// getNextId()
// updateNextId()


async function initDatabase() {
    // all data will be deleted with ''
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
        // 'nextContactId': '0',
        // 'nextTaskId': '0'
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
        'initial': 'G',
        'eMail': 'guest@user.de',
        'tasksGroups': {
            'toDo': '4',
            'progress': '2',
            'feedback': '3',
            'done': '2',
            'inBoard': '9',
            'urgent': '1'
        },
        'contacts': '',
        'tasks': '',
        'nextContactId': '0',
        'nextTaskId': '0'
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