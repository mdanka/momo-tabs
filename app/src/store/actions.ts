import { TypedAction } from "redoodle";
import { ICurrentUserState } from "./state";

export const SetCurrentUser = TypedAction.define("GUITAR//SET_CURRENT_USER")<{
    currentUser: ICurrentUserState;
}>();
