import React from 'react';
import { render } from '@testing-library/react-native';
import Row from './Row';

describe(Row.name, () => {
  it('should render correctly', () => {
    expect(render(<Row />).asJSON()).toMatchSnapshot();
  });
});
