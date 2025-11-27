/**
 * Initializes the very first landing page (index.html).
 *
 * Responsibilities:
 *  - Includes shared HTML fragments.
 *  - Starts the intro animation.
 *  - Clears local storage and initializes color scheme and user status.
 *
 * Uses safeBatch/safeCall to avoid hard failures.
 *
 * @returns {Promise<void>}
 */
async function initFstPage() {
    const steps = [
        { fn: includeHTML, label: 'fstPage:includeHTML' },
        { fn: firstPageAnim, label: 'fstPage:firstPageAnim' },
        { fn: clearLocalStorage, label: 'fstPage:clearLocalStorage' },
        { fn: setClrSchemeInit, label: 'fstPage:setClrSchemeInit' },
        { fn: setUserStatusExternal, label: 'fstPage:setUserStatusExternal' }
    ];

    const errors = await safeBatch(steps);

    if (errors.length > 0) {
        console.warn('initFstPage completed with warnings:', errors);
    } else {
        console.log('initFstPage successful.');
    }
}

/**
 * Wrapped localStorage.clear() so we can use it in safeBatch.
 */
function clearLocalStorage() {
    localStorage.clear();
}


/**
 * Starts the first-page intro animation and schedules the transition
 * to the sign page.
 *
 * @returns {void}
 */
function firstPageAnim() {
    animFrame();
    animBg();
    animLogo();
    animClr();
    scheduleEndOfIntro();
}

/**
 * Schedules the end of the intro overlay and navigation to signPage.html.
 *
 * @returns {void}
 */
function scheduleEndOfIntro() {
    const DURATION_MS = 3000;

    setTimeout(() => {
        endIntroOverlay();
        noAnimCSS();
        switchToSignPage();
    }, DURATION_MS);
}


function animFrame() {
    const frame = document.querySelector('.ovl-frame');
    if (!frame) {
        console.warn('animFrame: ".ovl-frame" not found');
        return;
    }
    frame.classList.add('frame-anim');
}


function animBg() {
    const ovlAnim = document.querySelector('.ovl-anim');
    if (!ovlAnim) {
        console.warn('animBg: ".ovl-anim" not found');
        return;
    }
    ovlAnim.classList.add('bg-anim');
}


function animLogo() {
    const logos = document.querySelectorAll('.logo-desktop-main');
    if (!logos.length) {
        console.warn('animLogo: ".logo-desktop-main" not found');
        return;
    }
    logos.forEach(logo => logo.classList.add('logo-anim'));
}


function animClr() {
    const paths = document.querySelectorAll('.path-def-1st');
    if (!paths.length) {
        console.warn('animClr: ".path-def-1st" not found');
        return;
    }
    paths.forEach(path => path.classList.add('clr-anim'));
}


function endIntroOverlay() {
    const frame = document.querySelector('.ovl-frame');
    if (!frame) {
        console.warn('endIntroOverlay: ".ovl-frame" not found');
        return;
    }

    frame.classList.add('ovl-hide');
    frame.classList.remove('frame-anim');

    // loads sign overlay
    changeOvl('ovlSign.html');
}


function noAnimCSS() {
    const animCSS = document.getElementById('animCSS');
    if (!animCSS) {
        console.warn('noAnimCSS: "#animCSS" not found');
        return;
    }
    animCSS.setAttribute('href', './assets/css/main/noAnim.css');
}


function switchToSignPage() {
    history.replaceState({}, '', 'signPage.html');
}