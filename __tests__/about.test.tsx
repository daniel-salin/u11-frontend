import { shallow } from 'enzyme';
import React from 'react';
import '../setupTests';

import About from '../pages/about';

describe('With Enzyme', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  it('About component shows About Page header', () => {
    expect(wrapper.find('h1').text()).toEqual('About Page');
  });
});
