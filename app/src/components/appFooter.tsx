import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../store";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { Page, GET_NAV_URL } from "../utils";
import { MuiThemeProvider } from "@material-ui/core";
import { DARK_THEME } from "../utils";

export interface IAppFooterOwnProps {}

export interface IAppFooterStateProps {}

export interface IAppFooterDispatchProps {}

export interface IAppFooterLocalState {}

export type IAppFooterProps = IAppFooterOwnProps & IAppFooterStateProps & IAppFooterDispatchProps;

export class UnconnectedAppFooter extends React.Component<IAppFooterProps, IAppFooterLocalState> {
    public render() {
        return (
            <div className="app-footer">
                <MuiThemeProvider theme={DARK_THEME}>
                    <Link className="underline" to={GET_NAV_URL[Page.TermsOfService]()}>
                        Terms of Service
                    </Link>
                    {this.renderSeparator()}
                    <span className="app-footer-app-title">
                        <Link className="underline" to={GET_NAV_URL[Page.Home]()}>
                            Momo Tabs
                        </Link>
                    </span>
                    {this.renderSeparator()}
                    <Link className="underline" to={GET_NAV_URL[Page.PrivacyPolicy]()}>
                        Privacy Policy
                    </Link>
                </MuiThemeProvider>
            </div>
        );
    }

    private renderSeparator = () => {
        return <span className="app-footer-separator">&middot;</span>;
    };
}

function mapStateToProps(_state: IAppState, _ownProps: IAppFooterOwnProps): IAppFooterStateProps {
    return {};
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: IAppFooterOwnProps): IAppFooterDispatchProps {
    return {};
}

export const AppFooter = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedAppFooter);
