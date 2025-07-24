async function initLogIn() {
    await includeHTML();
    firstPageAnim();
    setPageCSS();
}


function firstPageAnim() {
    animBg();
    animLogo();
    animClr();
    hideOvl();
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


function hideOvl() {
    const ovlFrame = document.querySelector('.ovl-frame');
    ovlFrame.classList.add('hide-dly');

}

function setPageCSS() {
    setTimeout(() => {
        document.getElementById('pageCSS').setAttribute('href', './assets/css/pages/logIn.css')
    }, 3000);
}