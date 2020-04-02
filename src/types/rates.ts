export interface CurrencyData {
  country: string;
  code: string;
  rate: string;
}

export interface AppProps {
  tableData: CurrencyData[];
}


//actions
export const SET_CURRENCY_CODE = 'SET_CURRENCY_CODE';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';