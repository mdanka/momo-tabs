import { ContentBlock, ContentState } from "draft-js";
// tslint:disable-next-line:no-submodule-imports
import flatMap = require("lodash/flatMap");
import { Utils } from "../utils/utils";

export class Chords {
    public static BASE_NOTES = ["A", "B", "C", "D", "E", "F", "G"];
    public static ACCIDENTALS = ["#", "b"];
    public static NOTES = [
        "Ab", "A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#",
    ];
    public static CHORDS: string[];

    public static initialize() {
        Chords.CHORDS = flatMap(Chords.NOTES, (note) => {
            return [note, note + "m"];
        });
    }

    public static chordDecoratorStrategy = (
        contentBlock: ContentBlock,
        callback: (start: number, end: number) => void,
        contentState: ContentState,
    ) => {
        if (!Chords.isContentBlockChordsBlock(contentBlock)) {
            return;
        }
        Utils.findAllTextBlocks(contentBlock.getText()).forEach((range) => {
            callback(range.startIndex, range.endIndex);
        });
    }

    private static isContentBlockChordsBlock = (contentBlock: ContentBlock) => {
        const text = contentBlock.getText();
        if (text.length === 0) {
            return false;
        }
        const tokens = text.split(" ");
        const textContainsChordsOnly = tokens.every(Chords.isChordOrEmpty);
        return textContainsChordsOnly;
    }

    private static isChord = (value: string) => {
        return Chords.CHORDS.indexOf(value) !== -1;
    }

    private static isChordOrEmpty = (value: string) => {
        return value.length === 0 || Chords.isChord(value);
    }

    private static findAllChords = (text: string) => {
        return Utils.findAllTextBlocks(text)
            .filter((range) => Chords.isChord(range.text));
    }
}

Chords.initialize();
