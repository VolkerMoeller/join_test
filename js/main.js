// setClrScheme

function setClrScheme(colorSchemeId) {
    if (!colorSchemeId) {
        saveLocalStorageObject('colorScheme', 1);
        changeClrScheme();
    }
    if (colorSchemeId) {
        saveLocalStorageObject('colorScheme', colorSchemeId);
        changeClrScheme();
    }
}


function changeClrScheme() {
    let schemeId = loadLocalStorageObject('colorScheme');
    document.getElementById('linkClrs').setAttribute('href', `./assets/css/main/clrSchemes/${schemeId}-colors.css`);
}


// include HTML

async function includeHTMLById(name) {
    let selector = '[' + name + ']';
    let includeElement = document.querySelectorAll(selector);
    for (let i = 0; i < includeElement.length; i++) {
        const element = includeElement[i];
        let attr = element.getAttribute(name);
        let resp = await fetch(attr);
        if (resp.ok) {
            let content = await resp.text();
            element.innerHTML = content;
        } else {
            element.innerHTML = "Page not found";
        }
    }
}


async function includeHTML() {
    await includeHTMLById('w3-include-html');
    await includeHTMLById('w3-include-template');
    await includeHTMLById('w3-include-variable');
    await includeHTMLById('w3-include-svg');
}


// change svg path class

function changeSvgPathClass(container, actualClass, targetClass) {
    let pathsMain = container.querySelectorAll(`path[class=${actualClass}]`);
    for (let i = 0; i < pathsMain.length; i++) {
        pathsMain[i].setAttribute('class', targetClass);
    }
}


// local storage

function saveLocalStorageObject(key, obj) {
    let objAsString = JSON.stringify(obj);
    localStorage.setItem(key, objAsString);
}


function loadLocalStorageObject(key) {
    let obj = localStorage.getItem(key);
    obj = JSON.parse(obj);
    if (obj) return obj;
}

// navigation

async function changeCntCenter(target) {
    const cntCenter = document.querySelector('.content-center');
    cntCenter.setAttribute('w3-include-variable', `./assets/templates/signPages/${target}/cntCenter.html`);
    await includeHTMLById('w3-include-variable');
}