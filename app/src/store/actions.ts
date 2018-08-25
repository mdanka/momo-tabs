import { TypedAction } from "redoodle";
import { IUser } from "../commons";

export const SetCurrentUser = TypedAction.define("GUITAR//SET_CURRENT_USER")<{
    currentUser: IUser;
}>();
