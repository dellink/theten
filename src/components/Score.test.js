import React from 'react';
import { render } from '@testing-library/react-native';
import Score from './Score';

describe(Score.name, () => {
  it('should render correctly', () => {
    expect(render(<Score record={0} currentValue={0} />).asJSON()).toMatchSnapshot();
  });
});
