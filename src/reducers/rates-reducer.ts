import { ALL_RATES_OPTION } from "../constants/rates-constants";
import {CurrencyData, SET_CURRENCY_CODE, SET_SELECTED_DATE} from "../types/rates";

export interface CurrencyRatesState {
  isLoading: boolean;
  selectedCurrencyCode: string;
  selectedDate: Date;
  tableData: CurrencyData[];
  gridData: CurrencyData[];
}

const getGridData = (
  tableData: CurrencyData[],
  selectedCurrencyCode?: string
): CurrencyData[] => {
  if (selectedCurrencyCode === ALL_RATES_OPTION) {
    return tableData;
  } else {
    return tableData.filter(
      (row: CurrencyData) => row.code === selectedCurrencyCode
    );
  }
};

//todo createa reducer functions? operations?
export default function (state: CurrencyRatesState, action: any) {
  switch (action.type) {
    case SET_CURRENCY_CODE:
      return {
        ...state,
        selectedCurrencyCode: action.payload,
        gridData: getGridData(state.tableData, action.payload),
      };
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
        tableData: action.payload.tableData,
        gridData: getGridData(
          action.payload.tableData,
          state.selectedCurrencyCode
        ),
      };
    default:
      return state;
  }
}
