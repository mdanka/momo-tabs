export namespace RegexUtils {
    export interface IRegexMatchRange {
        endIndex: number;
        startIndex: number;
        text: string;
    }

    export function findAllTextBlocks(text: string): IRegexMatchRange[] {
        const regexString = "[\\S]+";
        return findAllRegexRanges(regexString, text);
    }

    export function findAllRegexRanges(
        regexString: string,
        text: string,
        regexOverlapOffset?: number,
    ): IRegexMatchRange[] {
        const matches = findAllRegexMatches(regexString, text, regexOverlapOffset);
        const matchIndices = matches.map(match => {
            const wholeMatchString = match[0];
            return {
                endIndex: match.index + wholeMatchString.length,
                startIndex: match.index,
                text: wholeMatchString,
            };
        });
        return matchIndices;
    }

    function findAllRegexMatches(
        regexString: string,
        text: string,
        regexOverlapOffset?: number, // sometimes a space is consumed after matching
    ) {
        const regexp = new RegExp(regexString, "gi");
        regexp.lastIndex = 0;
        const matches = [];
        let match = regexp.exec(text);
        while (match !== null) {
            matches.push(match);
            if (regexOverlapOffset != null) {
                regexp.lastIndex = regexp.lastIndex - regexOverlapOffset;
            }
            match = regexp.exec(text);
        }
        return matches;
    }
}
