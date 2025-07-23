async function initLogIn() {
    await includeHTML();
    showBody();
    // hideLogoSVG();
}


// To prevent the logo from “flickering”, I have previously displayed it as an svg file. Now it is no longer needed.

function hideLogoSVG() {
    const logoSVG = document.getElementById('logoSVG');
    logoSVG.classList.add('display-none');
}


// show Body with delay

function showBody() {
    setTimeout(() => {
        document.getElementById('logIn').classList.add('show');
    }, 550);
}


// helpers

function index() {
    location.assign('./index.html');
}
