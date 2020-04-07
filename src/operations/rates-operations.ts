import { CurrencyData, CurrencyRatesState } from '../types/rates';

export const setCurrencyCodeReduce = (
  state: CurrencyRatesState,
  code: string,
  gridData: CurrencyData[]
): CurrencyRatesState => {
  return {
    ...state,
    selectedCurrencyCode: code,
    tableData: gridData,
  };
};

export const setSelectedDateReduce = (
  state: CurrencyRatesState,
  date: Date
): CurrencyRatesState => {
  return {
    ...state,
    selectedDate: date,
  };
};

export const setTableDataReduce = (
  state: CurrencyRatesState,
  tableData: CurrencyData[],
  gridData: CurrencyData[]
): CurrencyRatesState => {
  return {
    ...state,
    ratesData: tableData,
    tableData: gridData,
    error: '',
  };
};

export const setIsLoadingReduce = (
  state: CurrencyRatesState,
  isLoading: boolean
) => {
  return {
    ...state,
    isLoading,
  };
};

export const setErrorReduce = (state: CurrencyRatesState, error: string) => {
  return {
    ...state,
    isLoading: false,
    error,
    ratesData: [],
    tableData: [],
  };
};
