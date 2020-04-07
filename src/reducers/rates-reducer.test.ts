import { ALL_RATES_OPTION } from '../constants/rates-constants';
import { CurrencyRatesState } from '../types/rates';
import {
  setCurrencyCode,
  setError,
  setIsLoading,
  setSelectedDate,
  setTableData,
} from '../actions/rates';
import reducer from './rates-reducer';

const initialState: CurrencyRatesState = {
  error: '',
  isLoading: false,
  selectedCurrencyCode: ALL_RATES_OPTION,
  selectedDate: new Date('04-03-2020'),
  ratesData: [
    { country: 'Australia', code: 'AUD', rate: '15.176' },
    { country: 'Brazil', code: 'BRL', rate: '4.780' },
  ],
  tableData: [
    { country: 'Australia', code: 'AUD', rate: '15.176' },
    { country: 'Brazil', code: 'BRL', rate: '4.780' },
  ],
};

describe('rates reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: '', payload: '' })).toBe(initialState);
  });

  it('setIsLoading reducer test', () => {
    expect(reducer(initialState, setIsLoading(true))).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('setCurrencyCode reducer test, table data does not contain selectedCurrencyCode value', () => {
    expect(reducer(initialState, setCurrencyCode('USD'))).toEqual({
      ...initialState,
      tableData: [],
      selectedCurrencyCode: 'USD',
    });
  });

  it('setSelectedDate reducer test', () => {
    expect(
      reducer(initialState, setSelectedDate(new Date('05-05-2020')))
    ).toEqual({ ...initialState, selectedDate: new Date('05-05-2020') });
  });

  it('setTableData reducer test', () => {
    const tableData = [
      { country: 'Australia', code: 'AUD', rate: '20' },
      { country: 'Brazil', code: 'BRL', rate: '10' },
    ];
    expect(reducer(initialState, setTableData(tableData))).toEqual({
      ...initialState,
      tableData,
      ratesData: tableData,
    });
  });

  it('setTableData reducer test with filtering', () => {
    const ratesData = [
      { country: 'Australia', code: 'AUD', rate: '20' },
      { country: 'Brazil', code: 'BRL', rate: '10' },
    ];
    expect(
      reducer(
        { ...initialState, selectedCurrencyCode: 'BRL' },
        setTableData(ratesData)
      )
    ).toEqual({
      ...initialState,
      ratesData,
      selectedCurrencyCode: 'BRL',
      tableData: [{ country: 'Brazil', code: 'BRL', rate: '10' }],
    });
  });

  it('setError reducer test', () => {
    expect(
      reducer({ ...initialState, isLoading: true }, setError('error message'))
    ).toEqual({
      ...initialState,
      error: 'error message',
      ratesData: [],
      tableData: [],
      isLoading: false,
    });
  });
});
