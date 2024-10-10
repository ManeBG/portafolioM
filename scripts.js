const darkModeBtn = document.getElementById('dark-mode');
const langToggleBtn = document.getElementById('lang-toggle');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

langToggleBtn.addEventListener('click', () => {
    if (langToggleBtn.innerText === 'English') {
        langToggleBtn.innerText = 'Español';
    } else {
        langToggleBtn.innerText = 'English';
    }
});
