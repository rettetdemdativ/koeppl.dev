// Author(s): Michael Koeppl

import axios from 'axios';

export class StackExchangeUser {
    public displayName: string;
    public badgeCountGold: number;
    public badgeCountSilver: number;
    public badgeCountBronze: number;
    public questionCount: number;
    public answerCount: number;

    constructor(
        displayName: string,
        badgeCountGold: number,
        badgeCountSilver: number,
        badgeCountBronze: number,
        questionCount: number,
        answerCount: number,
    ) {
        this.displayName = displayName;
        this.badgeCountGold = badgeCountGold;
        this.badgeCountSilver = badgeCountSilver;
        this.badgeCountBronze = badgeCountBronze;
        this.questionCount = questionCount;
        this.answerCount = answerCount;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class StackExchangeApi {
    public getInfo(c: (user: StackExchangeUser) => void) {
        let user: any = null;

        axios.all([this.getUser(), this.getQuestionCount(), this.getAnswerCount()])
        .then((axios.spread(((userResp, questionResp, answerResp) => {
            user = new StackExchangeUser(
                userResp.data.items[0].display_name,
                userResp.data.items[0].badge_counts.gold,
                userResp.data.items[0].badge_counts.silver,
                userResp.data.items[0].badge_counts.bronze,
                questionResp.data.items.length,
                answerResp.data.items.length,
            );
            c(user);
        }))));
    }

    private getUser() {
        // tslint:disable-next-line:max-line-length
        return axios.get('https://api.stackexchange.com/2.2/users/2593209?order=desc&sort=reputation&site=stackoverflow');
    }

    private getQuestionCount() {
        // tslint:disable-next-line:max-line-length
        return axios.get('https://api.stackexchange.com/2.2/users/2593209/questions?order=desc&sort=activity&site=stackoverflow');
    }

    private getAnswerCount() {
        // tslint:disable-next-line:max-line-length
        return axios.get('https://api.stackexchange.com/2.2/users/2593209/answers?order=desc&sort=activity&site=stackoverflow');
    }
}
