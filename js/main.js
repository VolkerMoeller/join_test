const OverlayManager = (() => {
    /** @type {{ name: string, isInside: (t: EventTarget) => boolean, close: () => void } | null} */
    let active = null;
    let bound = false;

    function bindGlobalOutsideClickOnce() {
        if (bound) return;
        document.addEventListener('click', onGlobalClick, true); // capture
        bound = true;
    }

    function onGlobalClick(event) {
        if (!active) return;

        const t = event.target;
        if (active.isInside(t)) return;

        // Outside click -> close active overlay
        active.close();
        active = null;
    }

    /**
     * Opens (registers) an overlay as the currently active one.
     * If another overlay is active, it will be closed first.
     *
     * @param {string} name
     * @param {(t: EventTarget) => boolean} isInside
     * @param {() => void} close
     */
    function open(name, isInside, close) {
        bindGlobalOutsideClickOnce();

        if (active && active.name !== name) {
            active.close();
        }

        active = { name, isInside, close };
    }

    /**
     * Closes the active overlay if it matches the given name.
     * @param {string} name
     */
    function close(name) {
        if (!active || active.name !== name) return;
        active.close();
        active = null;
    }

    /** Closes whatever is active. */
    function closeActive() {
        if (!active) return;
        active.close();
        active = null;
    }

    /** Debug helper */
    function getActiveName() {
        return active?.name ?? null;
    }

    return { open, close, closeActive, getActiveName, bindGlobalOutsideClickOnce };
})();


async function includeHTML() {
    await includeHTMLById('w3-include-html');
    await includeHTMLById('w3-include-overlay');
    await includeHTMLById('w3-include-template');
    await includeHTMLById('w3-include-variant');
    await includeHTMLById('w3-include-svg');
}


function changeSvgPathClass(container, actualClass, targetClass) {
    let pathsMain = container.querySelectorAll(`path[class=${actualClass}]`);
    for (let i = 0; i < pathsMain.length; i++) {
        pathsMain[i].setAttribute('class', targetClass);
    }
}


function setClrSchemeInit() {
    let colorSchemeId = checkColorSchemeId();
    setClrScheme(colorSchemeId);
}


function invertLogoClr() {
    const logo = document.querySelector('.logo-desktop-main');
    changeSvgPathClass(logo, 'path-def-1st', 'path-white')
}


function setUserStatusExternal() {
    saveLocalStorageObject('userStatus', 'external');
}


function setUserStatusUser() {
    saveLocalStorageObject('userStatus', 'user');
}


function setUserStatusGuest() {
    saveLocalStorageObject('userStatus', 'guest');
}


// --- local-storage-functions:


function saveLocalStorageObject(key, obj) {
    let objAsString = JSON.stringify(obj);
    localStorage.setItem(key, objAsString);
}


function loadLocalStorageObject(key) {
    let obj = localStorage.getItem(key);
    obj = JSON.parse(obj);
    if (obj) return obj;
}


function removeLocalStorageObject(key) {
    localStorage.removeItem(key);
}


// --- basic-navigation-functions:


function switchToWorkPagesAsGuest() {
    window.location.assign('workPage.html');
    setUserStatusGuest();
    rememberGuestData();
}


function switchToSignPages() {
    window.location.assign('signPage.html');
    setUserStatusExternal();
    removeLocalStorageObject('currentUser');
}


function changeCntMain() {
    const cntMain = document.querySelector('.main');
    cntMain.setAttribute('w3-include-html', './assets/templates/workPages/cntMain.html');
}


function changePageCSS() {
    const pageCSS = document.getElementById('pageCSS');
    pageCSS.setAttribute('href', './assets/css/pages/workPages.css');
}


/**
 * Resets a navigation button group (desktop or mobile) to its default state.
 *
 * Behavior:
 *  - All buttons with the given selectedClass are downgraded to baseClass.
 *  - All buttons with baseClass are made visible and enabled.
 *  - The first button with baseClass is hidden (used for layout spacing).
 *  - Optionally, icon hover states can be reset externally by the caller.
 *
 * This helper is used by resetNavigationView() and resetNavigationViewMbl()
 * to avoid duplicating navigation reset logic.
 *
 * @param {string} selectedClass - CSS class name for "selected" buttons.
 * @param {string} baseClass - CSS class name for normal (unselected) buttons.
 * @returns {void}
 */
function resetNavigationGroup(selectedClass, baseClass) {
    const selectedButtons = document.querySelectorAll('.' + selectedClass);
    selectedButtons.forEach(btn => {
        btn.classList.remove(selectedClass);
        btn.classList.add(baseClass);
    });

    const navButtons = document.querySelectorAll('.' + baseClass);
    navButtons.forEach(btn => {
        navButtons.forEach(btn => {
            btn.classList.remove('display-none');
            btn.disabled = false;
        });
    });

    resetMenuIconHoverStates();

    const firstNavBtn = document.querySelector('.' + baseClass);
    if (!firstNavBtn) {
        console.warn(
            `resetNavigationGroup: no element found for baseClass "${baseClass}"`
        );
        return;
    }

    firstNavBtn.classList.add('display-none');
}


