function genHTMLHvrBtn(btnId, onclick) {
    return `
    <button id="${btnId}Hvr" class="display-none" onclick="${onclick}"
        onmouseleave="toggleElements('${btnId}','${btnId}Hvr')" w3-include-hvr-btn="./assets/img/svgHTML/6-leftArrowHover.html">
    </button>
    <button id="${btnId}" onmouseover="toggleElements('${btnId}','${btnId}Hvr')"
        w3-include-hvr-btn="./assets/img/svgHTML/7-leftArrow.html">
    </button>
  `;
}


function genHTMLSmallMenu() {
    return `
    <div class="ovl" onclick="hideSmallMenu()">
        <div class="nav-cnt nav-top-rgt display-none">
            <button id="helpBtnSmallMenu" class="version-2-body"
                onclick="showInfoContentById('cntCenterHelp')">Help</button>
            <button class="version-2-body" onclick="showInfoContentById('cntCenterLegal')">Legal Notice</button>
            <button class="version-2-body" onclick="showInfoContentById('cntCenterPrivacy')">Privacy Policy</button>
            <button class="version-2-body" onclick="switchToSignPages()">Log out</button>
        </div>
    </div>
    `;
}


function genHTMLWelcomeDesktop(greeting, name) {
    return `
    <div id="greetingUser" class="greeting display-none">
        <span>${greeting},</span>
        <span>${name}</span>
    </div>
    <div id="greetingGuest" class="greeting">
        <span>${greeting}!</span>
    </div> 
    `;
}


function genHTMLWelcomeMobile(greeting, name) {
    return `
    <div class="main-center-welcome-mobile">
        <div id="greetingUser" class="greeting-mobile display-none">
            <span>${greeting},</span>
            <span>${name}</span>
        </div>
        <div id="greetingGuest" class="greeting-mobile">
            <span>${greeting}!</span>
        </div> 
    <div>
    `;
}


function genHTMLBtnUser(initial) {
    return `
    <div id="userInitial" class="initial version-initial">${initial}</div>
    <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect class="guest-icn" width="48" height="48" rx="24" transform="matrix(1 0 0 -1 4 52.9658)" />
    <circle cx="28" cy="28.9658" r="26.5" stroke="var(--main)" stroke-width="3" />
    </svg>
    `;
}


function genHTMLSumRect(nr, title) {
    return `
    <span>${nr}</span>
    <span>${title}</span>
    `;
}