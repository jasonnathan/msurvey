//@flow
import React from 'react';
import { reject, uniq } from 'ramda';

type Props = {
  label: string,
  labelClassName: string,
  pattern?: string,
  required?: boolean,
  name: string,
  type: string,
  errorMessage?: string,
  containerClassName: string
};

export default class FloatingLabelInput extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      labelClasses: props.labelClassName.split(' ')
    };
  }

  toggleLabel = eventName => event => {
    if (!this.input || !this.input.value) {
      return this.setState({
        labelClasses: reject(c => c === 'active', this.state.labelClasses)
      });
    }
    if (this.input.value) {
      this.setState({
        labelClasses: uniq([...this.state.labelClasses, 'active'])
      });
    }
    if (typeof this.props[eventName] === 'function') {
      this.props[eventName](event);
    }
  };
  render() {
    const {
      name,
      label,
      pattern,
      required,
      type,
      errorMessage,
      containerClassName
    } = this.props;
    return (
      <div className={ containerClassName } id={ name }>
        <input
          ref={ input => (this.input = input) }
          type={ type }
          name={ name }
          className="validate"
          required={ required }
          onChange={ this.toggleLabel('onChange') }
          onFocus={ this.toggleLabel('onFocus') }
          onBlur={ this.toggleLabel('onBlur') }
          pattern={ pattern }
        />
        <label
          htmlFor={ name }
          className={ this.state.labelClasses.join(' ') }
          data-error={ errorMessage }
        >
          {label}
        </label>
        <span className="invalid-feedback" />
      </div>
    );
  }
}
