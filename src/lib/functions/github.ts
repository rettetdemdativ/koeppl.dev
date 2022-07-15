import axios from 'axios';

export default class GitHubApi {
  public async getGitHubReposAsString(): Promise<string> {
    const response = await axios.get('https://api.github.com/users/rettetdemdativ/repos');
    if (response.status == 200 || response.status == 201) {
      const responseSorted = response.data.sort((repo1: any, repo2: any) => {
        return repo1.stargazers_count - repo2.stargazers_count;
      });
      return responseSorted.reduce(
        (prev: string, curr: any) =>
          (prev += `\n${curr.name}\n\
                    \tDescription: ${curr.description}\n\
                    \tStargazers: ${curr.stargazers_count}`)
      );
    } else {
        return ""
    }
  }
}
