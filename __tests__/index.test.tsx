import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import '../setupTests';

import Home from '../pages/index';

describe('With Enzyme', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Home title="Welcome to Surveillo" />);
  });

  it('Home component renders title prop in a h1 element', () => {
    expect(wrapper.find('h1').text()).toEqual('Welcome to Surveillo');
  });
});
