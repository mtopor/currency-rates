import { CurrencyData } from 'types/currencyRates';

export const parseCurrencyData = (
  rawData: string,
  currencyCode: any
): CurrencyData[] => {
  const lines: string[] = rawData.split('\n').slice(2);
  const data: CurrencyData[] = [];
  lines.map(line => {
    const parsedLine = line.split('|');
    if(currencyCode) {
      console.log(currencyCode);
      if(currencyCode === parsedLine[3]) {
        data.push({
          country: parsedLine[0],
          code: parsedLine[3],
          rate: parsedLine[4]
        });
      }
    } else {
      data.push({
        country: parsedLine[0],
        code: parsedLine[3],
        rate: parsedLine[4]
      });
    }
  });

  return data;
};