function resetNavigationView() {
    resetNavigationGroup('menu-btn-hvr-selected', 'menu-btn-hvr');
}


function resetNavigationViewMbl() {
    resetNavigationGroup('menu-btn-hvr-mbl-selected', 'menu-btn-hvr-mbl');
}


function showLeftAndBottomMenu() {
    setTimeout(() => {
        const leftMenu = document.getElementById('left-menu');
        const bottomMenu = document.getElementById('btm-menu');

        if (!leftMenu) {
            console.warn('showLeftAndBottomMenu: element "#left-menu" not found');
        } else {
            leftMenu.classList.remove('display-none');
        }

        if (!bottomMenu) {
            console.warn('showLeftAndBottomMenu: element "#btm-menu" not found');
        } else {
            bottomMenu.classList.remove('display-none');
        }
    }, 10);
}



// --- overlay-functions:


async function changeOvl(target) {
    const cntCenter = document.querySelector('.ovl-frame');
    cntCenter.setAttribute('w3-include-overlay', `./assets/templates/overlays/${target}`);
    await includeHTMLById('w3-include-overlay');
}


function showOverlayForMsg() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show-anim-bg');
}


function showOverlayForMsgV2() {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show-anim-bg-v2');
}


/**
 * Soft-resets the generic overlay state (frame, messages, navigation).
 *
 * Does not destroy DOM nodes or event handlers, only resets classes and
 * visibility so the overlay can be reused.
 *
 * @returns {void}
 */
function resetOverlay() {
    resetOverlayFrame();
    resetOverlayMsg();
    resetOverlayNav();
}


function resetOverlayV2() {
    let ovlFrame = document.getElementById('ovlFrame');
    ovlFrame.innerHTML = '';
    ovlFrame.setAttribute('class', '');
    ovlFrame.classList.add('ovl-frame', 'ovl-hide');
}


/**
 * Executes a function safely and catches all errors.
 *
 * Works for both synchronous and asynchronous functions.
 * Returns `true` on success, otherwise a formatted error string.
 *
 * @async
 * @function safeCall
 * @param {Function} fn - The function to execute safely.
 * @param {string} label - Name used for logging or error reporting.
 * @param {...any} args - Arguments passed to the function.
 * @returns {Promise<boolean|string>} True on success, or error message on failure.
 */
async function safeCall(fn, label, ...args) {
    if (typeof fn !== 'function') {
        console.warn(`safeCall: '${label}' is not callable.`);
        return `${label} failed: not callable`;
    }

    try {
        const result = fn(...args);

        await Promise.resolve(result);

        return true;
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`safeCall: ${label} failed: ${msg}`);
        return `${label} failed: ${msg}`;
    }
}



/**
 * Logs view-related errors in a consistent way.
 *
 * @param {string} viewName - The name of the view that was being processed.
 * @param {unknown} error - The thrown error or value.
 * @param {Object} [context] - Additional debug context.
 * @returns {void}
 */
function logViewError(viewName, error, context) {
    const baseMessage = `[ViewError] view="${viewName}"`;
    const payload = {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        context: context || null
    };

    console.warn(baseMessage, payload);
}


/**
 * Runs a sequence of setup steps using safeCall.
 *
 * Each step is an object: { fn, label, args? }.
 * Returns an array of error messages (empty if all successful).
 *
 * @param {{ fn: Function, label: string, args?: any[] }[]} steps
 * @returns {Promise<string[]>}
 */
async function safeBatch(steps) {
    const errors = [];

    for (const step of steps) {
        const { fn, label, args = [] } = step;

        const result = await safeCall(fn, label, ...args);
        if (result !== true) {
            errors.push(result);
        }
    }

    return errors;
}


/**
 * Resets all menu icon hover states to their default color.
 *
 * Turns all `.menu-icon-hvr` elements back into `.menu-icon`.
 *
 * @returns {void}
 */
function resetMenuIconHoverStates() {
    const hoveredIcons = document.querySelectorAll('.menu-icon-hvr');

    hoveredIcons.forEach(icon => {
        icon.classList.remove('menu-icon-hvr');
        icon.classList.add('menu-icon');
    });
}


function isAddViewActive() {
    const addContent = document.getElementById(VIEW_CONFIG.add.contentId);
    return addContent && !addContent.classList.contains('display-none');
}


function toggleElements(id1st, id2nd) {
    const element1st = document.getElementById(id1st);
    const element2nd = document.getElementById(id2nd);
    element1st.classList.toggle('display-none');
    element2nd.classList.toggle('display-none');
}


function focusInput(fieldId) {
    document.getElementById(fieldId).focus();
}


function blurInput(fieldId) {
    document.getElementById(fieldId).blur();
}


