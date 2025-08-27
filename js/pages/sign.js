async function initSign() {
    await includeHTML();
    focusInputBy('eMail');
}

function focusInputBy(id) {
    document.getElementById(id).focus();
}