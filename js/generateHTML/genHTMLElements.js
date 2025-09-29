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


function genHTMLWelcomeDesktop(greeting) {
    return `
    <div id="greetingUser" class="greeting display-none">
        <span>${greeting},</span>
        <span>Sophia Müller</span>
    </div>
    <div id="greetingGuest" class="greeting">
        <span>${greeting}!</span>
    </div> 
    `;
}


function genHTMLWelcomeMobile(greeting) {
    return `
    <div class="main-center-welcome-mobile">
        <div id="greetingUser" class="greeting-mobile display-none">
            <span>${greeting},</span>
            <span>Sophia Müller</span>
        </div>
        <div id="greetingGuest" class="greeting-mobile">
            <span>${greeting}!</span>
        </div> 
    <div>
    `;
}