import { AgGridReact } from "ag-grid-react";
import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./App.css";

interface Props {
  text: string;
}

const App: React.FC<Props> = ({ text }) => {
  const tabletestdata = {
    columnDefs: [
      {
        headerName: "Country",
        field: "country",
      },
      {
        headerName: "Code",
        field: "code",
      },
      {
        headerName: "Rate",
        field: "rate",
      },
    ],
    rowData: [
      {
        country: "Czech Republic",
        code: "CZK",
        rate: 25.4,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <span>{`Hello from component ${text}`}</span>
        <DatePicker
          showPopperArrow={false}
          selected={new Date()}
          onChange={(date: any) => console.log(typeof date + " " + date)}
        />

        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "600px",
          }}
        >
          <AgGridReact
            columnDefs={tabletestdata.columnDefs}
            rowData={tabletestdata.rowData}
          />
        </div>
      </header>
    </div>
  );
};

export default App;
