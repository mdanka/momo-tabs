import { IAppState, ISongsState } from "./state";
import createCachedSelector from "re-reselect";

export const selectCurrentUser = (state: IAppState) => state.currentUser;

export const selectSongs = (state: IAppState) => state.songs;

export const selectSong = createCachedSelector(
    selectSongs,
    (_state: IAppState, id: string) => id,
    (songs: ISongsState, id: string) => {
        return songs[id];
    },
)((_state: IAppState, id: string) => id);
