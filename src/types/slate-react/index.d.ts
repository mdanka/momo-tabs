// Based on @types/slate-react

declare module "slate-react" {
    import { Decoration, Mark, Node, Block, Change, Schema, Value, Stack } from "slate";
    import * as Immutable from "immutable";
    import * as React from "react";

    // Values prefixed with "data-..." (Used for spellchecking according to docs)
    export interface RenderAttributes {
        [key: string]: any;
    }

    export interface RenderMarkProps {
        attributes: RenderAttributes;
        children: React.ReactNode;
        editor: Editor;
        mark: Mark;
        marks: Immutable.Set<Mark>;
        node: Node;
        offset: number;
        text: string;
    }

    export interface RenderNodeProps {
        attributes: RenderAttributes;
        children: React.ReactNode;
        editor: Editor;
        isFocused: boolean;
        isSelected: boolean;
        key: string;
        node: Node;
        parent: Node;
        readOnly: boolean;
    }

    export type RenderPlaceholderProps = RenderMarkProps;

    export interface Plugin {
        onBeforeInput?: (event: Event, change: Change, editor: Editor) => Change | void;
        onBlur?: (event: Event, change: Change, editor: Editor) => Change | void;
        onFocus?: (event: Event, change: Change, editor: Editor) => Change | void;
        onCopy?: (event: Event, change: Change, editor: Editor) => Change | void;
        onCut?: (event: Event, change: Change, editor: Editor) => Change | void;
        onDrop?: (event: Event, change: Change, editor: Editor) => Change | void;
        onKeyDown?: (event: Event, change: Change, editor: Editor) => Change | void;
        onKeyUp?: (event: Event, change: Change, editor: Editor) => Change | void;
        onPaste?: (event: Event, change: Change, editor: Editor) => Change | void;
        onSelect?: (event: Event, change: Change, editor: Editor) => Change | void;
        onChange?: (change: Change) => any;
        shouldNodeComponentUpdate?: (previousEditorProps: EditorProps, editorProps: EditorProps) => true | void;
        renderEditor?: (props: RenderAttributes, editor: Editor) => ReactNode | void;
        renderMark?: (props: RenderMarkProps) => ReactNode | void;
        renderNode?: (props: RenderNodeProps) => ReactNode | void;
        renderPlaceholder?: (props: RenderPlaceholderProps) => ReactNode | void;

        decorateNode?: (node: Node) => Decoration[] | void;
        normalizeNode?: (node: Node) => (change: Change) => void | void;
        schema?: Schema;
    }

    export interface BasicEditorProps {
        value: Value;
        autoCorrect?: boolean;
        autoFocus?: boolean;
        className?: string;
        onChange?: (change: Change) => any;
        placeholder?: string | Element;
        plugins?: Plugin[];
        readOnly?: boolean;
        role?: string;
        schema?: Schema;
        spellCheck?: boolean;
        style?: { [key: string]: string };
        tabIndex?: number;
    }

    // tsling:disable interface-over-type-literal
    export type EditorProps = BasicEditorProps & Plugin;

    export interface EditorState {
        schema: Schema;
        value: Value;
        stack: Stack; // [TODO] define stack
    }

    export class Editor extends React.Component<EditorProps, EditorState> {
        schema: Schema;
        value: Value;
        stack: Stack;

        // Instance Methods
        blur(): void;
        change(fn: (change: Change) => any, ...args: any[]): void;
        focus(): void;
    }

    export type SlateType = "fragment" | "html" | "node" | "rich" | "text" | "files";

    export function findDOMNode(node: Node): Element;
    export function findDOMRange(range: Range): Range;
    export function findNode(element: Element, value: Value): Node;
    export function findRange(selection: Selection, value: Value): Range;
    export function getEventRange(event: Event, value: Value): Range;
    export function getEventTransfer(event: Event): { type: SlateType; node: Node };
    export function setEventTransfer(event: Event, type: SlateType, data: any): void;
}
