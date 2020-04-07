import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CurrencyRatesState } from '../types/rates';
import App from './app';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props: CurrencyRatesState = {
    error: '',
    tableData: [],
    isLoading: false,
    selectedCurrencyCode: '',
    selectedDate: new Date(),
    ratesData: [],
  };

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('App Component', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('div').first().hasClass('App')).toBe(true);
    expect(enzymeWrapper.find('DatePicker')).toBeDefined();
    expect(enzymeWrapper.find('SelectComponent')).toBeDefined();
    expect(enzymeWrapper.find('BootstrapTable')).toBeDefined();
  });
});
