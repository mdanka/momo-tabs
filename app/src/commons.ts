export type IUser = firebase.User | undefined;

export interface ISong {
    title: string;
    artist: string;
    content: string;
}

export interface ISongApi extends ISong {
    creatorUserId: string;
    creationTime: Date;
}
