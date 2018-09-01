export const getSongWithPlaceholders = (song: { title: string; artist: string }) => {
    const { title, artist } = song;
    return {
        title: title === "" ? "Untitled" : title,
        artist: artist === "" ? "Unknown artist" : artist,
    };
};
