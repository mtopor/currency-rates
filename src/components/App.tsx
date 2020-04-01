import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./App.css";
import { CurrencyData } from "../types/rates";
import { getTableData } from "../requests/currency-requests";

interface Props {
  text: string;
}

const columnDefs = [
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
  ];

const App: React.FC<Props> = ({ text }) => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [tableData, setTableData] = useState<CurrencyData[]>([]);

  useEffect(() => {
    if (pickedDate) {
      getTableData(pickedDate).then((response) => {
        setTableData(response.data);
      });
    }
  }, [pickedDate]);

  return (
    <div className="App">
      <header className="App-header">
        <span>{`Hello from component ${text}`}</span>

        <DatePicker
          showPopperArrow={false}
          selected={pickedDate}
          dateFormat={"dd.MM.yyyy"}
          onChange={(date: any) => setPickedDate(date)}
        />

        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "600px",
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={tableData}
          />
        </div>
      </header>
    </div>
  );
};

export default App;
