import { GitHubService } from "../../services/github-service.js";
import { PhotosService } from "../../services/photos-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const gitHub = new GitHubService();
    const photo = new PhotosService();

    async function getUser(){
        return gitHub.getUser();
    }
    async function getFollowers(){
        return gitHub.getFollowers();
    }
    const user = await getUser();
    const profilePicture = document.querySelector("#profile-picture");
    const tagImg = document.querySelector('#profile-picture>img');
    var img = user.avatar_url;
    tagImg.setAttribute("src",img);
    const divHeader = document.querySelector('header>.container-fluid');
    const headerName = document.querySelector('#name-navbar');
    headerName.innerHTML = user.name;
    /*
    const infoElement = document.querySelector('#frame-info');
    const divInfoElement = document.createElement('div');
    divInfoElement.setAttribute("class", "first-img");
    const link1InfoElement = document.createElement('img');
    var url = await photo.getPhoto(1);
    url = url.url;
    link1InfoElement.setAttribute("src", url);
    divInfoElement.appendChild(link1InfoElement);
    
    const divInfo2Element = document.createElement('div');
    divInfo2Element.setAttribute("class", "second-img");
    const link2InfoElement = document.createElement('img');
    url = await photo.getPhoto(2);
    url = url.url;
    console.log(url);
    link2InfoElement.setAttribute("src", url);
    divInfo2Element.appendChild(link2InfoElement);

    infoElement.appendChild(divInfoElement);
    infoElement.appendChild(divInfo2Element);*/

    const nameElement = document.querySelector('#name');
    const h3Element = document.createElement("h3");
    h3Element.innerHTML = user.name;
    nameElement.appendChild(h3Element);
    const bioElement = document.querySelector('#bio');
    const pElement = document.createElement('p');
    pElement.innerHTML = user.bio;
    bioElement.appendChild(pElement); 
    
    console.log(user);

    const followers = await getFollowers();
    console.log(followers[6].login);
    const coworkerFirst = document.querySelector('.first-coleague');
    const linkFistImg = document.createElement('a');
    linkFistImg.setAttribute("href", followers[6].html_url);
    coworkerFirst.appendChild(linkFistImg);
    const imgFirstCow = document.querySelector('.first-coleague>img');
    
});