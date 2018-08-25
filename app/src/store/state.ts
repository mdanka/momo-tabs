export interface IAppState {
    currentUser: ICurrentUserState;
}

export type ICurrentUserState = firebase.User | undefined | null;
