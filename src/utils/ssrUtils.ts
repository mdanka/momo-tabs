import { createGenerateClassName } from "@material-ui/core/styles";
import { NavUtils, Page } from "./navUtils";
import { getSongWithPlaceholders } from "./songUtils";
import { IAppState } from "../store";

declare const __SERVER__: boolean;

export const isServer = () => {
    return __SERVER__;
};

export const getMuiJssProviderGenerateClassName = () => {
    return createGenerateClassName({ dangerouslyUseGlobalCSS: false, productionPrefix: "momotabs" });
};

export const getPageMetadata = (path: string, initialState: IAppState) => {
    const pageMaybe = NavUtils.pathToPage(path);
    const page = pageMaybe === undefined ? Page.Home : pageMaybe;
    let title = NavUtils.getNavUrlSimpleTitle[page];
    let description = "Easy-to-use and beautiful guitar tabs and chords for everyone.";
    const keywords = [
        "guitar",
        "tab",
        "tabs",
        "chord",
        "chords",
        "music",
        "score",
        "sheet",
        "gitár",
        "gitárkotta",
        "gitártab",
        "akkordok",
        "akkord",
    ];
    if (page === Page.Song) {
        const songPathMatch = NavUtils.getNavUrlMatch[Page.Song](path);
        if (songPathMatch !== null) {
            const songId = songPathMatch.params.id;
            if (songId !== undefined) {
                const song = initialState.songs[songId];
                if (song !== undefined) {
                    title = NavUtils.getSongPageTitle(song);
                    const { title: fullSongTitle, artist: fullSongArtist } = getSongWithPlaceholders(song);
                    const { title: songTitle, artist: songArtist, content: songContent } = song;
                    description = `Easy-to-use and beautiful guitar tabs and chords for ${fullSongTitle} by ${fullSongArtist}. ${songContent}`;
                    keywords.push(songTitle, songArtist);
                }
            }
        }
    }
    return {
        title,
        description,
        keywords,
    };
};
