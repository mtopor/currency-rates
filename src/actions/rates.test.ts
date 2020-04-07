import {
  setCurrencyCode,
  setError,
  setIsLoading,
  setSelectedDate,
  setTableData,
} from './rates';
import {
  SET_CURRENCY_CODE,
  SET_ERROR,
  SET_IS_LOADING,
  SET_SELECTED_DATE,
  SET_TABLE_DATA,
} from '../types/rates';

describe('actions', () => {
  it('should create an action set currency code', () => {
    const expectedAction = {
      type: SET_CURRENCY_CODE,
      payload: 'CZK',
    };
    expect(setCurrencyCode('CZK')).toEqual(expectedAction);
  });

  it('should create an action set selected date', () => {
    const expectedAction = {
      type: SET_SELECTED_DATE,
      payload: new Date('01/01/2020'),
    };
    expect(setSelectedDate(new Date('01/01/2020'))).toEqual(expectedAction);
  });

  it('should create an action set table data', () => {
    const tableData = [
      { country: 'Australia', code: 'AUD', rate: '15.176' },
      { country: 'Brazil', code: 'BRL', rate: '4.780' },
    ];
    const expectedAction = {
      type: SET_TABLE_DATA,
      payload: tableData,
    };
    expect(setTableData(tableData)).toEqual(expectedAction);
  });

  it('should create an action set error', () => {
    const expectedAction = {
      type: SET_ERROR,
      payload: 'error message',
    };
    expect(setError('error message')).toEqual(expectedAction);
  });

  it('should create an action set isLoading flag', () => {
    const expectedAction = {
      type: SET_IS_LOADING,
      payload: true,
    };
    expect(setIsLoading(true)).toEqual(expectedAction);
  });
});
