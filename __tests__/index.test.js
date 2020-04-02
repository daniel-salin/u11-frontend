import { shallow } from 'enzyme';
import React from 'react';

import Home from '../pages/index';

describe('With Enzyme', () => {
  it('Home component shows Surveillo', () => {
    const app = shallow(<Home />);
    expect(app.find('h1').text()).toEqual('Surveillo');
  });
});
