function init() {
    activateBackButton();
}

function activateBackButton() {
    const backBtn = document.querySelector('.back__btn--error');

    backBtn.addEventListener('click', () => {
        window.location.href = '../../index.html';
    })
}

init();