import React from 'react';
import { act, render } from '@testing-library/react-native';
import Game from './Game';

jest.spyOn(React, 'useEffect').mockImplementation(() => {});

describe(Game.name, () => {
  it('should render initial state correctly', () => {
    expect(render(<Game />).asJSON()).toMatchSnapshot();
  });
});
