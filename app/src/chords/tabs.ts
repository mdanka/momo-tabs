import { ContentBlock, ContentState } from "draft-js";
// tslint:disable-next-line:no-submodule-imports
import flatMap = require("lodash/flatMap");
import { Utils } from "../utils/utils";

export class Tabs {
    public static tabBackgroundDecoratorStrategy = (
        contentBlock: ContentBlock,
        callback: (start: number, end: number) => void,
        contentState: ContentState,
    ) => {
        if (!Tabs.isContentBlockTabBlock(contentBlock)) {
            return;
        }
        Tabs.findAllHyphenBlocks(contentBlock.getText()).forEach((range) => {
            callback(range.startIndex, range.endIndex);
        });
    }

    public static tabContentDecoratorStrategy = (
        contentBlock: ContentBlock,
        callback: (start: number, end: number) => void,
        contentState: ContentState,
    ) => {
        if (!Tabs.isContentBlockTabBlock(contentBlock)) {
            return;
        }
        Tabs.findAllContentBlocks(contentBlock.getText()).forEach((range) => {
            callback(range.startIndex, range.endIndex);
        });
    }

    private static MIN_HYPHEN_COUNT = 6;

    private static isContentBlockTabBlock = (contentBlock: ContentBlock) => {
        const text = contentBlock.getText();
        if (text.length === 0) {
            return false;
        }
        const hyphenCount = (text.split("-").length - 1);
        return hyphenCount > Tabs.MIN_HYPHEN_COUNT;
    }

    private static findAllHyphenBlocks = (text: string) => {
        const regexString = "[-]+";
        return Utils.findAllRegexRanges(regexString, text);
    }

    private static findAllContentBlocks = (text: string) => {
        const regexString = "[^-]+";
        return Utils.findAllRegexRanges(regexString, text);
    }
}
