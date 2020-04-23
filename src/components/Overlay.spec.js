import React from 'react';
import { render } from '@testing-library/react-native';
import Overlay from './Overlay';

describe(Overlay.name, () => {
  it('should render correctly', () => {
    expect(
      render(<Overlay message="Game over" buttonText="Try again" />).asJSON(),
    ).toMatchSnapshot();
  });
});
