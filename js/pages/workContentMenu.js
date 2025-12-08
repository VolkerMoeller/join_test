// --------------------------
// workContentMenu-functions:
// --------------------------

// 1st
// showSmallMenu()

// 2nd
// hideSmallMenu()

// 3rd
// initOvlFrameForAnimMenu()


// 4th
// animSmallMenuFwd()


// 1st:
// function showSmallMenu() {
//     genSmallMenu();
//     animSmallMenu();
// }


// function showSmallMenu() {
//     let overlay = document.querySelector('.js-small-menu-overlay');

//     if (!overlay) {
//         document.body.insertAdjacentHTML('beforeend', genHTMLSmallMenu());
//         overlay = document.querySelector('.js-small-menu-overlay');

//         if (!overlay) {
//             console.warn('showSmallMenu: failed to create small menu overlay');
//             return;
//         }

//         initSmallMenuEvents(overlay);
//     }

//     const menuContainer = overlay.querySelector('.nav-cnt');
//     if (!menuContainer) {
//         console.warn('showSmallMenu: .nav-cnt not found inside overlay');
//         return;
//     }

//     menuContainer.classList.remove('display-none');
//     overlay.classList.add('from-top-right-into-view'); // optional eigene Klasse
// }


function showSmallMenu() {
    const overlay = genSmallMenu();
    if (!overlay) return;

    // Events nur einmal initialisieren (z.B. über Daten-Flag)
    if (!overlay.dataset.bound) {
        initSmallMenuEvents(overlay);
        overlay.dataset.bound = 'true';
    }

    animSmallMenu(overlay);
}




// 2nd:
// function hideSmallMenu() {
//     setTimeout(() => {
//         resetOverlayV2();
//     }, 10);
// }

function hideSmallMenu() {
    const ovlFrame = document.getElementById('ovlFrame');
    if (!ovlFrame) return;

    const overlay = ovlFrame.querySelector('.js-small-menu-overlay');
    if (!overlay) return;

    const menuContainer = overlay.querySelector('.nav-cnt');
    if (menuContainer) {
        menuContainer.classList.add('display-none');
        menuContainer.classList.remove('from-top-right-into-view');
        // Optional: wenn du eine "zurück raus"-Animation hast:
        // menuContainer.classList.add('from-left-out-off-sight');
    }

    ovlFrame.classList.remove('ovl-show-nav');
    ovlFrame.classList.add('ovl-hide');
}



// 3rd:
function initOvlFrameForAnimMenu() {
    let ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.remove('ovl-hide');
    ovlFrame.classList.add('ovl-show-nav');
}


// 4th:
function animSmallMenu(overlay) {
    const ovlFrame = document.getElementById('ovlFrame');
    if (!ovlFrame) {
        console.warn('animSmallMenu: #ovlFrame not found');
        return;
    }

    // Klassen für den Rahmen setzen
    ovlFrame.classList.add('ovl-frame');
    ovlFrame.classList.remove('ovl-hide');
    ovlFrame.classList.add('ovl-show-nav');

    // Menü-Container im Overlay anzeigen
    const menuContainer = overlay.querySelector('.nav-cnt');
    if (!menuContainer) {
        console.warn('animSmallMenu: .nav-cnt not found inside overlay');
        return;
    }

    menuContainer.classList.remove('display-none');
    menuContainer.classList.remove('from-left-out-off-sight');
    menuContainer.classList.add('from-top-right-into-view');
}



// --------------------
// 1st-level-functions:
// --------------------

// 1st
// ..
// genSmallMenu()
// animSmallMenu()

// 2nd
// ..
// resetOverlay() --> main.js


// 1st:
// ..
// function genSmallMenu() {
//     document.getElementById('ovlFrame').innerHTML = '';
//     document.getElementById('ovlFrame').innerHTML = genHTMLSmallMenu();
// }


/**
 * Ensures that the small menu HTML exists inside #ovlFrame.
 *
 * @returns {HTMLElement|null} The small menu overlay element, or null on failure.
 */
function genSmallMenu() {
    const ovlFrame = document.getElementById('ovlFrame');
    if (!ovlFrame) {
        console.warn('genSmallMenu: #ovlFrame not found');
        return null;
    }

    // Already created? → reuse
    let overlay = ovlFrame.querySelector('.js-small-menu-overlay');
    if (overlay) {
        return overlay;
    }

    // Not yet available → Insert HTML
    ovlFrame.innerHTML = genHTMLSmallMenu();

    overlay = ovlFrame.querySelector('.js-small-menu-overlay');
    if (!overlay) {
        console.warn('genSmallMenu: failed to create small menu overlay');
        return null;
    }

    return overlay;
}


// 1st:
// ..
// function animSmallMenu() {
//     initOvlFrameForAnimMenu();
//     animSmallMenuFwd();
// }


// --------------------
// 2nd-level-functions:
// --------------------

// 1st
// ...
// genHTMLSmallMenu() --> genOvls.js

// 1st
// ...
// initOvlFrameForAnimMenu() --> work.js
// animSmallMenuFwd() --> work.js