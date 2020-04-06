

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
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_ERROR = 'SET_ERROR';


export interface RatesAction<T = any> {
  type: string,
  payload: T,
}
