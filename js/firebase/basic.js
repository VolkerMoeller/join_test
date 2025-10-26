const BASE_URL = 'https://remotestorage-f5e66-default-rtdb.europe-west1.firebasedatabase.app/';

// ----------------
// basic-functions:
// ----------------

// 1st
// postData()

// 2nd
// putData()

// 3rd
// deleteData()

// 4th
// loadData()


// 1st
async function postData(path = '', data) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response = await response.json();
}


// 2nd
async function putData(path = '', data) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response = await response.json();
}


// 3rd
async function deleteData(path) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'DELETE',
    });
    return responseToJson = await response.json();
}


// 4th
async function loadData(path = '') {
    let response = await fetch(BASE_URL + path + '.json');
    return responseToJson = await response.json();
}