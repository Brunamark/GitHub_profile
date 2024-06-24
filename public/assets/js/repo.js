import { GitHubService } from "../../services/github-service.js";
import { PhotosService } from "../../services/photos-service.js";
import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const gitHub = new GitHubService();
    const photo = new PhotosService();

    async function getUser() {
        return gitHub.getUser();
    }
    async function getFollowers() {
        return gitHub.getFollowers();
    }
    async function getRepositories() {
        return gitHub.getRepositories();
    }
    const user = await getUser();
    const repos = StorageService.loadData("repo");
    const headerName = document.querySelector('#name-navbar');
    headerName.innerHTML = user.name;
    headerName.setAttribute("href", "../../view/index.html");
    console.log(repos);
    const section = document.querySelector('.repository');
    const titleRepo = document.createElement('h2');
    titleRepo.innerHTML = `Repository: ${repos.name}`;
    titleRepo.setAttribute("class", "mt-5");
    section.appendChild(titleRepo);

    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "d-flex flex-row align-items-center mt-4");
    imgDiv.setAttribute("id", "star-content");
    const divContentRepo = document.createElement('div');
    divContentRepo.setAttribute("id", "starred");
    divContentRepo.setAttribute("class", "d-flex flex-row align-items-center ms-5");
    const imgStar = document.createElement('img');

    imgStar.setAttribute("src", "../../assets/img/star.svg");
    divContentRepo.appendChild(imgStar);

    const qntStar = document.createElement('p');
    qntStar.innerHTML = repos.stargazers_count;

    const pictureOwner = document.createElement('div');
    pictureOwner.setAttribute("class", "d-flex flex-row align-items-center  mt-4");
    const imgPictureOwner = document.createElement('img');
    pictureOwner.setAttribute("class", "picture-fork d-flex flex-row ms-5");
    imgPictureOwner.setAttribute("src", "../../assets/img/fork.svg");
    const numFork = document.createElement('p');
    numFork.innerHTML = repos.forks_count;

    pictureOwner.appendChild(numFork);
    pictureOwner.appendChild(imgPictureOwner);

    divContentRepo.appendChild(qntStar);
    imgDiv.appendChild(divContentRepo);
    imgDiv.appendChild(pictureOwner);
    section.appendChild(imgDiv);

    var titleDescription = document.createElement('h3');
    titleDescription.innerHTML = "Descrição";

    titleDescription.setAttribute("class", "ms-4 mt-5");
    titleDescription.setAttribute("id", "description-title ");

    const pDescription = document.createElement('p');
    pDescription.innerHTML = repos.description;

    pDescription.setAttribute("class", "ms-5");

    section.appendChild(titleDescription);
    section.appendChild(pDescription);

    const navFirst = document.querySelector('.nav-link1');
    navFirst.setAttribute("href", '#description-title');

    titleDescription = document.createElement('h3');
    titleDescription.innerHTML = "Data de Criação";

    titleDescription.setAttribute("class", "ms-4 mt-5");
    titleDescription.setAttribute("id", "date-title");

    const navSecond = document.querySelector('.nav-link2');
    navSecond.setAttribute("href", '#date-title');
    navSecond.setAttribute("class", "ms-3");



    const pDate = document.createElement('p');
    pDate.innerHTML = repos.created_at;

    pDate.setAttribute("class", "ms-5");
    section.appendChild(titleDescription);
    section.appendChild(pDate);


    titleDescription = document.createElement('h3');
    titleDescription.innerHTML = "Linguagem";

    titleDescription.setAttribute("class", "ms-4 mt-5");
    titleDescription.setAttribute("id", "language-title");

    const navThird = document.querySelector('.nav-link3');
    navThird.setAttribute("href", '#language-title');
    navThird.setAttribute("class", "ms-3");

    const pLang = document.createElement('p');
    pLang.innerHTML = repos.language;


    pLang.setAttribute("class", "ms-5");
    section.appendChild(titleDescription);
    section.appendChild(pLang);

    titleDescription = document.createElement('h3');
    titleDescription.innerHTML = "Link de Acesso";
    titleDescription.setAttribute("class", " ms-4 mt-5");

    const aHref = document.createElement('a');
    aHref.setAttribute("href", repos.html_url);
    aHref.setAttribute("class", "link");
    const pLink = document.createElement('p');
    pLink.setAttribute("class", " ms-5");


    pLink.innerHTML = repos.html_url;
    aHref.appendChild(pLink);
    section.appendChild(titleDescription);
    section.appendChild(aHref);

    titleDescription = document.createElement('h3');
    titleDescription.innerHTML = "Tópicos";
    titleDescription.setAttribute("class", " ms-4 mt-5");
    section.appendChild(titleDescription);

    const divBtn = document.createElement("div");
    divBtn.setAttribute("class", "div-btn d-flex flex-row");
    var topics = repos.topics;
    console.log("topics", topics);
    topics.map(async (currentValue, index) => {

        const btn = document.createElement('button');
        btn.setAttribute("class", "btn btn-dark mx-3 mt-2 ms-4 fs-5");
        btn.innerHTML = currentValue;
        divBtn.appendChild(btn);
        section.appendChild(divBtn);

    });
    


});