import "es6-shim";

(global as any).window = {
    navigator: {
        userAgent: false,
    },
    scrollTo: () => undefined,
};

import * as functions from "firebase-functions";
import * as fs from "fs-extra";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { IAppState, createAppStore, stateToString } from "./store";
import { Store } from "redoodle";
import { StaticRouter, StaticRouterContext } from "react-router";
import { App } from "./app";
import { initializeAndGetServerSideServices } from "./services";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createMuiTheme, Theme } from "@material-ui/core/styles";
import { StylesCreator } from "@material-ui/core/styles/withStyles";
import { getHtml, IHtmlTemplateProperties } from "./indexHtml";
import { getMuiJssProviderGenerateClassName, getPageMetadata } from "./utils";

const FIREBASE_SERVICES = initializeAndGetServerSideServices();

function loadCss() {
    return fs.readFileSync("./app.css", { encoding: "utf8" });
}

async function fetchInitialState() {
    const { dataService } = FIREBASE_SERVICES;
    const songs = await dataService.getAllSongs();
    return {
        currentUser: undefined,
        songs,
    };
}

exports.app = functions.https.onRequest(async (req: functions.Request, res: functions.Response) => {
    const initialState: IAppState = await fetchInitialState();
    const store = createAppStore(initialState);

    // Styling
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map<StylesCreator, Map<Theme, any>>();
    const theme = createMuiTheme({});
    const generateClassName = getMuiJssProviderGenerateClassName();

    const appContent = ReactDOMServer.renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <ServerApp url={req.url} store={store} context={{}} />
            </MuiThemeProvider>
        </JssProvider>,
    );

    const { path } = req;
    const metadata = getPageMetadata(path, initialState);

    const initialStateString = stateToString(initialState);
    const cssMaterialUi = sheetsRegistry.toString();
    const cssMain = loadCss();
    const properties: IHtmlTemplateProperties = {
        appContent: appContent,
        initialState: initialStateString,
        mainStyle: cssMain,
        materialUiStyle: cssMaterialUi,
        ...metadata,
    };
    const indexHtml = getHtml(properties);
    res.status(200).send(indexHtml);
});

export interface IServerAppProps {
    url: string;
    store: Store<IAppState>;
    context: StaticRouterContext;
}

export class ServerApp extends React.Component<IServerAppProps, {}> {
    public render() {
        const { url, store, context } = this.props;
        return (
            <StaticRouter location={url} context={context}>
                <App store={store} />
            </StaticRouter>
        );
    }
}
