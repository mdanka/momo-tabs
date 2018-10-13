import { IAppState, ISongsState } from "./state";
import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";
import { IUser, ISongApi, ISong } from "../commons";
import { AUTHORIZATION } from "../utils";

export const selectCurrentUser = (state: IAppState) => state.currentUser;

export const selectSongs = (state: IAppState) => state.songs;

export const selectSongsList = createSelector(
    selectSongs,
    (songs: ISongsState): ISong[] => {
        return Object.keys(songs)
            .map(songId => {
                const song = songs[songId];
                return song === undefined ? undefined : { id: songId, ...song };
            })
            .filter(song => song !== undefined) as ISong[];
    },
);

export const selectSongsOrderedByCreationTimeDesc = createSelector(selectSongsList, (songs: ISong[]) => {
    return songs.sort((a: ISong, b: ISong) => {
        if (a.creationTime > b.creationTime) {
            return -1;
        } else if (a.creationTime < b.creationTime) {
            return 1;
        } else {
            return 0;
        }
    });
});

export const selectSong = createCachedSelector(
    selectSongs,
    (_state: IAppState, id: string) => id,
    (songs: ISongsState, id: string) => {
        return songs[id];
    },
)((_state: IAppState, id: string) => id);

export const selectCanCreateSong = createSelector(selectCurrentUser, (currentUser: IUser | undefined) => {
    return AUTHORIZATION.canCreateSong(currentUser);
});

export const selectCanEditSong = createCachedSelector(
    selectCurrentUser,
    selectSong,
    (_state: IAppState, id: string) => id,
    (currentUser: IUser | undefined, song: ISongApi | undefined, _id: string) => {
        return AUTHORIZATION.canEditSong(currentUser, song);
    },
)((_state: IAppState, id: string) => id);

export const selectCanDeleteSong = createCachedSelector(
    selectCurrentUser,
    selectSong,
    (_state: IAppState, id: string) => id,
    (currentUser: IUser | undefined, song: ISongApi | undefined, _id: string) => {
        return AUTHORIZATION.canDeleteSong(currentUser, song);
    },
)((_state: IAppState, id: string) => id);
