import { CurrencyData } from '../types/rates';
import { CurrencyRatesState } from '../reducers/rates-reducer';

export const setCurrencyCodeReduce = (
  state: CurrencyRatesState,
  code: string,
  gridData: CurrencyData[]
): CurrencyRatesState => {
  return {
    ...state,
    selectedCurrencyCode: code,
    gridData: gridData,
  };
};

export const setSelectedDateReduce = (
  state: CurrencyRatesState,
  date: Date,
  tableData: CurrencyData[],
  gridData: CurrencyData[]
): CurrencyRatesState => {
  return {
    ...state,
    selectedDate: date,
    tableData: tableData,
    gridData: gridData,
  };
};

export const setIsLoadingReduce = (
  state: CurrencyRatesState,
  isLoading: boolean
) => {
  return {
    ...state,
    isLoading: isLoading,
  };
};

export const setErrorReduce = (state: CurrencyRatesState, error: string) => {
  return {
    ...state,
    isLoading: false,
    error: error,
    tableData: [],
    gridData: [],
  };
};
