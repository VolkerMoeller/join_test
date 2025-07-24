async function initLogIn() {
    await includeHTML();
    animLogo();
}

function animLogo() {
    const ovlAnim = document.querySelector('.ovl-anim');
    ovlAnim.classList.add('fst-page-bg-anim');
}