import { CurrencyData } from '../types/rates';

/*
todo check date in header
todo check lines.length
*/
export const parseCurrencyData = (rawData: string): CurrencyData[] => {
  console.log('Rates from date: ', rawData.split('\n')[0]);
  const lines: string[] = rawData.split('\n').slice(2);
  const data: CurrencyData[] = [];
  lines.forEach((line) => {
    const parsedLine = line.split('|');
    if (parsedLine.length != 5) {
      return;
    }
    data.push({
      country: parsedLine[0],
      code: parsedLine[3],
      rate: parsedLine[4],
    });
  });

  return data;
};

export const convertDate = (date: Date): string => {
  return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${
    date.getMonth() + 1 < 10 ? '0' : ''
  }${date.getMonth() + 1}.${date.getFullYear()}`;
};
