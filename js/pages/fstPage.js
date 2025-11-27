
// #region initFstPage()
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
// #endregion


function firstPageAnim() {
    animFrame();
    animBg();
    animLogo();
    animClr();
    endAnim();
    switchToSignPage();
}


function animFrame() {
    const frame = document.querySelector('.ovl-frame');
    frame.classList.add('frame-anim');
}


function animBg() {
    const ovlAnim = document.querySelector('.ovl-anim');
    ovlAnim.classList.add('bg-anim');
}


function animLogo() {
    const logos = document.querySelectorAll('.logo-desktop-main');
    logos.forEach(logo => {
        logo.classList.add('logo-anim');
    });
}


function animClr() {
    const paths = document.querySelectorAll('.path-def-1st');
    paths.forEach(path => {
        path.classList.add('clr-anim');
    });
}


function endAnim() {
    setTimeout(() => {
        const frame = document.querySelector('.ovl-frame');
        frame.classList.add('ovl-hide');
        frame.classList.remove('frame-anim');
        changeOvl('ovlSign.html');
        noAnimCSS();
    }, 3000);
}


function switchToSignPage() {
    setTimeout(() => {
        history.replaceState({}, '', 'signPage.html');
    }, 3000);
}


function noAnimCSS() {
    const animCSS = document.getElementById('animCSS');
    animCSS.setAttribute('href', './assets/css/main/noAnim.css');
}