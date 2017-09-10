import { ContentState } from "draft-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IDecoratedComponentProps } from "../utils/decoratedComponentProps";

export class TabContent extends React.PureComponent<IDecoratedComponentProps, {}> {
    public render() {
        return (
            <span className="score-content-tab-content">
                {this.props.children}
            </span>
        );
    }
}
