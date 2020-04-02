import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import {ALL_RATES_OPTION} from "../constants/rates-constants";

import { CurrencyData } from "../types/rates";
import { getTableData } from "../requests/currency-requests";

import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./App.css";

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
  const [selectedRateCode, setSelectedRateCode] = useState(ALL_RATES_OPTION); //todo all codes by def
  const [ratesData, setRatesData] = useState<CurrencyData[]>([]);
  const [tableData, setTableData] = useState<CurrencyData[]>([]);

  useEffect(() => {
    getTableData(pickedDate).then((response) => {
      setRatesData(response.data); //todo get from servers initial state
      setTableData(response.data); //todo get from servers initial state
    });
  }, []);

  useEffect(() => {
    if (pickedDate) {
      getTableData(pickedDate).then((response) => {
        setRatesData(response.data);
      });
    }
  }, [pickedDate]);

  const handleSelected = (selectedValue: string): void => {
    setSelectedRateCode(selectedValue);
    if (selectedValue === ALL_RATES_OPTION) {
      setTableData(ratesData);
    } else {
      setTableData(ratesData.filter((row) => row.code === selectedValue));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <span>{`Hello from component ${text}`}</span>
        <span>select date</span>
        <DatePicker
          showPopperArrow={false}
          selected={pickedDate}
          dateFormat={"dd.MM.yyyy"}
          onChange={(date: any) => setPickedDate(date)}
        />
        <span>select currency code</span>
        <select
          onChange={(e: any) => {
            handleSelected(e.target.value);
          }}
        >
          <option value={ALL_RATES_OPTION} key={0}>
            All rates
          </option>
          {ratesData.map((data: any, index: any) => (
            <option value={data.code} key={index + 1}>
              {data.code}
            </option>
          ))}
        </select>

        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "600px",
          }}
        >
          <AgGridReact columnDefs={columnDefs} rowData={tableData} />
        </div>
      </header>
    </div>
  );
};

export default App;
