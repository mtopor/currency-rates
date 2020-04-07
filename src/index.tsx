/* eslint import/first: 0 */
// to avoid loading of .css files by node
require.extensions['.css'] = (file) => {};
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import express, { Request, Response } from 'express';
import { getCurrencyData } from './requests/currency-requests';
import { AppProps } from './types/rates';

import { convertDate, parseCurrencyData } from './helpers/rates';
import App from './components/app';

const PORT = 8000;

const app = express();

const wrapWithHtmlTemplate = (content: string, state: Object): string => {
  const stringifiedState = JSON.stringify(state);
  return `
<html>
<head>
<link rel="stylesheet" type="text/css" href="../dist/styles.css">
</head>
<body>
<div id="root">
${content}
</div>
<script>window.__STATE__ = ${stringifiedState}</script>
<script src="../dist/styles.js"></script>
<script src="../dist/main.js"></script>
</body>
</html>
`;
};

app.use('/dist', express.static('./dist/'));

app.use('^/$', async (request: Request, response: Response) => {
  const initialState: AppProps = {
    tableData: [],
  };
  let data: string;

  try {
    data = await getCurrencyData(convertDate(new Date()));
    initialState.tableData = parseCurrencyData(data);
    return response.send(
      wrapWithHtmlTemplate(
        ReactDOMServer.renderToString(<App {...initialState} />),
        initialState
      )
    );
  } catch (e) {
    return response.status(500).send('Cannot get currency data');
  }
});

app.get('/data', async (request: Request, response: Response) => {
  let data: string;
  const { date } = request.query;
  if (date == null) {
    return response.status(400).send('Date param is missing');
  }

  try {
    data = await getCurrencyData(date);
    return response.send(parseCurrencyData(data));
  } catch (e) {
    return response.status(500).send('Cannot get currency data');
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.debug(`App is running on port${  PORT}`);
});

export default app;
