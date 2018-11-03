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
import { IAppState, createAppStore } from "./store";
import { Store } from "redoodle";
import { StaticRouter, StaticRouterContext } from "react-router";
import { App } from "./app";
import { initializeAndGetServerSideServices } from "./services";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, Theme } from "@material-ui/core/styles";
import { StylesCreator } from "@material-ui/core/styles/withStyles";

interface IHtmlTemplateProperties {
    TEMPLATE_VAR_APP_CONTENT: string;
    TEMPLATE_VAR_INITIAL_STATE: string;
    TEMPLATE_VAR_STYLE_TAGS: string;
}

const FIREBASE_SERVICES = initializeAndGetServerSideServices();

function fillInTemplateValue(template: string, key: string, value: string) {
    return template.replace(new RegExp(key, "g"), value);
}

function loadCss() {
    return fs.readFileSync("./app.css", { encoding: "utf8" });
    // return "";
}

function templatizeHtml(properties: IHtmlTemplateProperties) {
    const htmlTemplate = fs.readFileSync("./index.template.html", { encoding: "utf8" });
    let html = htmlTemplate;
    html = fillInTemplateValue(html, "TEMPLATE_VAR_APP_CONTENT", properties.TEMPLATE_VAR_APP_CONTENT);
    html = fillInTemplateValue(html, "TEMPLATE_VAR_INITIAL_STATE", properties.TEMPLATE_VAR_INITIAL_STATE);
    html = fillInTemplateValue(html, "TEMPLATE_VAR_STYLE_TAGS", properties.TEMPLATE_VAR_STYLE_TAGS);
    return html;
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
    const generateClassName = createGenerateClassName();

    const appContent = ReactDOMServer.renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <ServerApp url={req.url} store={store} context={{}} />
            </MuiThemeProvider>
        </JssProvider>,
    );

    const initialStateString = JSON.stringify(initialState);
    const cssMaterialUi = sheetsRegistry.toString();
    const cssMain = loadCss();
    const cssContent = `${cssMain}\n${cssMaterialUi}`;
    const properties: IHtmlTemplateProperties = {
        TEMPLATE_VAR_APP_CONTENT: appContent,
        TEMPLATE_VAR_INITIAL_STATE: initialStateString,
        TEMPLATE_VAR_STYLE_TAGS: cssContent,
    };
    const indexHtml = templatizeHtml(properties);
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
