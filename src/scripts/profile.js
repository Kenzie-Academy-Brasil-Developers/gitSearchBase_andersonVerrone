function init() {
    activateBackButton();
    locatingUser();
    repositoryUser();
}

function locatingUser() {
    const user = localStorage.getItem('userData');
    const url = `https://api.github.com/users/${user}`;

    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const name = (data.name) ? data.name : data.login;
            const img = data.avatar_url;
            createUserInHtml(name, img);
        });
}

function createUserInHtml(name, img) {
    const imgContainer = document.querySelector('.profile__img');
    const nameContainer = document.querySelector('.user__profile > div > p');

    imgContainer.style.backgroundImage = `url(${img})`;
    nameContainer.innerHTML = name;
}

function repositoryUser() {
    const user = localStorage.getItem('userData');
    const url = `https://api.github.com/users/${user}/repos`;

    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.forEach(item => {
                const name = item.name;
                const description = (item.description) ? item.description : `Sem descrição`;
                const projectUrl = item.html_url;
                createRepositoryInHtml(name, description, projectUrl);
            });
        });
}

function createRepositoryInHtml(nameRepository, descriptionRepository, urlRepository) {
    const ul = document.querySelector('.projects__container');

    const li = document.createElement('li');
    ul.appendChild(li);
    li.classList.add('project');

    const title = document.createElement('h3');
    li.appendChild(title);
    title.innerHTML = styleString(nameRepository, 25);

    const description = document.createElement('p');
    li.appendChild(description);
    description.innerHTML = styleString(descriptionRepository, 92);

    const link = document.createElement('a');
    li.appendChild(link);
    link.classList.add('repository__btn');
    link.target = '_blank';
    link.href = urlRepository;
    link.innerHTML = 'Repositório';
}

function activateBackButton() {
    const backBtn = document.querySelector('.back__button--profile');

    backBtn.addEventListener('click', () => {
        window.location.href = '../../index.html';
    })
}

function styleString(string, number) {
    if (string.length > number) {
        return string.substring(0, number) + "...";
    }
    return string;
}

init();