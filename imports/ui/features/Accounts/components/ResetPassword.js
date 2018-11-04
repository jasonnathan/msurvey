/**
 * @package features/Accounts/ResetPassword
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React from 'react';

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
        <form
          className="z-depth-1 bordered slim"
          method="post"
          id="resetpasswordForm"
        >
          <br />
          <div className="input-field suffix col s12" id="resetPassword">
            <input
              type="password"
              className="validate"
              name="resetPassword"
              required
              pattern=".{8,}"
            />
            <label
              htmlFor="resetPassword"
              className="col s12"
              data-error="Your password should be at least 8 characters long"
            >
              New Password
            </label>
          </div>
          <div className="input-field suffix col s12" id="confirmResetPassword">
            <input
              type="password"
              className="validate"
              name="confirmResetPassword"
              required
            />
            >
            <label
              htmlFor="confirmResetPassword"
              className="col s12"
              data-error="Your passwords do not match"
            >
              Confirm Password
            </label>
          </div>
          <button
            type="submit"
            className="waves-effect waves-light btn btn-large col s10 offset-s1 light-blue accent-3"
            { ...this.props.submitEnabled }
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

ResetPassword.path = 'resetPassword';
ResetPassword.navigationOptions = {
  title: 'Reset Password',
  linkName: 'Reset Password'
};
