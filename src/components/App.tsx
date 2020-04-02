import React, { ChangeEvent, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { convertDate } from "../helpers/rates";
import { ALL_RATES_OPTION } from "../constants/rates-constants";

import { AppProps, CurrencyData } from "../types/rates";
import { getTableData } from "../requests/currency-requests";

import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./App.css";

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

const App: React.FC<AppProps> = ({ tableData }) => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [selectedRateCode, setSelectedRateCode] = useState(ALL_RATES_OPTION);
  const [ratesData, setRatesData] = useState<CurrencyData[]>([]);

  useEffect(() => {
    setRatesData(tableData);
  }, []);

  const getGridData = () => {
    if (selectedRateCode === ALL_RATES_OPTION) {
      return ratesData;
    } else {
      return ratesData.filter((row) => row.code === selectedRateCode);
    }
  };

  const handleDatePicked = (date: Date) => {
    getTableData(convertDate(date)).then((response) => {
      setRatesData(response.data);
      setPickedDate(date);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <span>Uber Rates</span>
        <span>select date</span>
        <DatePicker
          showPopperArrow={false}
          selected={pickedDate}
          dateFormat={"dd.MM.yyyy"}
          onChange={(date: Date) => handleDatePicked(date)}
        />
        <span>select currency code</span>

        {/*todo move select to component*/}
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedRateCode(e.target.value);
          }}
        >
          <option value={ALL_RATES_OPTION} key={0}>
            All rates
          </option>
          {ratesData.map((data: CurrencyData, index: number) => (
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
          <AgGridReact columnDefs={columnDefs} rowData={getGridData()} />
        </div>
      </header>
    </div>
  );
};

export default App;
