import { IAppState, ISongsState } from "./state";
import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";
import { IUser, ISongApi } from "../commons";
import { AUTHORIZATION } from "../utils/authorizationUtils";

export const selectCurrentUser = (state: IAppState) => state.currentUser;

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
        return AUTHORIZATION.canEditSong(currentUser, song);
    },
)((_state: IAppState, id: string) => id);

export const selectCanCreateSong = createSelector(selectCurrentUser, (currentUser: IUser | undefined) => {
    return AUTHORIZATION.canCreateSong(currentUser);
});
