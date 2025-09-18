// -------------------
// legal.js-functions:
// -------------------

// initLegal()

async function initLegal() {
    await includeHTML();
    setClrSchemeInit();
    invertLogoClr();
    defaultHeaderView();
    navigationView();
}


// --------------------
// 1st-level-functions:
// --------------------

// includeHTML() --> main.js
// setClrSchemeInit() --> main.js
// invertLogoClr() --> main.js
// defaultHeaderView() --> main.js
// navigationView()


function navigationView() {
    let userStatus = readingUserStatus();
    if (userStatus == 'external') {
        toggleUserNav();
        setTimeout(() => {
            showLeftMenu();
        }, timeout);
    };
}

function toggleUserNav() {
    let navBtns = document.querySelectorAll(".menu-btn-hvr");
    navBtns.forEach(navBtn => {
        navBtn.classList.toggle('display-none');
    });
}


// --------------------
// 2nd-level-functions:
// --------------------

// readingUserStatus() --> main.js
// showLeftMenu() --> work.js