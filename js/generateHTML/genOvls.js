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
    `}