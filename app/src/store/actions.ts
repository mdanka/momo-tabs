import { TypedAction } from "redoodle";

export const SetCurrentUser = TypedAction.define("GUITAR//SET_CURRENT_USER")<{
    currentUser: string | undefined;
}>();
