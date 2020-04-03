import {
  setCurrencyCodeReduce,
  setErrorReduce,
  setIsLoadingReduce,
  setSelectedDateReduce,
} from '../operations/rates-operations';
import { ALL_RATES_OPTION } from '../constants/rates-constants';
import {
  CurrencyData,
  SET_CURRENCY_CODE,
  SET_SELECTED_DATE,
  SET_IS_LOADING,
  SET_ERROR,
} from '../types/rates';

export interface CurrencyRatesState {
  isLoading: boolean;
  selectedCurrencyCode: string;
  selectedDate: Date;
  tableData: CurrencyData[];
  gridData: CurrencyData[];
  error: string;
}

const getGridData = (
  tableData: CurrencyData[],
  selectedCurrencyCode?: string
): CurrencyData[] => {
  if (selectedCurrencyCode === ALL_RATES_OPTION) {
    return tableData;
  } else {
    return tableData?.filter(
      (row: CurrencyData) => row.code === selectedCurrencyCode
    );
  }
};

export default function (state: CurrencyRatesState, action: any) {
  switch (action.type) {
    case SET_CURRENCY_CODE:
      return setCurrencyCodeReduce(
        state,
        action.payload,
        getGridData(state.tableData, action.payload)
      );
    case SET_SELECTED_DATE:
      return setSelectedDateReduce(
        state,
        action.payload.date,
        action.payload.tableData,
        getGridData(action.payload.tableData, state.selectedCurrencyCode)
      );
    case SET_IS_LOADING:
      return setIsLoadingReduce(state, action.payload);
    case SET_ERROR:
      return setErrorReduce(state, action.payload);
    default:
      return state;
  }
}
