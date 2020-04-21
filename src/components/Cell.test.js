import React from 'react';
import { render } from '@testing-library/react-native';
import { tiles } from '../../mocks';
import Cell from './Cell';

jest.useFakeTimers();

describe(Cell.name, () => {
  it('should render correctly', () => {
    expect(render(<Cell tile={tiles[0]} />).asJSON()).toMatchSnapshot();
  });

  it('should render correct tile value', async () => {
    expect(render(<Cell tile={tiles[0]} />).getByText(`${tiles[0].value}`)).toBeTruthy();
  });
});
