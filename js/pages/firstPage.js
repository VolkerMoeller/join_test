async function initFirstPage() {
    await includeHTML();
    initLogoForAnim();
    showCntMain();
    firstLoadV2();

    // switchToLogIn();
}


function initLogoForAnim() {
    const logo = document.querySelector('.logo-desktop-main');
    logo.classList.add('fst-page-logo-anim');
    const paths = document.querySelectorAll('.path-def-1st');
    paths.forEach(path => {
        path.classList.add('fst-page-svg-clr-anim');
    });
}


function switchToLogIn() {
    setTimeout(() => {
        history.replaceState({}, '', './logIn.html')
        location.assign('./logIn.html');
    }, 3000);
}


function showCntMain() {
    const cntMain = document.getElementById('cntMain');
    cntMain.classList.toggle('show');
}


// first load

function firstLoad() {
    setTimeout(() => {
        const linkPageCSS = document.querySelector('#pageCSS');
        linkPageCSS.setAttribute('href', './assets/css/pages/logIn.css');
        const title = document.querySelector('title');
        title.innerHTML = 'Log In';
    }, 3000);
}


function firstLoadV2() {
    const linkPageCSS = document.querySelector('#pageCSS');
    linkPageCSS.setAttribute('href', './assets/css/pages/fstPage.css');
    const title = document.querySelector('title');
    title.innerHTML = 'First Page';
    saveLocalStorageObject('visited', true);
}