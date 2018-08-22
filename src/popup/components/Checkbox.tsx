import * as React from 'react';
import Toggle from 'react-toggle';

export interface Props {
  text?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Checkbox extends React.PureComponent<Props> {

  public static defaultProps: Props = {
    checked: false,
  };

  public render () {
    const { text, checked, children, onChange } = this.props;

    return (
      <label className='preference-modifier' >
        <div className='preference-modifier__label'>
          {children || text || ''}
        </div>

        <Toggle
          checked={checked}
          icons={false}
          onChange={onChange}
        />
      </label>
    );
  }

}
