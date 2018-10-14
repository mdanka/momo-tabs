import { Change } from "slate";
import { Plugin, Editor, getEventTransfer } from "slate-react";
import PlainSerializer from "slate-plain-serializer";

export type ILineProcessor = (line: string) => string;

/**
 * Trims whiteline from the end of all rows in the editor
 * upon pasting.
 */
export function ProcessOnPastePlugin(lineProcessors: ILineProcessor[]): Plugin {
    function combineLineProcessors(lineProcessors: ILineProcessor[]) {
        return (line: string) => {
            let combinedLine = line;
            lineProcessors.forEach(lineProcessor => (combinedLine = lineProcessor(combinedLine)));
            return combinedLine;
        };
    }

    return {
        onPaste: (event: Event, change: Change, _editor: Editor) => {
            const transfer = getEventTransfer(event);
            const { fragment, text } = transfer;
            if (fragment === null && text === null) {
                return;
            }
            const fragmentOrText = fragment === null ? PlainSerializer.deserialize(text!).document : fragment;
            change.insertFragment(fragmentOrText);
            const { value } = change;
            const content = PlainSerializer.serialize(value);
            const trimmedContent = content
                .split("\n")
                .map(combineLineProcessors(lineProcessors))
                .join("\n");
            const trimmedValue = PlainSerializer.deserialize(trimmedContent);
            return change
                .focus()
                .moveToRangeOfDocument()
                .delete()
                .insertFragment(trimmedValue.document);
        },
    };
}
