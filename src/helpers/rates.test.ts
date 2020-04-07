import { convertDate, parseCurrencyData } from './rates';

describe('helpers test', () => {
  it('should parse raw string data and return an array of CurrencyData objects', () => {
    const rawStringData = `06 Apr 2020 #68
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.511
Brazil|real|1|BRL|4.838`;
    const tableData = [
      { country: 'Australia', code: 'AUD', rate: '15.511' },
      { country: 'Brazil', code: 'BRL', rate: '4.838' },
    ];
    expect(parseCurrencyData(rawStringData)).toEqual(tableData);
  });

  it('should parse invalid raw string data and throw the parsing error', () => {
    const rawStringData = `06 Apr 2020 #68
Country|Currency|Amount|Code|Rate`;
    expect(() => parseCurrencyData(rawStringData)).toThrowError(
      'Parsing error. Invalid data'
    );
  });

  it('should convert date to dd.MM.YYYY format', () => {
    expect(convertDate(new Date('12/12/2020'))).toBe('12.12.2020');
  });
});
