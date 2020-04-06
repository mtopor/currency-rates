import {
  CurrencyData,
  SET_CURRENCY_CODE,
  SET_SELECTED_DATE,
  SET_IS_LOADING,
  SET_ERROR, RatesAction
} from '../types/rates';

export const setCurrencyCode = (code: string):RatesAction => ({
  type: SET_CURRENCY_CODE,
  payload: code,
});

export const setSelectedDate = (date: Date, tableData: CurrencyData[]):RatesAction => ({
  type: SET_SELECTED_DATE,
  payload: { date, tableData },
});

export const setIsLoading = (isLoading: boolean):RatesAction  => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setError = (error: string): RatesAction => ({
  type: SET_ERROR,
  payload: error,
});
