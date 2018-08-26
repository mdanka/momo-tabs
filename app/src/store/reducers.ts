import { setWith, TypedReducer } from "redoodle";
import { SetCurrentUser, SetSongs } from "./actions";
import { IAppState } from "./state";

export const appReducer = TypedReducer.builder<IAppState>()
    .withHandler(SetCurrentUser.TYPE, (state, payload) => {
        return setWith(state, {
            currentUser: payload.currentUser,
        });
    })
    .withHandler(SetSongs.TYPE, (state, payload) => {
        return setWith(state, {
            songs: payload.songs,
        });
    })
    .build();
