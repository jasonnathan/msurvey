//@flow
import React from 'react';
import { connect } from 'react-redux';
import { reject, uniq, isEmpty } from 'ramda';
import { setError, unsetError } from '../';

type Props = {
  label: string,
  labelClassName: string,
  pattern?: string,
  required?: boolean,
  name: string,
  type: string,
  errorMessage?: string,
  containerClassName: string,
  pristine: boolean
};

class FloatingLabelInput extends React.PureComponent<Props> {
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

    if (eventName === 'onChange') {
      this.props.unsetError(this.props.formname, this.input.name);
      this.validate(event);
    }
  };

  componentDidMount() {
    !this.props.pristine && this.validate();
  }

  validate = () => {
    if (!this.input || !this.feedback || !this.label) return;

    const { validity, validationMessage } = this.input;
    const { setError, unsetError, formname, name, required } = this.props;

    if (required && isEmpty(this.input.value)) {
      setError(formname, name);
      this.feedback.textContent = 'This is a required field';
    }

    if (!validity.valid) {
      setError(formname, name);
      const errorMsg = this.label.dataset.error || validationMessage;
      return (this.feedback.textContent = errorMsg);
    }
    unsetError(formname, name);
    return (this.feedback.textContent = '');
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
          onKeyDown={ this.toggleLabel('onKeyDown') }
          onChange={ this.toggleLabel('onChange') }
          onFocus={ this.toggleLabel('onFocus') }
          onBlur={ this.toggleLabel('onBlur') }
          { ...(pattern ? { pattern } : {}) }
        />
        <label
          ref={ ref => (this.label = ref) }
          htmlFor={ name }
          className={ this.state.labelClasses.join(' ') }
          data-error={ errorMessage }
        >
          {label}
        </label>
        <span ref={ ref => (this.feedback = ref) } className="invalid-feedback" />
      </div>
    );
  }
}
export default connect(
  null,
  { setError, unsetError }
)(FloatingLabelInput);
