import { ContentState } from "draft-js";
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IDecoratedComponentProps {
    contentState: ContentState;
    decoratedText: string;
    dir: any;
    entityKey?: string | null;
    offsetKey?: string | null;
}

export class Chord extends React.PureComponent<IDecoratedComponentProps, {}> {
    public render() {
        return (
            <strong>{this.props.children}</strong>
        );
    }
}
