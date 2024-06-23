import { GitHubService } from "../../services/github-service.js";
import { PhotosService } from "../../services/photos-service.js";
import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const gitHub = new GitHubService();
    const photo = new PhotosService();

    async function getUser(){
        return gitHub.getUser();
    }
    async function getFollowers(){
        return gitHub.getFollowers();
    }
    async function getRepositories(){
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
    section.appendChild(titleRepo);

     


});