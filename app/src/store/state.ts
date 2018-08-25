import { IUser, ISong } from "../commons";

export interface IAppState {
    currentUser: IUser;
    songs: ISongsState;
}

export interface ISongsState {
    [id: string]: ISong | undefined;
}
