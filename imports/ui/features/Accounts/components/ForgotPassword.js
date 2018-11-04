/**
 * @package features/Accounts/ForgotPassword
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React from 'react';
import { Link } from '@react-navigation/web';

import Form from '/imports/ui/components/Form';
import CenteredCircularLoading from '/imports/ui/components/CenteredCircularLoading';
import FloatingLabelInput from '/imports/ui/components/FloatingLabelInput';

export default class ForgotPassword extends React.PureComponent {
  static defaultProps = {
    isProcessing: false,
    isSuccess: false,
    errorMessage: null
  };
  showLoading = () => (
    <div>
      <h4 className="light-blue-text text-lighten-1">
        Verifying your account...
      </h4>
      <p className="text-default grey-text">
        Please wait a moment while we verify your account and prepare your
        email.
      </p>
      <CenteredCircularLoading />
    </div>
  );

  showSuccess = () => {
    <div>
      <h4 className="light-blue-text text-lighten-1">Email Request Sent!</h4>
      <p className="text-default grey-text">
        Please check your email within the next few minutes for instructions on
        how to reset your password.
      </p>
    </div>;
  };

  isNotNormalState = () => {
    const { isProcessing, isSuccess } = this.props;
    if (isProcessing) return this.showLoading();
    if (isSuccess) return this.showSuccess();

    return null;
  };

  showError = () => {
    const { errorMessage } = this.props;
    return errorMessage ? (
      <p className="text-default red-text">{errorMessage}</p>
    ) : (
      <p className="text-default grey-text">
        To reset your password, please enter the email address you use to sign
        in to your MSurvey account. You will receive an email with a link to
        reset your password.
      </p>
    );
  };
  render() {
    return (
      this.isNotNormalState() || (
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <h4 className="light-blue-text text-lighten-1">
            Reset your password
          </h4>
          {this.showError()}
          <Form
            onSubmit={ () => console.log('submitted') }
            className="z-depth-1 bordered slim"
            method="post"
            id="forgetPasswordForm"
          >
            <br />
            <FloatingLabelInput
              required
              label="Email Address"
              labelClassName="col s12"
              name="forgotEmail"
              type="email"
              errorMessage="Please enter a valid email address"
              containerClassName="input-field suffix col s12"
            />
            <p />
            <button
              type="submit"
              className="waves-effect waves-light btn btn-large col s10 offset-s1 light-blue accent-3"
            >
              Reset my Password
            </button>
            <Link routeName="SignUp">Back to Sign In</Link>
          </Form>
        </div>
      )
    );
  }
}

ForgotPassword.path = 'resetPassword';
ForgotPassword.navigationOptions = {
  title: 'Reset Password',
  linkName: 'Reset Password'
};
