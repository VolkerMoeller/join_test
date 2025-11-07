// -----------------
// work.js-functions:
// -----------------

// 1st
// initWork()

// 2nd
// returnToLogIn()

// 3rd
// setMenuIcnHvrClrSVG()

// 4th
// resetMenuIcnHvrClrSVG()


// 1st:
async function initWork() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    defaultNavView();
    genHvrBtns();
    genBtnUser();
    initPageContent();
}


// 2nd:
function returnToLogIn() {
    window.location.assign('./signPage.html');
    saveLocalStorageObject('userStatus', 'external');
}

// 3rd:
// ------------------------------
// Menü-Icon Hoverfarbe umschalten
// ------------------------------

// Zentraler Helfer:
// Schaltet Hoverfarbe für ein oder zwei Icons ein/aus.
// isActive = true → Hover aktivieren
// isActive = false → Hover zurücksetzen
function toggleMenuIcnHvrClrSVG(btnId, icnId1, icnId2, isActive) {
    const btnEl = document.getElementById(btnId);
    if (!btnEl || btnEl.classList.contains('menu-btn-hvr-selected')) return;

    [icnId1, icnId2].forEach(id => {
        const iconEl = id && document.getElementById(id);
        if (!iconEl) return;
        // Klassen je nach Schalter setzen:
        iconEl.classList.toggle('menu-icon-hvr', isActive); // Hover-Farbe an/aus
        iconEl.classList.toggle('menu-icon', !isActive);    // Standardfarbe an/aus
    });
}

// Wrapper-Funktion: aktiviert Hover-Farbe (wird z. B. bei MouseEnter genutzt)
function setMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
    toggleMenuIcnHvrClrSVG(btnId, icnId1, icnId2, true);
}

// Wrapper-Funktion: deaktiviert Hover-Farbe (wird z. B. bei MouseLeave genutzt)
function resetMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
    toggleMenuIcnHvrClrSVG(btnId, icnId1, icnId2, false);
}

// 3rd:
// function setMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
//     let defaultBtn = document.getElementById(btnId).classList.contains('menu-btn-hvr-selected');
//     if (!defaultBtn) {
//         let menuIcnIds = [icnId1, icnId2];
//         for (let i = 0; i < menuIcnIds.length; i++) {
//             const menuIcnId = menuIcnIds[i];
//             if (menuIcnId) {
//                 let menuIcn = document.getElementById(menuIcnId);
//                 menuIcn.classList.remove('menu-icon');
//                 menuIcn.classList.add('menu-icon-hvr');
//             }
//         }
//     }
// }




// 3rd:
// function setMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
//     const btnEl = document.getElementById(btnId);
//     if (!btnEl) return;

//     const defaultBtn = btnEl.classList.contains('menu-btn-hvr-selected');
//     if (defaultBtn) return;

//     const menuIcnIds = [icnId1, icnId2];
//     for (let i = 0; i < menuIcnIds.length; i++) {
//         const menuIcnId = menuIcnIds[i];
//         if (!menuIcnId) continue;
//         const menuIcn = document.getElementById(menuIcnId);
//         if (!menuIcn) continue;
//         menuIcn.classList.remove('menu-icon');
//         menuIcn.classList.add('menu-icon-hvr');
//     }
// }


// 4th:
// function resetMenuIcnHvrClrSVG(btnId, icnId1, icnId2) {
//     const btnEl = document.getElementById(btnId);
//     if (!btnEl) return;

//     const defaultBtn = btnEl.classList.contains('menu-btn-hvr-selected');
//     if (defaultBtn) return;

//     const menuIcnIds = [icnId1, icnId2];
//     for (let i = 0; i < menuIcnIds.length; i++) {
//         const menuIcnId = menuIcnIds[i];
//         if (!menuIcnId) continue;
//         const menuIcn = document.getElementById(menuIcnId);
//         if (!menuIcn) continue;
//         menuIcn.classList.add('menu-icon');
//         menuIcn.classList.remove('menu-icon-hvr');
//     }
// }


// --------------------
// 1st-level-functions:
// --------------------


// .1st
// ..
// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView()
// defaultNavView()
// genHvrBtns()
// genBtnUser()
// initPageContent() --> workContent.js

// .2nd
// ..
// saveLocalStorageObject() --> main.js


// .1st:
// ..
function defaultHeaderView() {
    let userStatus = readingUserStatus()
    if (userStatus == 'guest') { guestHeader(); }
    if (userStatus == 'user') { userHeader(); }
}


