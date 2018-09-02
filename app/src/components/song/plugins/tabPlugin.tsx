import * as React from "react";
import { Node, Decoration, Block, RangeJSON, DecorationJSON } from "slate";
import { Plugin, RenderMarkProps } from "slate-react";
import { RegexUtils } from "../../../utils";

export type ITabPluginOptions = Partial<ITabPluginFullOptions>;

interface ITabPluginFullOptions {
    tabLineMarkType: string;
    tabValueMarkType: string;
    minHyphenCount: number;
}

const DEFAULT_OPTIONS: ITabPluginFullOptions = {
    tabLineMarkType: "tab-line",
    tabValueMarkType: "tab-value",
    minHyphenCount: 6,
};

const MARK_CLASS_NAMES = {
    [DEFAULT_OPTIONS.tabLineMarkType]: "slate-tab-plugin-tab-line",
    [DEFAULT_OPTIONS.tabValueMarkType]: "slate-tab-plugin-tab-value",
};

export function TabPlugin(options?: ITabPluginOptions): Plugin {
    const optionsWithDefaults: ITabPluginFullOptions = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

    const regexRangeToSlateRange = (key: string) => (regexRange: RegexUtils.IRegexMatchRange): RangeJSON => {
        const { startIndex, endIndex } = regexRange;
        return {
            anchor: {
                key,
                offset: startIndex,
            },
            focus: {
                key,
                offset: endIndex,
            },
        };
    };

    const slateRangeToDecoration = (markType: string) => (range: RangeJSON): DecorationJSON => {
        return {
            ...range,
            mark: {
                data: {},
                type: markType,
            },
        };
    };

    const regexRangeToDecoration = (key: string, markType: string) => (
        regexRange: RegexUtils.IRegexMatchRange,
    ): Decoration => {
        const slateRange = regexRangeToSlateRange(key)(regexRange);
        const decorationJson = slateRangeToDecoration(markType)(slateRange);
        return Decoration.fromJSON(decorationJson);
    };

    function isTabBlock(block: Block) {
        const textNodes = block.getTexts().toArray();
        const text = textNodes.map(t => t.text).join("\n");
        if (text.length === 0) {
            return false;
        }
        const hyphenCount = text.split("-").length - 1;
        return hyphenCount >= optionsWithDefaults.minHyphenCount;
    }

    function findLines(text: string) {
        const regexString = "[-]+";
        return RegexUtils.findAllRegexRanges(regexString, text);
    }

    function findValues(text: string) {
        const regexString = "[^-]+";
        return RegexUtils.findAllRegexRanges(regexString, text);
    }
    //tslint:disable
    return {
        renderMark: (props: RenderMarkProps) => {
            const { mark, children, attributes } = props;
            const { type } = mark;
            const { tabLineMarkType, tabValueMarkType } = optionsWithDefaults;
            console.log(mark);
            if (type !== tabLineMarkType && type !== tabValueMarkType) {
                return;
            }
            return (
                <span {...attributes} className={MARK_CLASS_NAMES[type]}>
                    {children}
                </span>
            );
        },
        decorateNode: (node: Node) => {
            if (!Block.isBlock(node) || node.type !== "line" || !isTabBlock(node)) {
                return;
            }
            console.log(node);
            const { tabLineMarkType, tabValueMarkType } = optionsWithDefaults;
            const textNodes = node.getTexts().toArray();
            console.log(textNodes);
            const decorations: Decoration[] = [];
            textNodes.forEach(textNode => {
                const { key, text } = textNode;
                if (key === undefined) {
                    console.error("[TabPlugin] Text node key shouldn't be undefined");
                    return [];
                }
                const lineDecorations = findLines(text).map(regexRangeToDecoration(key, tabLineMarkType));
                const valueDecorations = findValues(text).map(regexRangeToDecoration(key, tabValueMarkType));
                decorations.push(...lineDecorations, ...valueDecorations);
            });
            console.log(decorations);
            return decorations;
        },
    };
}
