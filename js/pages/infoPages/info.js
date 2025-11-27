// ------------------
// info.js-functions:
// ------------------


// navigationView()


function navigationView() {
    resetNavigationView();
    initMenuButtonEvents();
    let userStatus = readingUserStatus();
    if (userStatus == 'external') {
        toggleExternalNav();
        setTimeout(() => {
            showLeftAndBottomMenu();
        }, 10);
    };
}


function toggleExternalNav() {
    let navBtns = document.querySelectorAll('.menu-btn-hvr');
    navBtns.forEach(navBtn => {
        navBtn.classList.toggle('display-none');
    });
    let navBtnsMbl = document.querySelectorAll('.menu-btn-hvr-mbl');
    navBtnsMbl.forEach(navBtnMbl => {
        navBtnMbl.classList.toggle('display-none');
    });
    let fstNavBtn = document.querySelector('.menu-btn-hvr-mbl');
    fstNavBtn.classList.remove('display-none');

    let mnuBtnMbkGhost = document.getElementById('mnuBtnMbkGhost');
    mnuBtnMbkGhost.classList.remove('display-none');
    let txtBtnPrivacyMbl = document.getElementById('txtBtnPrivacyMbl');
    txtBtnPrivacyMbl.classList.remove('display-none');
    let txtBtnLegalMbl = document.getElementById('txtBtnLegalMbl');
    txtBtnLegalMbl.classList.remove('display-none');

}