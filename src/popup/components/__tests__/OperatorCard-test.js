import React from 'react';
import OperatorCard from '../OperatorCard';
import renderer from 'react-test-renderer';

describe('OperatorCard', () => {
  it('renders a checkbox', () => {
    const tree = renderer.create(
      <OperatorCard
        operator={{
          id: 'site',
          operator: 'site:',
          description: 'Search for a specific site',
        }}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
