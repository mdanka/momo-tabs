// const BASE_NOTES = ["A", "B", "C", "D", "E", "F", "G"];
// const ACCIDENTALS = ["#", "b"];
export const NOTES = ["Ab", "A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#"];
const CHORDS: string[] = [];
NOTES.forEach(note => {
    CHORDS.push(note, `${note}5`, `${note}7`, `${note}m`, `${note}m7`, `${note}maj7`);
});
