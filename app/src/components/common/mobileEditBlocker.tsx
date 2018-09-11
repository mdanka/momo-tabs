import * as React from "react";
import { Snackbar, MuiThemeProvider } from "@material-ui/core";
import { IS_MOBILE, LIGHT_THEME } from "../../utils";

export interface IMobileEditBlockerProps {
    isEnabled: boolean;
    isLightThemeForced?: boolean;
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
        const { isEnabled, isLightThemeForced } = this.props;
        if (!isEnabled || !IS_MOBILE) {
            return this.props.children;
        }
        const { isWarningOpen } = this.state;
        const snackbar = (
            <Snackbar
                autoHideDuration={3000}
                message={<span>Song editing is not supported on mobile devices. Please use a desktop computer.</span>}
                onClose={this.closeWarning}
                open={isWarningOpen}
            />
        );
        const snackbarWithTheme = isLightThemeForced ? (
            <MuiThemeProvider theme={LIGHT_THEME}>{snackbar}</MuiThemeProvider>
        ) : (
            snackbar
        );
        return (
            <span>
                <span onClick={this.handleClick}>{this.props.children}</span>
                {snackbarWithTheme}
            </span>
        );
    }

    private handleClick = (event: React.MouseEvent<any>) => {
        event.preventDefault();
        event.stopPropagation();
        this.openWarning();
    };

    private openWarning = () => {
        this.setState({ isWarningOpen: true });
    };

    private closeWarning = () => {
        this.setState({ isWarningOpen: false });
    };
}
