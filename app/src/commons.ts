export type IUser = firebase.User | undefined;

export interface ISongApi {
    title: string;
    artist: string;
    content: string;
    creatorUserId: string;
    creationTime: firebase.firestore.Timestamp;
}
