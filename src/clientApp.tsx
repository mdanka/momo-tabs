import "es6-shim";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redoodle";

import { App } from "./app";
import { initializeAndGetClientSideServices } from "./services";
import { createAppStore, IAppState, IWindowWithInitialState, deserializeAppState } from "./store";
import { getMuiJssProviderGenerateClassName } from "./utils";

interface IClientAppProps {
    store: Store<IAppState>;
}

export class ClientApp extends React.Component<IClientAppProps, {}> {
    public render() {
        const { store } = this.props;
        return (
            <BrowserRouter>
                <App store={store} />
            </BrowserRouter>
        );
    }
}

const appElement = document.getElementById("app");
const initialState = deserializeAppState((window as IWindowWithInitialState).__initialState);
const store = createAppStore(initialState);
initializeAndGetClientSideServices(store);

// Styling - added to match the DOM structure for hdyration
const theme = createMuiTheme({});
const generateClassName = getMuiJssProviderGenerateClassName();

if (appElement != null) {
    ReactDOM.hydrate(
        <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
                <ClientApp store={store} />
            </MuiThemeProvider>
        </JssProvider>,
        appElement,
    );
}
