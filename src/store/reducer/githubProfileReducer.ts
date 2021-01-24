export type GithubProfileState = {
    total_count: number;
    items: login[]
}

export type login = {
    login: string;
    avatar_url: string;
    html_url: string;
}
const initalState: GithubProfileState = {
    total_count: 0,
    items: []
}

export const GithubProfileReducer = (state: GithubProfileState = initalState, action: any): GithubProfileState => {
    switch (action.type) {
        case 'ADD_USER_FULLFIELD':
            return { ...state, ...action.payload }
        default: return state;
    }
}