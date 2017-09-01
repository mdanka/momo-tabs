import * as React from "react";
import * as ReactDOM from "react-dom";

export class Chord extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <strong>{this.props.children}</strong>
        )
    }
}
