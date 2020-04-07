import axios from 'axios';

export const getTableData = async (date: string) => {
  const response = await axios.get(`http://localhost:8000/data?date=${date}`);
  return response.data;
};

export const getCurrencyData = async (date: string) => {
  const response = await axios.get(
    `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt?date=${date}`
  );
  return response.data;
};
