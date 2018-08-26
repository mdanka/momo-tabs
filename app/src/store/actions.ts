import { TypedAction } from "redoodle";
import { IUser, ISongApi } from "../commons";
import { ISongsState } from "./state";

export const SetCurrentUser = TypedAction.define("GUITAR//SET_CURRENT_USER")<{
    currentUser: IUser | undefined;
}>();

export const SetSongs = TypedAction.define("GUITAR//SET_SONGS")<{
    songs: ISongsState;
}>();

export const SetEditedSong = TypedAction.define("GUITAR//SET_EDITED_SONG")<{
    editedSong: ISongApi | undefined;
}>();
