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


async function getTasksFromFirebase() {
    let userId = loadLocalStorageObject('currentUser').id;
    let currentTasks = await loadData(`users/${userId}/tasks`);
    return currentTasks;
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
        'contacts': {
            'contactId0000': {
                'id': 'contactId0000',
                'name': 'Guest (YOU)',
                'eMail': 'guest@guest.com',
                'phone': '+49 111 1234567',
                'color': 'var(--main2nd)',
                'initial': 'G'
            },
            'contactId0001': {
                'id': 'contactId0001',
                'name': 'Martina Specht',
                'eMail': 'specht@gmx.de',
                'phone': '+49 160 12458869',
                'color': 'var(--variant8)',
                'initial': 'MS'
            },
            'contactId0002': {
                'id': 'contactId0002',
                'name': 'Armin Held',
                'eMail': 'held@gmail.com',
                'phone': '+49 151 32158778',
                'color': 'var(--variant6)',
                'initial': 'AH'
            },
            'contactId0003': {
                'id': 'contactId0003',
                'name': 'Tobias Tomm',
                'eMail': 'tomm@gmail.com',
                'phone': '+49 151 74858118',
                'color': 'var(--variant14)',
                'initial': 'TT'
            },
            'contactId0004': {
                'id': 'contactId0004',
                'name': 'Bernd Bombe',
                'eMail': 'bombe@gmail.com',
                'phone': '+49 160 5214587',
                'color': 'var(--variant6)',
                'initial': 'BB'
            },
            'contactId0005': {
                'id': 'contactId0005',
                'name': 'Sabine Sense',
                'eMail': 'sense@gmail.com',
                'phone': '+49 148 1248578',
                'color': 'var(--variant7)',
                'initial': 'SS'
            },
            'contactId0006': {
                'id': 'contactId0006',
                'name': 'Susanne Leitner',
                'eMail': 'leitner@gmail.com',
                'phone': '+49 150 54895654',
                'color': 'var(--variant10)',
                'initial': 'SL'
            },
        },
        'contTaskRefs': {
            0: {
                0: 'taskId0001',
                1: 'contactId0001'
            },
            1: {
                0: 'taskId0001',
                1: 'contactId0003'
            },
            2: {
                0: 'taskId0002',
                1: 'contactId0000'
            },
            3: {
                0: 'taskId0002',
                1: 'contactId0004'
            }
        },
        'eMail': 'guest@user.de',
        'id': 'userId0000',
        'initial': 'G',
        'name': 'Guest User',
        'nextContactId': '3',
        'nextSubtaskId': '0',
        'nextTaskId': '2',
        'password': '',
        'tasks': {
            'taskId0000': {
                'assigneds': {
                    0: 'contactId0001',
                    1: 'contactId0003'
                },
                'category': 'Technical Task',
                'description': "Festessen für Hochzeit kochen",
                'dueDate': '30/10/2025',
                'priority': 'urgent',
                'state': 'toDo',
                'subtasks': {
                    'subtasksInputIds': {
                        0: 'subtask1Input',
                        1: 'subtask2Input'
                    },
                    'subtasksTextIds': {
                        0: 'subtask1Text',
                        1: 'subtask2Text'
                    },
                    'subtasksValues': {
                        0: 'EDEKA',
                        1: 'Aldi'
                    },
                },
                'taskId': 'taskId0001',
                'title': 'Lebensmittel Einkaufen'
            },
            'taskId0001': {
                'assigneds': {
                    0: 'contactId0000',
                    1: 'contactId0004'
                },
                'category': 'Technical Task',
                'description': "Brauche neues Sofa",
                'dueDate': '24/10/2025',
                'priority': 'urgent',
                'state': 'toDo',
                'subtasks': {
                    'subtasksInputIds': {
                        0: 'subtask1Input',
                        1: 'subtask2Input'
                    },
                    'subtasksTextIds': {
                        0: 'subtask1Text',
                        1: 'subtask2Text'
                    },
                    'subtasksValues': {
                        0: 'Mobilia',
                        1: 'Hofmeister'
                    },
                },
                'taskId': 'taskId0001',
                'title': 'Möbel einkaufen'
            }
        }
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