import {CurrencyData, SET_CURRENCY_CODE, SET_SELECTED_DATE} from "../types/rates";

export const setCurrencyCode = (code: string) => ({
    type: SET_CURRENCY_CODE,
    payload: code
});

export const setSelectedDate = (date: Date, tableData: CurrencyData[]) => ({
    type: SET_SELECTED_DATE,
    payload: {date, tableData}
});
