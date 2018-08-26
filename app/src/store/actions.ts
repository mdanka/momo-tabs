import { TypedAction } from "redoodle";
import { IUser } from "../commons";
import { ISongsState } from "./state";

export const SetCurrentUser = TypedAction.define("GUITAR//SET_CURRENT_USER")<{
    currentUser: IUser | undefined;
}>();

export const SetSongs = TypedAction.define("GUITAR//SET_SONGS")<{
    songs: ISongsState;
}>();
