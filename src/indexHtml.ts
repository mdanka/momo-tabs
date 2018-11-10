export interface IHtmlTemplateProperties {
    mainStyle: string;
    materialUiStyle: string;
    appContent: string;
    initialState: string;
    title: string;
    description: string;
    keywords: string[];
}

export function getHtml(template: IHtmlTemplateProperties) {
    const { mainStyle, materialUiStyle, appContent, initialState, title, description, keywords } = template;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="description" content="${description}">
      <meta name="keywords" content="${keywords.join(",")}">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta property="og:description" content="${description}" />
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-62449435-4"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'UA-62449435-4');
      </script>
      <!-- <script>
        window.onerror = function (message, url, lineNo, colNo, error) {
          console.log(arguments);
          var container = document.createElement('div');
    
          container.style.color = 'red';
          container.style.position = 'fixed';
          container.style.background = '#eee';
          container.style.padding = '2em';
          container.style.top = '1em';
          container.style.left = '1em';
    
          var msg = document.createElement('pre');
          msg.innerText = [
            'Message: ' + message,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + colNo,
            'Stack: ' + (error && error.stack)
          ].join('\n');
    
          container.appendChild(msg);
          document.body.appendChild(container);
        };
      </script> -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <style type="text/css">
        ${mainStyle}
      </style>
      <style type="text/css" id="material-ui-jss-server-side">
        ${materialUiStyle}
      </style>
      <link rel="icon" type="image/png" href="/assets/favicon-260x260.png" sizes="260x260">
      <link rel="icon" type="image/png" href="/assets/favicon-32x32.png" sizes="32x32">
      <title>${title}</title>
    </head>
    <body>
      <div id="app">${appContent}</div>
    </body>
    <script>
      window.__initialState = ${initialState}
    </script>
    <script type="text/javascript" src="/app.js"></script>
    </html>
    `;
}
