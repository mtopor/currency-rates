import {
  setCurrencyCodeReduce,
  setErrorReduce,
  setIsLoadingReduce,
  setSelectedDateReduce,
  setTableDataReduce,
} from '../operations/rates-operations';
import { ALL_RATES_OPTION } from '../constants/rates-constants';
import {
  CurrencyData,
  SET_CURRENCY_CODE,
  SET_SELECTED_DATE,
  SET_IS_LOADING,
  SET_ERROR,
  SET_TABLE_DATA,
  RatesAction,
  CurrencyRatesState,
} from '../types/rates';

// todo test mobe
const filterTableData = (
  tableData: CurrencyData[],
  selectedCurrencyCode?: string
): CurrencyData[] => {
  if (selectedCurrencyCode === ALL_RATES_OPTION) {
    return tableData;
  }
  return tableData?.filter(
    (row: CurrencyData) => row.code === selectedCurrencyCode
  );
};

export default function (state: CurrencyRatesState, action: RatesAction) {
  switch (action.type) {
    case SET_CURRENCY_CODE:
      return setCurrencyCodeReduce(
        state,
        action.payload,
        filterTableData(state.ratesData, action.payload)
      );
    case SET_SELECTED_DATE:
      return setSelectedDateReduce(state, action.payload);
    case SET_TABLE_DATA:
      return setTableDataReduce(
        state,
        action.payload,
        filterTableData(action.payload, state.selectedCurrencyCode)
      );
    case SET_IS_LOADING:
      return setIsLoadingReduce(state, action.payload);
    case SET_ERROR:
      return setErrorReduce(state, action.payload);
    default:
      return state;
  }
}