function readingUserStatus() {
    const userStatus = loadLocalStorageObject('userStatus');
    return userStatus;
}


function getWindowWidth() {
    return window.innerWidth;
}


function getWindowHeight() {
    return window.innerHeight;
}


function doSth(msg) {
    console.log(msg);
}


function windowClose() {
    window.close();
}


function goBack() {
    history.back();
}


function emptyInputFieldById(id) {
    let valueInputField = document.getElementById(id).value = '';
    return valueInputField;
}


function resetFormById(formId) {
    let form = document.getElementById(formId);
    form.reset();
}


function paddingId(id) {
    id = id.toString();
    id = id.padStart(4, "0");
    return id;
}


function closeInput(id) {
    document.getElementById(id).value = "";
}


function getRandomColor() {
    let colorNr = Math.floor(Math.random() * 15);
    let color = `var(--variant${colorNr})`;
    return color;
}


function scrollElementToBottom(id) {
    document.getElementById(id).scroll({
        top: 1000,
        left: 100,
        behavior: "smooth",
    });
}


function scrollElementToTop(id) {
    document.getElementById(id).scroll({
        top: 0,
        left: 0,
        behavior: "instant",
    });
}


function getFormInputData(form = "formAddTask") {
    const inputs = document.getElementById(form).elements;
}


function scrollWindowToTop() {
    window.scroll(0, 0);
}


function checkIfMobileView() {
    return getWindowWidth() < 1440;
}



function getValueOutOfArrWthObjs(arr, ref, key, search) {
    let value;
    arr.forEach(obj => {
        if (obj[key] == ref) { value = obj[search] }
    });
    return value
}


async function getSubtaskIdsObj() {
    const subtasksObj = await loadData('users/userId0000/tasks/taskId0001/subtasks/subtasksInputIds');
    console.log(subtasksObj);
}


async function getTaskContactIds(userId = 'userId0000', currentTaskId = 'taskId0001') {
    let contactIds = [];
    const refs = await loadData(`users/${userId}/contTaskRefs/`);
    refs.forEach(ref => {
        if (ref[0] == currentTaskId) { contactIds.push(ref[1]) };
    });
    console.log(contactIds);
    return contactIds
}



function sortArrOfObj(items) {
    items.sort((a, b) => a.value - b.value);
    items.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return items;
}


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


function checkColorSchemeId() {
    let colorSchemeId = loadLocalStorageObject('colorScheme');
    if (colorSchemeId) {
        return colorSchemeId
    } else return 1;
}


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


function rememberGuestData() {
    let id = '0000';
    let guest =
    {
        'name': 'Guest User',
        'initial': 'G',
        'color': 'var(--main2nd)'
    };
    let currentUser = new CurrentUser(id, guest);
    saveLocalStorageObject('currentUser', currentUser);
}


/**
 * Resets the overlay frame classes to a hidden, neutral state.
 *
 * @returns {void}
 */
function resetOverlayFrame() {
    const overlay = document.querySelector('.ovl-frame');
    if (!overlay) {
        console.warn('resetOverlayFrame: ".ovl-frame" not found');
        return;
    }

    overlay.classList.add('ovl-hide');

    const activeClasses = [
        'ovl-show-anim-bg',
        'ovl-show-anim-bg-v2',
        'ovl-show-nav',
        'ovl-show-select'
    ];

    activeClasses.forEach(cls => overlay.classList.remove(cls));

    // Alte Inline-onclicks entfernen (moderne Events verwenden addEventListener).
    overlay.removeAttribute('onclick');
}


/**
 * Hides and resets all overlay message containers.
 *
 * @returns {void}
 */
function resetOverlayMsg() {
    const msgAnims = ['from-bottom-to-center', 'from-right-to-center'];
    const overlMsgs = document.querySelectorAll('.msg-cnt');

    overlMsgs.forEach(overlMsg => {
        msgAnims.forEach(anim => overlMsg.classList.remove(anim));
        overlMsg.classList.add('display-none');
    });
}



/**
 * Hides any overlay navigation container (e.g. small nav).
 *
 * @returns {void}
 */
function resetOverlayNav() {
    const overlNav = document.querySelector('.nav-cnt');
    if (!overlNav) {
        return;
    }

    overlNav.classList.remove('from-top-right-into-view');
    overlNav.classList.add('display-none');
}


function setupOverlayForEditSubtask(subtaskId) {
    const overlay = document.querySelector('.ovl-frame');
    overlay.classList.remove('ovl-hide');
    overlay.classList.add('ovl-show-select');
    overlay.setAttribute('onclick', `resetOverlayFrameSubtaskEdit('${subtaskId}')`)
}


function changeClrScheme() {
    let schemeId = loadLocalStorageObject('colorScheme');
    document.getElementById('linkClrs').setAttribute('href', `./assets/css/main/clrSchemes/${schemeId}-colors.css`);
}