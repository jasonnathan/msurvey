// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { formHasErrors } from './';

type Props = {
  children: React.Node,
  onSubmit: () => void,
  name: string
};

class Form extends React.PureComponent<Props> {
  renderChildren = () => {
    return React.Children.map(this.props.children, child => {
      if (child.type === 'button' && child.props.type === 'submit') {
        return React.cloneElement(child, {
          disabled: this.props.formstate.pristine || formHasErrors(this.props.formstate),
          formname: this.props.name,
          ...(this.props.formstate.pristine
            ? { pristine: this.props.formstate.pristine }
            : {})
        });
      }
      return React.cloneElement(child, {
        formname: this.props.name,
        ...(this.props.formstate.pristine
          ? { pristine: this.props.formstate.pristine }
          : {})
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (formHasErrors(this.props.formstate)) {
      this.props.onSubmit();
    }
  };

  render() {
    return (
      <form
        name={ this.props.name }
        className={ this.props.className }
        method={ this.props.method }
        id={ this.props.id }
        ref={ form => (this.formEl = form) }
        onSubmit={ this.handleSubmit }
        noValidate
      >
        {this.renderChildren()}
      </form>
    );
  }
}

const mapStateToProps = ({ formReducer }, { name }) => {
  return {
    formstate: { ...(formReducer[name] || {}) }
  };
};

export default connect(mapStateToProps)(Form);
