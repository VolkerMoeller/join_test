async function initFstPage() {
    await includeHTML();
    firstPageAnim();
}


function firstPageAnim() {
    console.log('hello');
    animFrame();
    animBg();
    animLogo();
    animClr();
    endAnim();
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


function animFrame() {
    const frame = document.querySelector('.ovl-frame');
    frame.classList.add('frame-anim');
}

function noAnimCSS() {
    const animCSS = document.getElementById('animCSS');
    animCSS.setAttribute('href', './assets/css/main/noAnim.css');
}

function switchToSignPage() {
    setTimeout(() => {
        window.location.assign('signPage.html');
    }, 3000);
}