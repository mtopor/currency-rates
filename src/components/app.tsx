import React, { ChangeEvent, useReducer } from 'react';

import DatePicker from 'react-datepicker';
import BootstrapTable from 'react-bootstrap-table-next';
import SpinnerComponent from './spinner/spinner-component';
import {
  setCurrencyCode,
  setError,
  setIsLoading,
  setSelectedDate,
  setTableData,
} from '../actions/rates';
import SelectComponent from './select/select-component';
import { convertDate } from '../helpers/rates';
import { ALL_RATES_OPTION } from '../constants/rates-constants';
import reducer from '../reducers/rates-reducer';

import { AppProps, CurrencyData } from '../types/rates';
import { getTableData } from '../requests/currency-requests';

import './app.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const columnDefs = [
  {
    text: 'Country',
    dataField: 'country',
  },
  {
    text: 'Code',
    dataField: 'code',
  },
  {
    text: 'Rate',
    dataField: 'rate',
  },
];

const App: React.FC<AppProps> = ({ tableData }) => {
  const [state, dispatch] = useReducer(reducer, {
    ratesData: tableData,
    tableData,
    selectedCurrencyCode: ALL_RATES_OPTION,
    isLoading: false,
    selectedDate: new Date(),
    error: '',
  });

  const handleDatePicked = async (date: Date) => {
    const requestDate = !date ? new Date() : date;
    dispatch(setIsLoading(true));
    try {
      const data = await getTableData(convertDate(requestDate));
      dispatch(setTableData(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.debug(error);
      dispatch(setError('Could not retrieve rates'));
    } finally {
      dispatch(setIsLoading(false));
      dispatch(setSelectedDate(requestDate));
    }
  };
  return (
    <div className="App">
      <div className="App-container">
        <div>
          <div className="container">
            <h1 className="display-4">Uber Rates</h1>
            <hr />

            <p className="lead">{'Select date '}</p>
            <DatePicker
              className="form-control form-control-lg"
              showPopperArrow={false}
              selected={state.selectedDate}
              dateFormat="dd.MM.yyyy"
              onChange={(date: Date) => handleDatePicked(date)}
            />
            <br />
            <br />

            <p className="lead">{'Select currency '}</p>
            <SelectComponent
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                dispatch(setCurrencyCode(e.target.value));
              }}
              options={state.tableData?.map((data: CurrencyData) => data.code)}
              defaultOption={ALL_RATES_OPTION}
            />
          </div>
        </div>

        <div className="rates-table align-middle">
          {!!state.error.length && <p className="text-danger">{state.error}</p>}
          {state.isLoading ? (
            <SpinnerComponent />
          ) : (
            !state.error.length && (
              <BootstrapTable
                bodyClasses="rates-table"
                headerClasses="thead-dark"
                keyField="code"
                data={state.tableData}
                columns={columnDefs}
                striped
                hover
                condensed
                bootstrap4
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
