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

exports.app = functions.https.onRequest(async (_req: functions.Request, res: functions.Response) => {
    const indexHtml = fs.readFileSync("./index.template.html", { encoding: "utf8" });
    res.status(200).send(indexHtml);
});
