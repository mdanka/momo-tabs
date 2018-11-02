import "es6-shim";
import * as functions from "firebase-functions";
import * as fs from "fs-extra";
// import * as admin from "firebase-admin";

// admin.initializeApp(functions.config().firebase);

// exports.app = functions.https.onRequest(async (_req: functions.Request, res: functions.Response) => {
//     // export const listener = functions.https.onRequest(async (_req: functions.Request, res: functions.Response) => {
//     const hours = (new Date().getHours() % 12) + 1; // London is UTC + 1hr;
//     res.status(200).send(`<!doctype html>
//       <head>
//         <title>Time</title>
//       </head>
//       <body>
//         ${"BONG ".repeat(hours)}
//       </body>
//     </html>`);
// });

interface IHtmlTemplateProperties {
    TEMPLATE_VAR_APP_CONTENT: string;
    TEMPLATE_VAR_INITIAL_STATE: string;
}

function fillInTemplateValue(template: string, key: string, value: string) {
    return template.replace(new RegExp(key, "g"), value);
}

function templatizeHtml(properties: IHtmlTemplateProperties) {
    const htmlTemplate = fs.readFileSync("./index.template.html", { encoding: "utf8" });
    let html = htmlTemplate;
    html = fillInTemplateValue(html, "TEMPLATE_VAR_APP_CONTENT", properties.TEMPLATE_VAR_APP_CONTENT);
    html = fillInTemplateValue(html, "TEMPLATE_VAR_INITIAL_STATE", properties.TEMPLATE_VAR_INITIAL_STATE);
    return html;
}

exports.app = functions.https.onRequest(async (_req: functions.Request, res: functions.Response) => {
    const properties: IHtmlTemplateProperties = {
        TEMPLATE_VAR_APP_CONTENT: "hello",
        TEMPLATE_VAR_INITIAL_STATE: "tourist",
    };
    const indexHtml = templatizeHtml(properties);
    res.status(200).send(indexHtml);
});
