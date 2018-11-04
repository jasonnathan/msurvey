/**
 * @package features/Accounts/ResetPassword
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React from 'react';

import Form from '/imports/ui/components/Form';
import FloatingLabelInput from '/imports/ui/components/FloatingLabelInput';

export default class ResetPassword extends React.PureComponent {
  static defaultProps = {
    errorMessage: null
  };
  showError = () => {
    const { errorMessage } = this.props;
    return errorMessage ? (
      <p className="text-default red-text">{errorMessage}</p>
    ) : (
      <p className="text-default grey-text">
        You will be logged in immediately
      </p>
    );
  };
  render() {
    return (
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        <h4 className="light-blue-text text-lighten-1">Reset your password</h4>
        {this.showError()}
        <Form
          className="z-depth-1 bordered slim"
          method="post"
          id="resetpasswordForm"
        >
          <br />
          <FloatingLabelInput
            required
            label="New Password"
            labelClassName="col s12"
            name="resetPassword"
            type="password"
            pattern=".{8,}"
            errorMessage="Your password should be at least 8 characters long"
            containerClassName="input-field suffix col s12"
          />
          <FloatingLabelInput
            required
            label="Confirm Password"
            labelClassName="col s12"
            name="confirmResetPassword"
            type="password"
            errorMessage="Your passwords do not match"
            containerClassName="input-field suffix col s12"
          />
          <button
            type="submit"
            className="waves-effect waves-light btn btn-large col s10 offset-s1 light-blue accent-3"
            { ...this.props.submitEnabled }
          >
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

ResetPassword.path = 'resetPassword';
ResetPassword.navigationOptions = {
  title: 'Reset Password',
  linkName: 'Reset Password'
};
