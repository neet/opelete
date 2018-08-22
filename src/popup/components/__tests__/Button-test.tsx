import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Button } from '../Button';

describe('Button', () => {
  it('renders a button with link', () => {
    const tree = renderer.create(
      <Button
        className='foo'
        text='hoge'
        href='https://example.com'
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a button with function', () => {
    const handler = jest.fn();
    const tree = renderer.create(
      <Button
        className='foo'
        text='hoge'
        onClick={handler}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
