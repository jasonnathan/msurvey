/**
 * @package features/Accounts/Login
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React from 'react';
import { Link } from '@react-navigation/web';

import CenteredCircularLoading from '/imports/ui/components/CenteredCircularLoading';

export default class Login extends React.PureComponent {
  static defaultProps = {
    title: 'Please sign in to continue',
    isProcessing: false,
    errorMessage: null
  };

  showLoading = () => (
    <div>
      <h4 className="light-blue-text text-lighten-1">Logging in...</h4>
      <p className="text-default grey-text">
        Please wait a moment while we log you in.
      </p>
      <CenteredCircularLoading />
    </div>
  );

  showError = () => {
    const { errorMessage } = this.props;
    return errorMessage ? (
      <p className="text-default red-text">{errorMessage}</p>
    ) : (
      <p className="text-default grey-text">
        MSurvey is currently is private beta
      </p>
    );
  };
  render() {
    const { isProcessing, title } = this.props;
    return isProcessing ? (
      this.showLoading()
    ) : (
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        <h4 className="light-blue-text text-lighten-1">{title}</h4>
        {this.showError()}
        <form className="z-depth-1 bordered slim" method="post" id="loginForm">
          <br />
          <div className="input-field suffix col s12" id="email">
            <input type="email" name="email" className="validate" required="" />
            <label
              className="col s12"
              htmlFor="email"
              data-error="Please enter a valid email address"
            >
              Email Address
            </label>
          </div>
          <div className="input-field suffix col s12" id="password">
            <input
              name="password"
              type="password"
              className="validate"
              required
            />
            <label className="col s12" htmlFor="password">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="waves-effect waves-light btn btn-large col s12 light-blue accent-3"
          >
            Sign In
          </button>
          <Link routeName="ForgotPassword">Forgot your password?</Link>
        </form>
      </div>
    );
  }
}
Login.path = 'signin';
Login.navigationOptions = {
  title: 'Sign In',
  linkName: 'Sign In'
};