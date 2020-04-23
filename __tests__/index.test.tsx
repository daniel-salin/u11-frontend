import { shallow } from 'enzyme';
import React from 'react';
import '../setupTests';

import Home from '../pages/index';

describe('With Enzyme', () => {
  it('Home component shows Surveillo', () => {
    const app = shallow(<Home title="Welcome to Surveillo" />);
    expect(app.find('h1').text()).toEqual('Welcome to Surveillo');
  });
});
