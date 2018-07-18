// Author(s): Michael Koeppl

import axios from 'axios';

export default class GitHubApi {
    public getGitHubRepos(c: (repos: any[]) => void) {
        axios.get('https://api.github.com/users/calmandniceperson/repos').then((response) => {
            c(response.data.sort((repo1: any, repo2: any) => {
                return repo1.stargazers_count - repo2.stargazers_count;
            }));
        });
    }
}
