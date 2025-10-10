let initData = {
    'nextUserId': '1',
    'nextContactId': '0',
    'nextTaskId': '0'
}


// ---------------------------------
// initialization-database-functions
// ---------------------------------

// initDatabase()
// initGetNextUserId()


async function initDatabase() {
    await deleteData('');
    putInitDataToFirebase();
}


async function initGetNextUserId() {
    let nextUserId = await getNextId('initData/nextUserId/');
    await updateNextId('initData/nextUserId/');
    nextUserId = paddingId(nextUserId);
    return nextUserId;
}


// -------------------
// 1st-level-functions
// -------------------

// deleteData() --> basic.js
// putInitDataToFirebase()

// getNextId()
// updateNextId()
// paddingId()



function putInitDataToFirebase() {
    putData(`initData/`, initData);
    storageGuest();
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
    return nextId;
}


function paddingId(id) {
    id = id.toString();
    id = id.padStart(4, "0");
    return id;
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