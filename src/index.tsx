import React from "react";
import ReactDOMServer from "react-dom/server";

import express, { Request, Response } from "express";
import axios from "axios";

import { parseCurrencyData } from "./helpers/rates";
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

app.use("^/$", (request: Request, response: Response) => {
  const initialState = {
    text: "World (IS)",
  };
  return response.send(
    wrapWithHtmlTemplate(
      ReactDOMServer.renderToString(<App {...initialState} />),
      initialState
    )
  );
});

app.get("/data", async (request: Request, response: any) => {
  //add types express, pass date in request
  //todo error state
  console.log("request param date: ", request.query.date);
  const date = request.query.date;
  if (date == null || !date.length) {
    throw "Invalid request. date param is missing";
  }

  const rates = await axios.get(
    `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt?date=${date}`
  );

  return response.send(parseCurrencyData(rates.data));
});

app.listen(PORT, () => {
  console.log("App is running on port" + PORT);
});
