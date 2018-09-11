import * as React from "react";
import { Snackbar } from "@material-ui/core";
import { IS_MOBILE } from "../../utils";

export interface IMobileEditBlockerProps {
    isEnabled: boolean;
}

export interface IMobileEditBlockerState {
    isWarningOpen: boolean;
}

export class MobileEditBlocker extends React.PureComponent<IMobileEditBlockerProps, IMobileEditBlockerState> {
    public constructor(props: IMobileEditBlockerProps) {
        super(props);
        this.state = {
            isWarningOpen: false,
        };
    }

    public render() {
        const { isEnabled } = this.props;
        if (!isEnabled || !IS_MOBILE) {
            return this.props.children;
        }
        const { isWarningOpen } = this.state;
        return (
            <span>
                <span onClick={this.handleClick}>{this.props.children}</span>
                <Snackbar
                    autoHideDuration={3000}
                    message={<span>Editing is not supported on mobile devices. Please use a desktop computer.</span>}
                    onClose={this.closeWarning}
                    open={isWarningOpen}
                />
            </span>
        );
    }

    private handleClick = (event: React.MouseEvent<any>) => {
        event.preventDefault();
        this.openWarning();
    };

    private openWarning = () => {
        this.setState({ isWarningOpen: true });
    };

    private closeWarning = () => {
        this.setState({ isWarningOpen: false });
    };
}
