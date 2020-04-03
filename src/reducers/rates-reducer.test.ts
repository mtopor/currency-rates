import { setIsLoading } from '../actions/rates';
import reducer, { CurrencyRatesState } from './rates-reducer';

const initialState: CurrencyRatesState = {
  error: '',
  isLoading: false,
  selectedCurrencyCode: 'CZK',
  selectedDate: new Date('2020-04-03'),
  tableData: [
    { country: 'Australia', code: 'AUD', rate: '15.176' },
    { country: 'Brazil', code: 'BRL', rate: '4.780' },
  ],
  gridData: [],
};

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toBeDefined;
  });

  it('action test', () => {
    expect(reducer(initialState, setIsLoading(true))).toEqual({
      error: '',
      isLoading: true,
      selectedCurrencyCode: 'CZK',
      selectedDate: new Date('2020-04-03'),
      tableData: [
        { country: 'Australia', code: 'AUD', rate: '15.176' },
        { country: 'Brazil', code: 'BRL', rate: '4.780' },
      ],
      gridData: [],
    });
  });
});
