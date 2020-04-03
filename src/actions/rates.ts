import {
  CurrencyData,
  SET_CURRENCY_CODE,
  SET_SELECTED_DATE,
  SET_IS_LOADING,
  SET_ERROR,
} from '../types/rates';

export const setCurrencyCode = (code: string) => ({
  type: SET_CURRENCY_CODE,
  payload: code,
});

export const setSelectedDate = (date: Date, tableData: CurrencyData[]) => ({
  type: SET_SELECTED_DATE,
  payload: { date, tableData },
});

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setError = (error: string) => ({
  type: SET_ERROR,
  payload: error,
});
