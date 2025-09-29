function genHTMLHovBtn(btnId, onclick) {
    return `
    <button id="${btnId}Hvr" class="display-none" onclick="${onclick}"
        onmouseleave="toggleElements('${btnId}','${btnId}Hvr')" w3-include-hvr-btn="./assets/img/svgHTML/6-leftArrowHover.html">
    </button>
    <button id="${btnId}" onmouseover="toggleElements('${btnId}','${btnId}Hvr')"
        w3-include-hvr-btn="./assets/img/svgHTML/7-leftArrow.html">
    </button>
  `;
}