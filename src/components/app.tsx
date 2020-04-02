import React, { ChangeEvent, useReducer } from "react";

import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import {setCurrencyCode, setSelectedDate} from "../actions/rates";
import SelectComponent from "../components/select-component";
import { convertDate } from "../helpers/rates";
import { ALL_RATES_OPTION } from "../constants/rates-constants";
import reducer from "../reducers/rates-reducer";

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
  const [state, dispatch] = useReducer(reducer, {
    tableData: tableData,
    gridData: tableData,
    selectedCurrencyCode: ALL_RATES_OPTION,
    isLoading: false,
    selectedDate: new Date(),
  });

  const handleDatePicked = (date: Date) => {
    getTableData(convertDate(date)).then((response) => {
      dispatch(setSelectedDate(date, response.data));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <span>Uber Rates</span>
        <span>select date</span>
        <DatePicker
          showPopperArrow={false}
          selected={state.selectedDate}
          dateFormat={"dd.MM.yyyy"}
          onChange={(date: Date) => handleDatePicked(date)}
        />
        <span>select currency code</span>
        {state.selectedCurrencyCode}
        <SelectComponent
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            dispatch(setCurrencyCode(e.target.value));
          }}
          options={state.tableData.map((data: CurrencyData) => data.code)}
          defaultOption={ALL_RATES_OPTION}
        />

        {/*todo remove inline styles*/}
        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "600px",
          }}
        >
          <AgGridReact columnDefs={columnDefs} rowData={state.gridData} />
        </div>
      </header>
    </div>
  );
};

export default App;
