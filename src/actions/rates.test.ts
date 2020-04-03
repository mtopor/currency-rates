import { setIsLoading } from '../actions/rates';
import { SET_IS_LOADING } from '../types/rates';

describe('actions', () => {
  it('should create an action set isLoading flag', () => {
    const expectedAction = {
      type: SET_IS_LOADING,
      payload: true,
    };
    expect(setIsLoading(true)).toEqual(expectedAction);
  });
});
