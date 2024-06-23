export class GitHubService {
    
    constructor() {
     
        this.url = 'https://api.github.com/users/brunamark';
    }
    
    async getUser() { 
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error to fetch github:", error);
        }
    }
    async getFollowers(){
        try {
            const response = await fetch(`${this.url}/followers`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error to fetch github:", error);
        }
    }
    async getRepositories(pos) {
        try {
            const response = await fetch(`${this.url}/repos`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error to fetch github:", error);
        }
    }
}
