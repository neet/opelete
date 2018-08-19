import * as React from 'react';
import Checkbox from '../Checkbox';
import renderer from 'react-test-renderer';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    const handler = jest.fn();
    const tree = renderer.create(
      <Checkbox
        className='foo'
        value={false}
        text='hoge'
        onChange={handler}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
