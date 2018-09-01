export type IUser = firebase.User;

export interface ISongApi {
    title: string;
    artist: string;
    content: string;
    creatorUserId: string;
    creationTime: firebase.firestore.Timestamp;
}

export type ISongUpdateApi = Partial<Pick<ISongApi, "title" | "artist" | "content">>;
