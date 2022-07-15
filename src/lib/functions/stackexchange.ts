import axios, { type AxiosResponse } from 'axios';

// tslint:disable-next-line:max-classes-per-file
export default class StackExchangeApi {
  public async getInfoAsString(): Promise<string> {
    const [userResp, questionsResp, answersResp] = await Promise.all([
      this.getUser(),
      this.getQuestionCount(),
      this.getAnswerCount()
    ]);

    return `\nMy StackOverflow profile:\n\
                \tUsername: ${userResp.data.items[0].display_name}\n\
                \tNo. of badges:\n\
                \t\tGold: ${userResp.data.items[0].badge_counts.gold}\n\
                \t\tSilver: ${userResp.data.items[0].badge_counts.silver}\n\
                \t\tBronze: ${userResp.data.items[0].badge_counts.bronze}\n\
                \tNo. of questions asked: ${questionsResp.data.items.length}\n\
                \tNo. of answers given: ${answersResp.data.items.length}`
  }

  private async getUser(): Promise<AxiosResponse<any, any>> {
    // tslint:disable-next-line:max-line-length
    return await axios.get(
      'https://api.stackexchange.com/2.2/users/2593209?order=desc&sort=reputation&site=stackoverflow'
    );
  }

  private async getQuestionCount(): Promise<AxiosResponse<any, any>> {
    // tslint:disable-next-line:max-line-length
    return await axios.get(
      'https://api.stackexchange.com/2.2/users/2593209/questions?order=desc&sort=activity&site=stackoverflow'
    );
  }

  private async getAnswerCount(): Promise<AxiosResponse<any, any>> {
    // tslint:disable-next-line:max-line-length
    return await axios.get(
      'https://api.stackexchange.com/2.2/users/2593209/answers?order=desc&sort=activity&site=stackoverflow'
    );
  }
}
