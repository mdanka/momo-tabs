import { TypedAction } from "redoodle";
import { ICurrentUser } from "../commons";

export const SetCurrentUser = TypedAction.define("GUITAR//SET_CURRENT_USER")<{
    currentUser: ICurrentUser;
}>();
