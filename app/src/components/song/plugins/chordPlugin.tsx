import * as React from "react";
import { Node, Decoration, Block, RangeJSON, DecorationJSON } from "slate";
import { Plugin, RenderMarkProps, RenderNodeProps } from "slate-react";
import { RegexUtils } from "../../../utils";
import { ALL_CHORDS } from "./chordListModified";

export type IChordPluginOptions = Partial<IChordPluginFullOptions>;

interface IChordPluginFullOptions {
    chordMarkType: string;
}

const DEFAULT_OPTIONS: IChordPluginFullOptions = {
    chordMarkType: "chord",
};

const MARK_CLASS_NAMES = {
    [DEFAULT_OPTIONS.chordMarkType]: "slate-chord-plugin-chord",
};

const BLOCK_CLASS_NAME = "slate-chord-plugin-chord-block";

export function ChordPlugin(options?: IChordPluginOptions): Plugin {
    const optionsWithDefaults: IChordPluginFullOptions = {
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

    function isChordBlock(block: Block) {
        const textNodes = block.getTexts().toArray();
        const text = textNodes.map(t => t.text).join("\n");
        if (text.length === 0) {
            return false;
        }
        const tokens = text.split(" ").filter(token => token.length !== 0);
        const textContainsChordsOnly = tokens.length > 0 && tokens.every(isChord);
        return textContainsChordsOnly;
    }

    function findChords(text: string) {
        return RegexUtils.findAllTextBlocks(text);
    }

    function isChord(value: string) {
        return ALL_CHORDS.indexOf(value) !== -1;
    }

    return {
        renderMark: (props: RenderMarkProps) => {
            const { mark, children, attributes } = props;
            const { type } = mark;
            const { chordMarkType } = optionsWithDefaults;
            if (type !== chordMarkType) {
                return;
            }
            return (
                <span {...attributes} className={MARK_CLASS_NAMES[type]}>
                    {children}
                </span>
            );
        },
        renderNode: (props: RenderNodeProps) => {
            const { node, children, attributes } = props;
            if (!Block.isBlock(node) || node.type !== "line" || !isChordBlock(node)) {
                return;
            }
            return (
                <div {...attributes} className={BLOCK_CLASS_NAME}>
                    {children}
                </div>
            );
        },
        decorateNode: (node: Node) => {
            if (!Block.isBlock(node) || node.type !== "line" || !isChordBlock(node)) {
                return;
            }
            const { chordMarkType } = optionsWithDefaults;
            const textNodes = node.getTexts().toArray();
            const decorations: Decoration[] = [];
            textNodes.forEach(textNode => {
                const { key, text } = textNode;
                if (key === undefined) {
                    console.error("[ChordPlugin] Text node key shouldn't be undefined");
                    return [];
                }
                const chordDecorations = findChords(text).map(regexRangeToDecoration(key, chordMarkType));
                decorations.push(...chordDecorations);
            });
            return decorations;
        },
    };
}
