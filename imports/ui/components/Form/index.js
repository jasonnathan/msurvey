// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
  onSubmit: () => void
};

export default class Form extends React.PureComponent<Props> {
  validate = () => {
    if (!this.formEl.checkValidity()) {
      [...this.formEl.elements].map(element => {
        const { parentNode, nodeName, validity, validationMessage } = element;
        const errorLabel = parentNode.querySelector('.invalid-feedback');
        console.log(validationMessage, errorLabel);
        if (errorLabel && nodeName.toLowerCase() !== 'button') {
          errorLabel.textContent = !validity.valid ? validationMessage : '';
        }
      });
      return false;
    }

    [...this.formEl.elements].map(element => {
      const { parentNode, nodeName } = element;
      const errorLabel = parentNode.querySelector('.invalid-feedback');
      if (errorLabel && nodeName.toLowerCase() !== 'button') {
        errorLabel.textContent = '';
      }
    });

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.validate());
    if (this.validate()) {
      // this.props.onSubmit();
    }
  };

  render() {
    return (
      <form
        { ...this.props }
        ref={ form => (this.formEl = form) }
        onSubmit={ this.handleSubmit }
        noValidate
      >
        {this.props.children}
      </form>
    );
  }
}
