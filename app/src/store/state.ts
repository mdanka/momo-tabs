import { IUser, ISongApi } from "../commons";

export interface IAppState {
    currentUser: IUser | undefined;
    songs: ISongsState;
}

export interface ISongsState {
    [id: string]: ISongApi | undefined;
}
