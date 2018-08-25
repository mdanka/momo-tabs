import { IAppState } from "./state";

export const currentUserSelector = (state: IAppState) => state.currentUser;
