export interface CurrencyData {
  country: string;
  code: string;
  rate: string;
}

export interface AppProps {
  tableData: CurrencyData[];
}
