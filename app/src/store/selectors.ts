import { IAppState } from "./state";

export const selectCurrentUser = (state: IAppState) => state.currentUser;
