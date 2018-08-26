import { ISongApi } from "../../commons";
import { DATA_SERVICE } from "../../services";

export const updateSong = (props: { id: string; song: ISongApi | undefined }, updates: Partial<ISongApi>) => {
    const { id, song } = props;
    if (song === undefined) {
        return;
    }
    const newSong = { ...song, ...updates };
    DATA_SERVICE.saveSong(id, newSong);
};

export const getSongWithPlaceholders = (song: { title: string; artist: string }) => {
    const { title, artist } = song;
    return {
        title: title === "" ? "Untitled" : title,
        artist: artist === "" ? "Unknown artist" : artist,
    };
};
