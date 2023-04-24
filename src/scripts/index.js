let arrayFind = []
arrayFind = JSON.parse(localStorage.getItem('recentlyFound'));

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
    .then(function(response) {
        if (response.status !== 200) {
            throw new Error("Erro na requisição");
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        localStorage.setItem('userData', data.login)
        const userFind = [data.login, data.avatar_url];
        console.log(arrayFind);
            if (arrayFind?.length >= 3) {
                arrayFind.pop();
                arrayFind.unshift(userFind);
                localStorage.setItem('recentlyFound', JSON.stringify(arrayFind));
            } else {
                arrayFind.unshift(userFind);
                localStorage.setItem('recentlyFound', JSON.stringify(arrayFind));
            }
            localStorage.setItem('recentlyFound', JSON.stringify(arrayFind));
            // window.location.href = './src/pages/profile.html';
        })
        .catch(function(error) {
            console.log(error);
            // window.location.href = './src/pages/error.html';
        });
}

function fetchRecentUser() {
    const foundRecently = document.querySelector('.recently__found__container');
    const ul = document.querySelector('.recently__found__container > ul');
    const arrayFound = JSON.parse(localStorage.getItem('recentlyFound'));
    if (!arrayFound) {
        foundRecently.classList.add('hidden')
    } else {
        arrayFound.forEach(element => {
            foundRecently.classList.remove('hidden')
            const li = document.createElement('li');
            ul.appendChild(li)
            li.style.backgroundImage = `url(${element[1]})`

            li.addEventListener('click', () => {
                window.location.href = './src/pages/profile.html';
                localStorage.setItem('userData', element[0]);
            })
        });
    }
}


function init() {
    const userInput = document.querySelector('#user__input');

    userInput.focus();

    addingEventViewProfile(userInput);
    fetchRecentUser();
}

init();