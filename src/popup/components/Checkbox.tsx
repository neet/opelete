import React from 'react';
import Toggle from 'react-toggle';

export interface Props {
  text?: string;
  value?: boolean;
  children?: React.ReactNode;
  onChange: () => void;
}

export class Checkbox extends React.PureComponent<Props> {

  public static defaultProps = {
    value: false,
  };

  public render () {
    const { text, value, children, onChange } = this.props;

    return (
      <label className='preference-modifier' >
        <div className='preference-modifier__label'>
          {children || text || ''}
        </div>

        <Toggle
          checked={value}
          icons={false}
          onChange={onChange}
        />
      </label>
    );
  }

}
