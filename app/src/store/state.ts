import { ICurrentUser, ISong } from "../commons";

export interface IAppState {
    currentUser: ICurrentUser;
    songs: ISongsState;
}

export interface ISongsState {
    [id: string]: ISong | undefined;
}
