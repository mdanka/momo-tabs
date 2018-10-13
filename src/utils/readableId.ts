export class ReadableId {
    private static LENGTH = 10;
    private static ALPHABET = "23456789CFGHJMPQRVWX";
    private static ENCODING_BASE = ReadableId.ALPHABET.length;
    private static NUMBER_OF_OPTIONS = Math.pow(ReadableId.ENCODING_BASE, ReadableId.LENGTH);

    public static of = (value: string) => {
        return new ReadableId(value);
    };

    public static generate = () => {
        const randomNumber = Math.floor(Math.random() * ReadableId.NUMBER_OF_OPTIONS);
        return ReadableId.convertNumberToId(randomNumber);
    };

    private static convertNumberToId = (number: number) => {
        let id = "";
        let numberRemaining = number;
        while (numberRemaining > 0) {
            const numberModulus = numberRemaining % ReadableId.ENCODING_BASE;
            id = ReadableId.ALPHABET[numberModulus].concat(id);
            numberRemaining = Math.floor(numberRemaining / ReadableId.ENCODING_BASE);
        }
        const paddedId = ReadableId.padId(id);
        return paddedId;
    };

    private static padId = (id: string) => {
        let paddedId = id;
        while (paddedId.length < ReadableId.LENGTH) {
            paddedId = ReadableId.ALPHABET[0].concat(paddedId);
        }
        return paddedId;
    };

    private value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public get = () => {
        return this.value;
    };
}
