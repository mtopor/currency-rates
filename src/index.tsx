import React from "react";
import ReactDOMServer from "react-dom/server";

import express, { Request, Response } from "express";
import { getCurrencyData, getTableData } from "./requests/currency-requests";
import { AppProps } from "./types/rates";

import { convertDate, parseCurrencyData } from "./helpers/rates";
import App from "./components/App";

const PORT = 8000;

const app = express();

const wrapWithHtmlTemplate = (content: string, state: Object): string => {
  const stringifiedState = JSON.stringify(state);
  return `
<html>
<head>
</head>
<body>
<div id="root">
${content}
</div>
<script>window.__STATE__ = ${stringifiedState}</script>
<script src="../dist/main.js"></script>
</body>
</html>
`;
};

app.use("/dist", express.static("./dist/"));

app.use("^/$", async (request: Request, response: Response) => {
  const initialState: AppProps = {
    tableData: [],
  };

  getTableData(convertDate(new Date())).then((resp) => {
    initialState.tableData = resp.data;
    return response.send(
      wrapWithHtmlTemplate(
        ReactDOMServer.renderToString(<App {...initialState} />),
        initialState
      )
    );
  });
});

app.get("/data", async (request: Request, response: Response) => {
  //todo error state
  console.log("request param date: ", request.query.date);
  const date = request.query.date;
  if (date == null || !date.length) {
    throw "Invalid request. date param is missing";
  }

  getCurrencyData(date).then((resp) => {
    return response.send(parseCurrencyData(resp.data));
  });
});

app.listen(PORT, () => {
  console.log("App is running on port" + PORT);
});
