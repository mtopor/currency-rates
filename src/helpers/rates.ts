import { CurrencyData } from '../types/rates';

//todo test parser
export const parseCurrencyData = (rawData: string): CurrencyData[] => {
  if (rawData.split('\n').length < 3) {
    throw new Error('Parsing error. Invalid data');
  }

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

//todo test
export const convertDate = (date: Date): string => {
  var formatter = new Intl.DateTimeFormat('en-us', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = formatter.formatToParts(date);
  return `${day}.${month}.${year}`;
};
