import * as types from '../types/rates';

export const setCurrencyCode = (code: string): types.RatesAction => ({
  type: types.SET_CURRENCY_CODE,
  payload: code,
});

export const setSelectedDate = (date: Date): types.RatesAction => ({
  type: types.SET_SELECTED_DATE,
  payload: date,
});

export const setTableData = (
  tableData: types.CurrencyData[]
): types.RatesAction => ({
  type: types.SET_TABLE_DATA,
  payload: tableData,
});

export const setIsLoading = (isLoading: boolean): types.RatesAction => ({
  type: types.SET_IS_LOADING,
  payload: isLoading,
});

export const setError = (error: string): types.RatesAction => ({
  type: types.SET_ERROR,
  payload: error,
});
