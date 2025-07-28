function animMessage() {
    toggleOverlay();
    slideMessage();
}

function slideMessage() {
    const message = document.querySelector('.msg-cnt');
    message.classList.toggle('show-msg-signPage');
}