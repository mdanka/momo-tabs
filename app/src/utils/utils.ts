export class Utils {
    public static findAllTextBlocks = (text: string) => {
        const regexString = "[\\S]+";
        return Utils.findAllRegexRanges(regexString, text);
    }

    public static findAllRegexRanges = (
        regexString: string,
        text: string,
        regexOverlapOffset?: number,
    ) => {
        const matches = Utils.findAllRegexMatches(regexString, text, regexOverlapOffset);
        const matchIndices = matches.map((match) => {
            const wholeMatchString = match[0];
            return {
                endIndex: match.index + wholeMatchString.length,
                startIndex: match.index,
                text: wholeMatchString,
            };
        });
        return matchIndices;
    }

    public static findAllRegexMatches = (
        regexString: string,
        text: string,
        regexOverlapOffset?: number,  // sometimes a space is consumed after matching
    ) => {
        const regexp = new RegExp(regexString, "gi");
        regexp.lastIndex = 0;
        const matches = [];
        let match = regexp.exec(text);
        while ((match) !== null) {
            matches.push(match);
            if (regexOverlapOffset != null) {
                regexp.lastIndex = regexp.lastIndex - regexOverlapOffset;
            }
            match = regexp.exec(text);
        }
        return matches;
    }
}
