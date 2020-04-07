import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectComponent from './select-component';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    defaultOption: 'ALL',
    options: ['first', 'second', 'third'],
    onChange: jest.fn()
  };

  const enzymeWrapper = shallow(<SelectComponent {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('components', () => {
  describe('Select Component', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('select').hasClass('form-control form-control-lg')).toBe(true);
      expect(enzymeWrapper.find('option').getElements().length).toEqual(4);
      expect(enzymeWrapper.find('option').first().text()).toBe('ALL');
      expect(enzymeWrapper.find('option').last().text()).toBe('third');
    });

    it('should call onChange ', () => {
      const { enzymeWrapper, props } = setup();
      const select = enzymeWrapper.find('select');
      const mockEvent = { target: { value: 'third' } };
      select.simulate('change', mockEvent);
      expect(props.onChange).toHaveBeenCalledWith(mockEvent);
    });
  });
});