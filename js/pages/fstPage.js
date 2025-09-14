// -------------------
// fstPage-functions:
// -------------------

async function initFstPage() {
    await includeHTML();
    firstPageAnim();
    localStorage.clear();
    setClrSchemeInit();
    setUserStatusExternal();
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// firstPageAnim()
// setClrSchemeInit() --> main.js
// setUserStatusExternal() --> main.js

async function firstPageAnim() {
    animFrame();
    animBg();
    animLogo();
    animClr();
    endAnim();
    switchToSignPage();
}


// --------------------
// 2nd-level-functions:
// --------------------

// animFrame()
// animBg()
// animLogo()
// animClr()
// endAnim()
// switchToSignPage()

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


// --------------------
// 3rd-level-functions:
// --------------------

// changeOvl('ovlSign.html') --> main.js
// noAnimCSS()

function noAnimCSS() {
    const animCSS = document.getElementById('animCSS');
    animCSS.setAttribute('href', './assets/css/main/noAnim.css');
}