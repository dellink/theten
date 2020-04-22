import React from 'react';
import { render } from '@testing-library/react-native';
import { tiles } from '../../mocks';
import GameButton from './GameButton';

describe(GameButton.name, () => {
  it('should render correctly', () => {
    expect(render(<GameButton tile={tiles[0]} />).asJSON()).toMatchSnapshot();
  });
});