// .1st:
// ..
function defaultNavView() {
    resetNavigationView();
    resetNavigationViewMbl();
    setCurrentBtnById('mnuBtn2nd');
    setCurrentBtnById('mnuBtnMbl2nd');
    showLeftAndBottomMenu();
}


// .1st:
// ..
async function genHvrBtns() {
    let btnRefs = {
        'btnBackHelp': ['bntBack4', 'showCurrentContent()'],
        'btnBackLegal': ['bntBack6', 'showCurrentContent()'],
        'btnBackPrivacy': ['bntBack5', 'showCurrentContent()']
    };
    Object.keys(btnRefs).forEach(element => {
        document.getElementById(element).innerHTML = genHTMLHvrBtn(btnRefs[element][0], btnRefs[element][1]);
    });
    await includeHTMLById('w3-include-hvr-btn');
}


// .1st:
// ..
function genBtnUser() {
    let currentUser = loadLocalStorageObject('currentUser');
    document.getElementById('btnUser').innerHTML = '';
    document.getElementById('btnUser').innerHTML = genHTMLBtnUser(currentUser['initial']);
}


// --------------------
// 2nd-level-functions:
// --------------------

// 1st
// ...
// readingUserStatus() --> main.js
// guestHeader()
// userHeader()

// 1st
// ...
// resetNavigationView() --> main.js
// setCurrentBtnById()
// showLeftAndBottomMenu() --> see above
// getTheButtonTwin()
// resetNavigationView() --> see above
// resetNavigationViewMbl() --> main.js
// setCurrentBtnById() --> see above
// setCurrentBtnById() --> see above
// showLeftAndBottomMenu() --> see above

// 1st
// ...
// genHTMLHvrBtn() --> genHovBtn.js
// includeHTMLById() --> main.js

// 1st
// ...
// getWindowWidth() --> main.js
// genWelcomeDesktop() --> sum.js
// resetOverlayV2() --> main.js
// genWelcomeMobile() --> sum .js
// resetOverlayV2() --> main.js
// loadLocalStorageObject() --> main.js
// toggleGreeting() --> sum.js

// 1st
// ...
// loadLocalStorageObject() --> main.js
// genHTMLBtnUser() --> genHTMLElements.js

// 1st
// ...
// loadLocalStorageObject() --> main.js
// genHTMLSumRectCnt() --> genHTMLElements.js


// 1st:
// ...
function guestHeader() {
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.add('display-none');
    document.querySelector('.header-guest-btn').classList.remove('display-none');
};


// 1st:
// ...
function userHeader() {
    document.querySelector('.housing-header-right').classList.remove('display-none');
    document.querySelector('.header-user-btn').classList.remove('display-none');
    document.querySelector('.header-guest-btn').classList.add('display-none');
};


// 1st:
// ...
function setCurrentBtnById(defBtnId) {
    let sumNavBtn = document.getElementById(defBtnId);
    if (!sumNavBtn) return;
    if (sumNavBtn.classList.contains('menu-btn-hvr')) {
        sumNavBtn.classList.remove('menu-btn-hvr');
        sumNavBtn.classList.add('menu-btn-hvr-selected');
        sumNavBtn.disabled = true;
    }
    if (sumNavBtn.classList.contains('menu-btn-hvr-mbl')) {
        sumNavBtn.classList.remove('menu-btn-hvr-mbl');
        sumNavBtn.classList.add('menu-btn-hvr-mbl-selected');
        sumNavBtn.disabled = true;
    }
}


// 1st:
// ...
function getTheButtonTwin(defBtnId) {
    let twinBtnId;
    switch (defBtnId) {
        case 'mnuBtnMbl1st':
            twinBtnId = 'mnuBtn1st';
            break
        case 'mnuBtnMbl2nd':
            twinBtnId = 'mnuBtn2nd';
            break
        case 'mnuBtnMbl3rd':
            twinBtnId = 'mnuBtn3rd';
            break
        case 'mnuBtnMbl4th':
            twinBtnId = 'mnuBtn4th';
            break
        case 'mnuBtnMbl5th':
            twinBtnId = 'mnuBtn5th';
            break
        case 'mnuBtn1st':
            twinBtnId = 'mnuBtnMbl1st';
            break
        case 'mnuBtn2nd':
            twinBtnId = 'mnuBtnMbl2nd';
            break
        case 'mnuBtn3rd':
            twinBtnId = 'mnuBtnMbl3rd';
            break
        case 'mnuBtn4th':
            twinBtnId = 'mnuBtnMbl4th';
            break
        case 'mnuBtn5th':
            twinBtnId = 'mnuBtnMbl5th';
            break
    }
    return twinBtnId;
}