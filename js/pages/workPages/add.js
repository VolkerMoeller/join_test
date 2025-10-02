// ----------------
//add.js-functions:
// ----------------

// downDropOpen()

function downDropOpen() {
    console.log('downDropOpen()');
    document.getElementById('dropDownOpen').classList.remove('display-none');
    document.getElementById('dropDownClose').classList.add('display-none');
    document.getElementById('arrDropOpn').classList.remove('display-none');
    document.getElementById('arrDropOpnHvr').classList.add('display-none');
    document.getElementById('arrDropClo').classList.remove('display-none');
    document.getElementById('arrDropCloHvr').classList.add('display-none');
    document.getElementById('assigned').value = "";
}