function addingEventViewProfile(userInput) {
    const searchBtn = document.querySelector('.search__btn');

    searchBtn.addEventListener('click', () => {
        const user = userInput.value;
        gettingDataFromGithub(user);
        userInput.value = '';
    })

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const user = userInput.value;
            gettingDataFromGithub(user);
            userInput.value = '';
        }
    })
}

function gettingDataFromGithub(user) {
    const url = `https://api.github.com/users/${user}`;
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error("Erro na requisição");
            }
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem('userData', data.login)
            window.location.href = './src/pages/profile.html';
        })
        .catch(function (error) {
            window.location.href = './src/pages/error.html';
        });
}

function init() {
    const userInput = document.querySelector('#user__input');

    userInput.focus();

    addingEventViewProfile(userInput);
}

init();