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
    <svg width="56" height="56" viewBox="-28 -28 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="25" stroke="var(--main)" stroke-width="3" />
    </svg>
    `;
}


function genHTMLSumRectCnt(nr, title) {
    return `
    <span>${nr}</span>
    <span>${title}</span>
    `;
}


function genHTMLSubtaskListText(subtaskId, text) {
    return `
    <li class="subtask-edit-container z-index-1"
        ondblclick="initShowSubtaskInput('${subtaskId}')" id="${subtaskId}Text">
        <span>${text}</span>
        <div class="input-subtask-panel subtask-panel-v2">
            <div class="flx-cnt" onclick="initShowSubtaskInput('${subtaskId}')"
                w3-include-svg-2nd="./assets/img/svgHTML/54-edit_hvr.html">
            </div>
            <p class="subtask-vector"></p>
            <div class="flx-cnt" onclick="deleteSubtask('${subtaskId}')" 
                w3-include-svg-2nd="./assets/img/svgHTML/53-delete_hvr.html">
            </div>
        </div>
    </li>
    `;
}


function genHTMLSubtaskListInput(subtaskId, text) {
    return `
    <div id="${subtaskId}InputContainer" class="subtask-edit-container z-index--1">
        <input id="${subtaskId}Input" type="text" value="${text}">
        <div class="input-subtask-panel subtask-panel-v2">
            <div class="flx-cnt" onclick="deleteSubtask('${subtaskId}')"
                w3-include-svg-2nd="./assets/img/svgHTML/53-delete_hvr.html">
            </div>
            <p class="subtask-vector"></p>
            <div class="flx-cnt" onclick="checkSubtask('${subtaskId}')"
                w3-include-svg-2nd="./assets/img/svgHTML/51-check_hvr.html">
            </div>
        </div>
    </div>
    `;
}


function genHTMLUserContactListBtn(name, initial, i, color, id) {
    return `
    <button id="contactListBtn${i}" class="contact-list-btn" type="button" value="${id}"
        onclick="toggleElements('3checked${i}', '5default${i}'); checkIfChecked('5default${i}'); tglContactListBtnCSS('contactListBtn${i}'); showClickedBadges();">
        <div class=" contact-list-btn-left">
            <div class="rel">
                <div class="contact-list-badge">
                    <svg width="44" height="44" viewBox="-22 -22 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0" cy="0" r="20" fill="${color}" stroke="white" stroke-width="2" />
                    </svg>
                </div>
                <div class="abs-cnt contact-list-initial">${initial}</div>
            </div>
            <span id="contactListName${i}">${name}</span>
        </div>
        <div class="checkbox-assigned" id="contact${i}" name="contact${i}">
            <div id="5default${i}" class="rel">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect id="checkboxRectChecked${i}" class="checkbox-default" height="24px" width="24px" y="0.96582" rx="12" />
                    <rect width="16px" height="16px" rx="3px" stroke="var(--main)" stroke-width="2" x="4" y="4.96582" />
                </svg>
            </div>
            <div id="3checked${i}" class="display-none">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <rect id="contactListBtn${i}Rect" class="checkbox-default-rect" height="24" width="24" y="0.96582" rx="12" />
                    <path id="contactListBtn${i}Path0" class="checkbox-default-path" stroke-linecap="round" stroke-width="2" d="
                        M 20 11.9658
                        V 17.9658
                        C 20 19.6227 18.6569 20.9658 17 20.9658
                        H 7
                        C 5.34315 20.9658 4 19.6227 4 17.9658
                        V 7.96582
                        C 4 6.30897 5.34315 4.96582 7 4.96582
                        H 15" />
                    <path id="contactListBtn${i}Path1" class="checkbox-default-path" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="
                        M 8 12.9658
                        L 12 16.9658
                        L 20 5.46582" />
                </svg>
            </div>
        </div>
    </button>
    `;
}


function genHTMLContactBadge(i, color, initial) {
    return `
    <div id="contactListBadge${i}" class="rel display-none">
        <div class="contact-list-badge">
            <svg width="44" height="44" viewBox="-22 -22 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="0" cy="0" r="20" fill="${color}" stroke="white" stroke-width="2" />
            </svg>
        </div>
        <div class="abs-cnt contact-list-initial">${initial}</div>
    </div>
`;
}


function genHTMLContactsListBtn(indexTab, color, initial, name, mail, state, i) {
    return `
    <li >
        <div class="contacts-list-index-tab ${state}">
            <div class="contacts-list-index">${indexTab}</div>
            <p class="contacts-list-vector"></p>
        </div>
        <button id="contactsListBtn${i}" class="contacts-list-btn" onclick="initClickedContactBtn(${i})">
            <div class="contacts-list-badge rel">
                <svg width="42" height="42" viewBox="-21 -21 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="0" r="19" fill="${color}" stroke="white" stroke-width="2" />
                </svg>
                <div class="contacts-list-initial abs version-2-t7">${initial}</div>
            </div>
            <div class="contacts-list-info">
                <span class="version-2-t6">${name}</span>
                <span class="version-2-body">${mail}</span>
            </div>
        </button>
    </li>
    `;
}



