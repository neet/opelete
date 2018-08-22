import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    const handler = jest.fn();
    const tree = renderer.create(
      <Checkbox
        checked={false}
        text='hoge'
        onChange={handler}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
