import * as React from 'react';

export interface Props {
  className?: string;
  text?: string;
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export class Button extends React.PureComponent<Props> {

  private handleClick = () => {
    if ( this.props.href ) {
      window.location.href = this.props.href;
    } else if ( this.props.onClick ) {
      this.props.onClick();
    }
  }

  public render () {
    const { text, children, className } = this.props;

    return (
      <button className={`button ${className}`} aria-label={text} onClick={this.handleClick}>
        {children || text}
      </button>
    );
  }

}
