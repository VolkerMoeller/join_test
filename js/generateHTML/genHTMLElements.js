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


function genHTMLContactsListBtn(indexTab, color, initial, name, mail, state, i, contactId) {
    return `
    <li >
        <div class="contacts-list-index-tab ${state}">
            <div class="contacts-list-index">${indexTab}</div>
            <p class="contacts-list-vector"></p>
        </div>
        <button id="contactsListBtn${i}" class="contacts-list-btn" onclick="initClickedContactBtn(${i}, '${contactId}')">
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



function genHTMLFloatingContact(color, initial, name, email, phone) {
    return `
    <div class="floating-contact anim-float-contact">
        <div class="floating-contact-header">
            <div class="floating-contact-badge rel">
                <svg class="floating-contact-badge-svg" viewBox="-60 -60 120 120"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="0" r="57" fill="${color}" stroke="white" stroke-width="3" />
                </svg>
                <div class="floating-contact-initial abs version-2-t2">${initial}</div>
            </div>
            <div class="floating-contact-header-right">
                <span class="version-2-t2">${name}</span>
                <div class="floating-contact-header-panel">
                    <div class="floating-contact-header-panel-icon-hover-container rel">
                        <button class="floating-contact-header-panel-btn abs">
                            <div class="floating-contact-header-panel-icon version-2-body">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_390515_4485" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="var(--drop-down-icon)" />
                                    </mask>
                                    <g mask="url(#mask0_390515_4485)">
                                        <path
                                            d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                            fill="var(--main)" />
                                    </g>
                                </svg>                                                             
                            </div>
                            <span class="version-2-body">Edit</span>
                        </button>
                    </div>
                <div class="rel">
                    <div class="floating-contact-header-panel-icon-hover-container rel">
                        <button class="floating-contact-header-panel-btn abs">
                            <div class="floating-contact-header-panel-icon version-2-body">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_390515_3988" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="var(--drop-down-icon)" />
                                    </mask>
                                    <g mask="url(#mask0_390515_3988)">
                                        <path class="contact-icon-svg"
                                            d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" />
                                    </g>
                                </svg>
                            </div>
                            <span class="version-2-body">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="floating-contact-title"><span class="version-2-t6">Contact Information</span></div>
        <div class="floating-contact-info">
            <div class="floating-contact-mail">
                <span class="version-btn-2nd">Email</span>
                <span class="version-2-body">${email}</span>
            </div>
            <div class="floating-contact-phone">
                <span class="version-btn-2nd">Phone</span>
                <span class="version-2-body">${phone}</span>
            </div>
        </div>
    </div>
    `;
}

function genHTMLFormAddTask(float = '') {
    return `
    <form id="formAddTask" class="form-add ${float}" onsubmit="initCreateNewTask(); return false;">
        <div class="form-title-v2">
            <h1>Add Task</h1>
        </div>
        <div id="formInputsFrameContainer" class="form-inputs-frame-container">
            <div class="form-inputs-frame-v2">
                <div class="form-inputs-v2">
                    <div class="housing-input">
                        <label for="title">Title<span>*</span></label>
                        <div class="input-container">
                            <input class="version-2-t6" type="text" id="title" name="title" placeholder="Enter a title"
                                autocomplete="off" required onkeyup="enableBtnIfFormFilled()">
                        </div>
                        <span class="version-warning-V2 ghost">ghost</span>
                    </div>
                </div>
                <div class="form-inputs-v2">
                    <div class="housing-input">
                        <label for="description">Description</label>
                        <div class="input-container">
                            <textarea class="version-2-t6" type="text" id="description" name="description"
                                placeholder="Enter a description" autocomplete="off"></textarea>
                            <div class="input-container-icon description-icon">
                                <div w3-include-svg-2nd="./assets/img/svgHTML/33-recurso.html"></div>
                            </div>
                        </div>
                        <span class="version-warning-V2 ghost">ghost</span>
                    </div>
                </div>
                <div class="form-inputs-v2">
                    <div class="housing-input">
                        <label for="dueDate">Due date<span>*</span></label>
                        <div class="input-container">
                            <input class="version-2-t6" type="text" id="dueDate" name="dueDate" placeholder="dd/mm/yyyy"
                                pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}" autocomplete="off"
                                required onkeyup="enableBtnIfFormFilled()">
                            <div class="input-container-icon" onclick="focusInput('dueDate')">
                                <div w3-include-svg-2nd="./assets/img/svgHTML/34-event.html"></div>
                            </div>
                        </div>
                        <span class="version-warning-V2 ghost">ghost</span>
                    </div>
                </div>
            </div>
            <p class="add-task-vector"></p>
            <div class="form-inputs-frame-v3">
                <div class="form-inputs-v3">
                    <div class="housing-fieldset">
                        <fieldset class="priority-list">
                            <legend class="version-2-t6">Priority</legend>
                            <div class="radio-frame radio-urgent">
                                <input type="radio" id="urgentBtn" name="priority" value="urgent" />
                                <label class="label-frame" for="urgentBtn">
                                    <span>Urgent</span>
                                    <div class="prioAlta" w3-include-svg-2nd="./assets/img/svgHTML/35-prioAlta.html"></div>
                                </label>
                            </div>
                            <div class="radio-frame radio-medium">
                                <input type="radio" id="mediumBtn" name="priority" value="medium" checked />
                                <label class="label-frame" for="mediumBtn">
                                    <span>Medium</span>
                                    <div class="prioMedia" w3-include-svg-2nd="./assets/img/svgHTML/36-prioMedia.html">
                                    </div>
                                </label>
                            </div>
                            <div class="radio-frame radio-low">
                                <input type="radio" id="lowBtn" name="priority" value="low" />
                                <label class="label-frame" for="lowBtn">
                                    <span>Low</span>
                                    <div class="prioBaja" w3-include-svg-2nd="./assets/img/svgHTML/37-prioBaja.html"></div>
                                </label>
                            </div>
                        </fieldset>
                        <span class="version-warning-V2 ghost">ghost</span>
                    </div>
                </div>
                <div id="assignedInputs" class="form-inputs-v2">
                    <div class="housing-input">
                        <label for="assigned">Assigned to</label>
                        <div id="assignedContainer" class="input-container">
                            <input class="version-2-t6 select" type="text" id="assigned" name="assigned"
                                placeholder="Select contacts to assign" autocomplete="off"
                                onfocus="initFocusInputSelect('assigned')" onkeyup="searchContactsByInput()">
                                <div id="dropDownAssOpen" class="input-container-icon"
                                    onclick="initOnclickDropDownOpen('assigned')">
                                    <button type="button" type="button"
                                        w3-include-svg-2nd="./assets/img/svgHTML/38-arrow_drop_down_open.html"></button>
                                </div>
                                <div id="dropDownAssClose" class="input-container-icon display-none"
                                    onclick="initOnclickDropDownClose('assigned')">
                                    <button type="button" type="button"
                                        w3-include-svg-2nd="./assets/img/svgHTML/39-arrow_drop_down_close.html"></button>
                                </div>
                        </div>
                        <div id="userContactList" class="user-contact-list"></div>
                        <div id="userContactBadges" class="user-contact-badges display-none"></div>
                    </div>
                    <span class="version-warning-V2 ghost">ghost</span>
                </div>
                <div id="categoryInputs" class="form-inputs-v2">
                    <div class="housing-input">
                        <label for="category">Category<span>*</span></label>
                        <div id="categoryContainer" class="input-container">
                            <input class="version-2-t6 select" type="text" id="category" name="category"
                                autocomplete="off" placeholder="Select task category" onclick="initFocusInputSelect('category')" required">
                                <div id="dropDownCatOpen" class="input-container-icon"
                                    onclick="initOnclickDropDownOpen('category')">
                                    <button type="button" type="button"
                                        w3-include-svg-2nd="./assets/img/svgHTML/38-arrow_drop_down_open.html"></button>
                                </div>
                                <div id="dropDownCatClose" class="input-container-icon display-none"
                                    onclick="initOnclickDropDownClose('category')">
                                    <button type="button" type="button"
                                        w3-include-svg-2nd="./assets/img/svgHTML/39-arrow_drop_down_close.html"></button>
                                </div>
                        </div>
                        <fieldset id="categoryList" class="category-list">
                            <div class="radio-frame">
                                <input type="radio" id="technicalTask" name="category" value="Technical Task"
                                    onclick="handleCategorySelection('Technical Task'); initOnclickDropDownClose('category')" />
                                <div class="label-frame">
                                    <label for="technicalTask">Technical Task</label>
                                </div>
                            </div>
                            <div class="radio-frame">
                                <input type="radio" id="userStory" name="category" value="User Story"
                                    onclick="handleCategorySelection('User Story'); initOnclickDropDownClose('category')" />
                                <div class="label-frame">
                                    <label for="userStory">User Story</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <span class="version-warning-V2 ghost">ghost</span>
                </div>
                <div class="form-inputs-v2">
                    <div class="housing-input">
                        <label for="title">Subtasks</label>
                        <div id="inputContainerSubtask" class="input-container">
                            <input class="version-2-t6" type="text" id="subtask" name="subtask"
                                placeholder="Add new subtask" autocomplete="off" onfocus="initShowSubtaskPanel('subtask')">
                            <div id="inputSubtaskPanel" class="input-subtask-panel subtask-panel-v1 display-none">
                                <div class="flx-cnt" onclick="closeSubtaskInput()"
                                    w3-include-svg-2nd="./assets/img/svgHTML/52-close_hvr.html">
                                </div>
                                <p class="subtask-vector"></p>
                                <div class="flx-cnt" w3-include-svg-2nd="./assets/img/svgHTML/51-check_hvr.html" onclick="initCreateNewSubtask()"></div>
                            </div>
                            <span class="version-warning-V2 ghost">ghost</span>
                        </div>
                        <div class="subtasks-list-container">
                            <ul id="subtaskListText" class="user-subtasks user-subtasks-list-text">
                            </ul>
                            <div id="subtaskListInput" class="user-subtasks user-subtasks-list-inputs">
                            </div>
                        </div>
                        <div class="footnote-mbl version-2-body">
                            <span class="version-warning-V2">*</span>This field is required
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-panel-add-task">
            <div class="hover-container-v3 rel">
                <button class="btn-wo-icn-2nd btn-wth-icn version-btn" type="button"
                    onclick="resetFormAddTask()">Clear
                    <div class="flx-cnt-btn-wth-icn" w3-include-svg-2nd="./assets/img/svgHTML/55-iconoir_cancel.html"></div>
                </button>
            </div>
            <div class="hover-container-v4 rel">
                <button id="submitBtnAddTask" class="btn-wo-icn btn-wth-icn version-btn" type="submit" 
                    onclick="getFormInputData()" disabled>Add Task
                    <div class="flx-cnt-btn-wth-icn" w3-include-svg-2nd="./assets/img/svgHTML/56-check_white.html"></div>
                </button>
            </div>
        </div>
        <div class="footnote-dsk version-2-body">
            <span class="version-warning-V2">*</span>This field is required
        </div>
    </form>
    `;
}