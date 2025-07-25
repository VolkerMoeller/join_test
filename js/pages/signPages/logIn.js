async function initLogIn() {
    await includeHTML();
    firstPageAnim();
    // setPageCSS();
}


function firstPageAnim() {
    // showOvlFrame()
    animBg();
    animLogo();
    animClr();
    hideOvlDly();
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


function hideOvlDly() {
    const ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.remove('show');
    ovlFrame.classList.add('hide-dly');
}


function showOvlFrame() {
    const ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.add('show');
}

function setPageCSS() {
    setTimeout(() => {
        document.getElementById('pageCSS').setAttribute('href', './assets/css/pages/logIn.css')
    }, 3000);
}