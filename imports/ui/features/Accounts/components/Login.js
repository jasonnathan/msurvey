/**
 * @package features/Accounts/Login
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React from 'react';
import { Link } from '@react-navigation/web';
import { connect } from 'react-redux';

import Form, { FloatingLabelInput, init } from '/imports/ui/features/Form';
import CenteredCircularLoading from '/imports/ui/components/CenteredCircularLoading';

class Login extends React.PureComponent {
  static defaultProps = {
    title: 'Please sign in to continue',
    isProcessing: false,
    errorMessage: null
  };

  constructor(props) {
    super(props);
    props.init('Login');
  }

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
      <p className="text-default grey-text">MSurvey is currently in beta</p>
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
        <Form
          name="Login"
          className="z-depth-1 bordered slim"
          method="post"
          id="loginForm"
        >
          <br />
          <FloatingLabelInput
            required
            label="Email Address"
            labelClassName="col s12"
            name="username"
            type="email"
            containerClassName="input-field suffix col s12"
          />
          <FloatingLabelInput
            required
            label="Password"
            labelClassName="col s12"
            name="password"
            type="password"
            errorMessage="This is a required field"
            containerClassName="input-field suffix col s12"
          />
          <button
            type="submit"
            className="waves-effect waves-light btn btn-large col s12 light-blue accent-3"
          >
            Sign In
          </button>
          <Link routeName="ForgotPassword">Forgot your password?</Link>
        </Form>
      </div>
    );
  }
}
Login.path = 'signin';
Login.navigationOptions = {
  title: 'Sign In',
  linkName: 'Sign In'
};

export default connect(
  null,
  dispatch => ({ init: name => dispatch(init(name)) })
)(Login);
