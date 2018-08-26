import { IUser, ISongApi } from "../commons";

export const AUTHORIZATION = {
    canCreateSong: (user: IUser | undefined) => user !== undefined,
    canEditSong: (user: IUser | undefined, song: ISongApi | undefined) =>
        user !== undefined && song !== undefined && user.uid === song.creatorUserId,
    canDeleteSong: (user: IUser | undefined, song: ISongApi | undefined) => AUTHORIZATION.canEditSong(user, song),
};
