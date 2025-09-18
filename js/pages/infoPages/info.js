// ------------------
// info.js-functions:
// ------------------


// navigationView()


function navigationView() {
    resetNavigationView();
    let userStatus = readingUserStatus();
    if (userStatus == 'external') {
        toggleExternalNav();
        setTimeout(() => {
            showLeftMenu();
        }, 10);
    };
}


function toggleExternalNav() {
    let navBtns = document.querySelectorAll('.menu-btn-hvr');
    navBtns.forEach(navBtn => {
        navBtn.classList.toggle('display-none');
    });
    let fstNavBtn = document.querySelector('.menu-btn-hvr');
    fstNavBtn.classList.remove('display-none');
}


// --------------------
// 2nd-level-functions:
// --------------------

// resetNavigationView() --> main.js
// readingUserStatus() --> main.js
// showLeftMenu() --> work.js