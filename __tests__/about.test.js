import { shallow } from 'enzyme';
import React from 'react';

import About from '../pages/about';

describe('With Enzyme', () => {
  it('About component shows About Page header', () => {
    const app = shallow(<About />);
    expect(app.find('h1').text()).toEqual('About Page');
  });
});
