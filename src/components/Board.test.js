import React from 'react';
import { render } from '@testing-library/react-native';
import { tiles } from '../../mocks';
import Board from './Board';

jest.mock('./Cell', () => props => <div {...props} />);

describe(Board.name, () => {
  it('should render correctly', () => {
    expect(render(<Board tiles={tiles} />).asJSON()).toMatchSnapshot();
  });

  it('should render all cells', () => {
    const tileNodes = render(<Board tiles={tiles} />).container.findAll(node =>
      node.getProp('tile'),
    );
    expect(tileNodes).toHaveLength(tiles.length);
  });
});
