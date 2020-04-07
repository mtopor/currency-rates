import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SpinnerComponent from './spinner-component';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<SpinnerComponent />);

  return {
    enzymeWrapper,
  };
}

describe('Spinner component smoke test', () => {
  it('should render Spinner component', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('div').first().hasClass('spinner')).toBe(true);
    expect(enzymeWrapper.find('div').last().hasClass('lds-dual-ring')).toBe(
      true
    );
  });
});
