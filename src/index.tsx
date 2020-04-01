import React from "react";
import ReactDOMServer from 'react-dom/server';

import express from 'express';
import fs from "fs";
import path from "path";
import App from "./components/hello";

const PORT = 8000;

const app = express();


const wrapWithHtmlTemplate = (content: string, state: Object): string => {
    return `
<html>
<head>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<script type="text/babel">

      ReactDOM.hydrate(
        <App />,
        document.getElementById('root')
      );

    </script>
<div id="root">
${content}
</div>
<script src="../dist/main.js"></script>
</body>
</html>
`;
};

app.use("/dist", express.static('./dist/'));

app.use('^/$', (request: any, response: any) => {
    const initialState = {
        text: 'World (IS)'
    }
    return response.send(wrapWithHtmlTemplate(ReactDOMServer.renderToString(<App {...initialState} />), initialState));
    // fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return response.status(500).send('Internal Server Error');
    //     }
    //     const persistedState = {
    //         tableData: {}
    //     };
    //
    //     return response.send(
    //         data.replace(
    //             `<script>window.__STATE__ = {${JSON.stringify(persistedState)}}</script><div id="root"></div>`,
    //             `<div id="root">{ReactDOMServer.renderToString(<App />)}</div>`
    //         )
    //     );
    // });
});

// eslint-disable-next-line no-undef
// app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
    console.log('App is running on port' + PORT);
    // console.log(ReactDOMServer.renderToString(<App />));
});


console.log('Hello world');