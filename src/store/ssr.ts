import { IAppState, ISongsState } from "./state";
import { ISongApi } from "../commons";
import * as firebase from "firebase/app";

export interface IWindowWithInitialState extends Window {
    __initialState: ISerializableAppState;
}

interface ISerializableAppState {
    currentUser: undefined;
    songs: ISerializableSongsState;
}

interface ISerializableSongsState {
    [id: string]: ISerializableSongApi | undefined;
}

interface ISerializableSongApi {
    title: string;
    artist: string;
    content: string;
    creatorUserId: string;
    creationTime: ISerializableTimestamp;
}

interface ISerializableTimestamp {
    seconds: number;
    nanoseconds: number;
}

export function stateToString(state: IAppState): string {
    return JSON.stringify(serializeAppState(state));
}

function serializeAppState(state: IAppState): ISerializableAppState {
    const { songs } = state;
    const serializableState = {
        currentUser: undefined,
        songs: serializeSongs(songs),
    };
    return serializableState;
}

function serializeSongs(state: ISongsState): ISerializableSongsState {
    const serializableSongs = {} as ISerializableSongsState;
    for (const songId in state) {
        const song = state[songId]!;
        serializableSongs[songId] = serializeSong(song);
    }
    return serializableSongs;
}

function serializeSong(song: ISongApi): ISerializableSongApi {
    const { creationTime } = song;
    return {
        ...song,
        creationTime: serializeTimestamp(creationTime),
    };
}

function serializeTimestamp(time: firebase.firestore.Timestamp): ISerializableTimestamp {
    return {
        seconds: time.seconds,
        nanoseconds: time.nanoseconds,
    };
}

export function stringToState(state: string): IAppState {
    return deserializeAppState(JSON.parse(state));
}

export function deserializeAppState(state: ISerializableAppState): IAppState {
    const { songs } = state;
    const serializableState = {
        currentUser: undefined,
        songs: deserializeSongs(songs),
    };
    return serializableState;
}

function deserializeSongs(state: ISerializableSongsState): ISongsState {
    const songs = {} as ISongsState;
    for (const songId in state) {
        const song = state[songId]!;
        songs[songId] = deserializeSong(song);
    }
    return songs;
}

function deserializeSong(song: ISerializableSongApi): ISongApi {
    const { creationTime } = song;
    return {
        ...song,
        creationTime: deserializeTimestamp(creationTime),
    };
}

function deserializeTimestamp(time: ISerializableTimestamp): firebase.firestore.Timestamp {
    const { seconds, nanoseconds } = time;
    return new firebase.firestore.Timestamp(seconds, nanoseconds);
}
