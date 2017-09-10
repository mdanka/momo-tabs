import { ContentState } from "draft-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IDecoratedComponentProps } from "../utils/decoratedComponentProps";

export class TabBackground extends React.PureComponent<IDecoratedComponentProps, {}> {
    public render() {
        return (
            <span className="score-content-tab-background">
                {this.props.children}
            </span>
        );
    }
}
