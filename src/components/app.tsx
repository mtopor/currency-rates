import React, { ChangeEvent, useReducer } from 'react';

import DatePicker from 'react-datepicker';
import { AgGridReact } from 'ag-grid-react';
import SpinnerComponent from '../components/spinner/spinner-component';
import {
  setCurrencyCode,
  setError,
  setIsLoading,
  setSelectedDate,
  setTableData,
} from '../actions/rates';
import SelectComponent from '../components/select/select-component';
import { convertDate } from '../helpers/rates';
import { ALL_RATES_OPTION } from '../constants/rates-constants';
import reducer from '../reducers/rates-reducer';

import { AppProps, CurrencyData } from '../types/rates';
import { getTableData } from '../requests/currency-requests';

import 'react-datepicker/dist/react-datepicker.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../components/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const columnDefs = [
  {
    headerName: 'Country',
    field: 'country',
  },
  {
    headerName: 'Code',
    field: 'code',
  },
  {
    headerName: 'Rate',
    field: 'rate',
  },
];
//todo styles
const App: React.FC<AppProps> = ({ tableData }) => {
  const [state, dispatch] = useReducer(reducer, {
    tableData: tableData,
    gridData: tableData,
    selectedCurrencyCode: ALL_RATES_OPTION,
    isLoading: false,
    selectedDate: new Date(),
    error: '',
  });

  const handleDatePicked = async (date: Date) => {
    if (!date) {
      date = new Date();
    }
    dispatch(setIsLoading(true));

    try {
      dispatch(setSelectedDate(date));
      const data = await getTableData(convertDate(date));
      dispatch(setTableData(data));
    } catch (error) {
      console.debug(error);
      dispatch(setError('Could not retrieve rates'));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <span>Uber Rates</span>
        <div>
          <span>{`Select date `}</span>
          <DatePicker
            showPopperArrow={false}
            selected={state.selectedDate}
            dateFormat={'dd.MM.yyyy'}
            onChange={(date: Date) => handleDatePicked(date)}
          />
        </div>
        <div>
          <span>{`Select currency `}</span>
          <SelectComponent
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(setCurrencyCode(e.target.value));
            }}
            options={state.tableData?.map((data: CurrencyData) => data.code)}
            defaultOption={ALL_RATES_OPTION}
          />
        </div>
        <div className="ag-theme-balham rates-table">
          {!!state.error.length && <span>{state.error}</span>}
          {state.isLoading ? (
            <SpinnerComponent />
          ) : (
            !state.error.length && (
              <AgGridReact columnDefs={columnDefs} rowData={state.gridData} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
