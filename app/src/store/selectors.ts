import { IAppState, ISongsState } from "./state";
import createCachedSelector from "re-reselect";
import { IUser, ISongApi } from "../commons";

export const selectCurrentUser = (state: IAppState) => state.currentUser;

export const selectEditedSong = (state: IAppState) => state.editedSong;

export const selectSongs = (state: IAppState) => state.songs;

export const selectSong = createCachedSelector(
    selectSongs,
    (_state: IAppState, id: string) => id,
    (songs: ISongsState, id: string) => {
        return songs[id];
    },
)((_state: IAppState, id: string) => id);

export const selectCanEditSong = createCachedSelector(
    selectCurrentUser,
    selectSong,
    (_state: IAppState, id: string) => id,
    (currentUser: IUser | undefined, song: ISongApi | undefined, _id: string) => {
        return currentUser !== undefined && song !== undefined && currentUser.uid === song.creatorUserId;
    },
)((_state: IAppState, id: string) => id);
