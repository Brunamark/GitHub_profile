import { GitHubService } from "../../services/github-service.js";
import { PhotosService } from "../../services/photos-service.js";
import { StorageService } from "../../services/localStorage-service.js";
import { LinksService } from "../../services/links-service.js"


document.addEventListener('DOMContentLoaded', async function () {
    const gitHub = new GitHubService();
    const photo = new PhotosService();
    const links = new LinksService();


    async function getUser() {
        return gitHub.getUser();
    }
    async function getFollowers() {
        return gitHub.getFollowers();
    }
    async function getRepositories() {
        return gitHub.getRepositories();
    }
    async function getLink(id) {
        return links.getLink(id);
    }
    async function getPhoto(id) {
        return photo.getPhoto(id);
    }

    const user = await getUser();
    const profilePicture = document.querySelector("#profile-picture");
    const tagImg = document.querySelector('#profile-picture>img');
    var img = user.avatar_url;
    tagImg.setAttribute("src", img);
    const divHeader = document.querySelector('header>.container-fluid');
    const headerName = document.querySelector('#name-navbar');
    headerName.innerHTML = user.name;


    const nameElement = document.querySelector('#name');
    const h3Element = document.createElement("h3");
    h3Element.innerHTML = user.name;

    nameElement.appendChild(h3Element);

    const bioElement = document.querySelector('#bio');
    const divBio = document.createElement('div');
    divBio.setAttribute("class", "d-flex flex-column");
    const pElement = document.createElement('p');
    pElement.innerHTML = user.bio;
    divBio.appendChild(pElement);
    bioElement.appendChild(divBio);

    const location = document.createElement('p');
    location.innerHTML = user.location;
    divBio.appendChild(location);
    bioElement.appendChild(divBio);

    const followersOwner = document.createElement('p');
    followersOwner.innerHTML = `Seguidores: ${user.followers}`;
    divBio.appendChild(followersOwner);
    bioElement.appendChild(divBio);


    const containerRepo = document.querySelector('.repo>#container');
    const repositories = await getRepositories();
    repositories.map(async (currentValue, index) => {
        const divRepo = document.createElement('div');
        divRepo.setAttribute("id", index);
        divRepo.setAttribute("class", "card-repo col-xs-1 col-md-3 col-sm-5 col-lg-5  border border-light ms-3 me-2 my-3 p-2");
        const linkRepo = document.createElement('a');
        linkRepo.setAttribute("href", "");
        const divContent = document.createElement('div');
        divContent.setAttribute("class", "content-repo d-flex flex-column justify-content-end h-70");
        const nameRepoElement = document.createElement('h3');
        nameRepoElement.innerHTML = currentValue.name;
        nameRepoElement.setAttribute("class", "d-flex justify-content-center border border-ligh");
        const descriptionRepoElement = document.createElement('p');
        descriptionRepoElement.setAttribute("class", "d-flex justify-content-center");
        if (currentValue.name.toLowerCase() === currentValue.owner.login.toLowerCase()) {
            descriptionRepoElement.innerHTML = "README.md";
        } else {
            descriptionRepoElement.innerHTML = currentValue.description;
        }

        linkRepo.appendChild(nameRepoElement);
        divRepo.appendChild(linkRepo);
        divContent.appendChild(descriptionRepoElement);

        const imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "d-flex flex-row align-items-center justify-content-between");
        imgDiv.setAttribute("id", "star-content");
        const divContentRepo = document.createElement('div');
        divContentRepo.setAttribute("id", "starred");
        divContentRepo.setAttribute("class", "d-flex flex-row align-items-center");
        const imgStar = document.createElement('img');

        imgStar.setAttribute("src", "../../assets/img/star.svg");
        divContentRepo.appendChild(imgStar);

        const qntStar = document.createElement('p');
        qntStar.innerHTML = currentValue.stargazers_count;

        const pictureOwner = document.createElement('div');
        pictureOwner.setAttribute("class", "d-flex flex-row");
        const imgPictureOwner = document.createElement('img');
        pictureOwner.setAttribute("class", "picture-fork d-flex flex-row");
        imgPictureOwner.setAttribute("src", "../../assets/img/fork.svg");
        const numFork = document.createElement('p');
        numFork.innerHTML = currentValue.fork;

        pictureOwner.appendChild(numFork);
        pictureOwner.appendChild(imgPictureOwner);

        divContentRepo.appendChild(qntStar);
        imgDiv.appendChild(divContentRepo);
        imgDiv.appendChild(pictureOwner);
        divContent.appendChild(imgDiv);
        divRepo.appendChild(divContent);

        containerRepo.appendChild(divRepo);

        nameRepoElement.addEventListener('click', () => {
            StorageService.saveData("repo", currentValue);
            linkRepo.setAttribute("href", "../../view/repo.html");
            divRepo.appendChild(nameRepoElement);

        });

    });


    const carouselInner = document.querySelector('#carouselExampleCaptions>.carousel-inner');
    const carouselPrev = document.querySelector('#carouselExampleCaptions .carousel-control-prev');
    const carouselNext = document.querySelector('#carouselExampleCaptions .carousel-control-next');


    const vectorCarousel = new Array(5).fill(null);
    var i = 4;
    var cont = 1;
    async function createCarouselItem(index) {
        const divCarousel = document.createElement('div');
        divCarousel.setAttribute("class", `carousel-item ${index === 0 ? 'active' : ''} d-flex justify-content-center align-items-center`);

        const aTagCarousel = document.createElement('a');
        var linkCarousel = await getLink(i + index);
        aTagCarousel.setAttribute('href', linkCarousel.url);

        const imgCarousel = document.createElement('img');
        var img = await getPhoto(cont + index);
        imgCarousel.setAttribute("src", img.url);
        imgCarousel.setAttribute("class", "d-block w-100");

        aTagCarousel.appendChild(imgCarousel);
        divCarousel.appendChild(aTagCarousel);
        return divCarousel;
    }
    async function initializeCarousel() {
        for (let index = 0; index < vectorCarousel.length; index++) {
            const carouselItem = await createCarouselItem(index);
            carouselInner.appendChild(carouselItem);
        }
    }

    initializeCarousel();

    carouselPrev.addEventListener('click', async function () {
        const currentActive = document.querySelector('#carouselExampleCaptions .carousel-item.active');
        const prevSibling = currentActive.previousElementSibling || carouselInner.lastElementChild;
        currentActive.classList.remove('active');
        prevSibling.classList.add('active');
    });

    carouselNext.addEventListener('click', async function () {
        const currentActive = document.querySelector('#carouselExampleCaptions .carousel-item.active');
        const nextSibling = currentActive.nextElementSibling || carouselInner.firstElementChild;
        currentActive.classList.remove('active');
        nextSibling.classList.add('active');
    });

    const followers = await getFollowers();
    const coworkerFirst = document.querySelector('.first-coleague');
    const linkFistImg = document.querySelector('.first-coleague>img');
    linkFistImg.setAttribute("src", followers[6].avatar_url);
    coworkerFirst.appendChild(linkFistImg);
    var nameCoworker = document.createElement('p');
    nameCoworker.innerHTML = followers[6].login;
    coworkerFirst.append(nameCoworker);

    const coworkerSecond = document.querySelector('.second-coleague');
    const linkSecondImg = document.querySelector('.second-coleague>img');
    linkSecondImg.setAttribute("src", followers[8].avatar_url);
    coworkerSecond.appendChild(linkSecondImg);
    nameCoworker = document.createElement('p');
    nameCoworker.innerHTML = followers[8].login;
    coworkerSecond.append(nameCoworker);

    const coworkerThird = document.querySelector('.third-coleague');
    const linkThirdImg = document.querySelector('.third-coleague>img');
    linkThirdImg.setAttribute("src", followers[3].avatar_url);
    coworkerThird.appendChild(linkThirdImg);
    nameCoworker = document.createElement('p');
    nameCoworker.innerHTML = followers[3].login;
    coworkerThird.append(nameCoworker);

    const coworkerFourth = document.querySelector('.fourth-coleague');
    const linkFourthImg = document.querySelector('.fourth-coleague>img');
    linkFourthImg.setAttribute("src", followers[5].avatar_url);
    coworkerFourth.appendChild(linkFourthImg);
    nameCoworker = document.createElement('p');
    nameCoworker.innerHTML = followers[5].login;
    coworkerFourth.append(nameCoworker);

    const coworkerFifith = document.querySelector('.fifith-coleague');
    const linkFifithImg = document.querySelector('.fifith-coleague>img');
    linkFifithImg.setAttribute("src", followers[7].avatar_url);
    coworkerFifith.appendChild(linkFifithImg);
    nameCoworker = document.createElement('p');
    nameCoworker.innerHTML = followers[7].login;
    coworkerFifith.append(nameCoworker);


});