/**
 * @package features/Accounts/SignUp
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React from 'react';
import { Link } from '@react-navigation/web';
import { connect } from 'react-redux';

import Form, { FloatingLabelInput, init } from '/imports/ui/features/Form';

class SignUp extends React.PureComponent {
  static defaultProps = {
    errorMessage: null
  };

  constructor(props) {
    super(props);
    props.init('SignUp');
  }

  showError = () => {
    const { errorMessage } = this.props;
    return errorMessage ? (
      <p className="text-default red-text">{errorMessage}</p>
    ) : (
      <p className="text-default grey-text">
        Create your account and we&#39;re all set to go!
      </p>
    );
  };
  render() {
    return (
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        <h4 className="light-blue-text text-lighten-1">Welcome to MSurvey!</h4>
        {this.showError()}
        <Form
          name="SignUp"
          className="z-depth-1 bordered slim"
          method="post"
          id="signUpForm"
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
            label="New Password"
            labelClassName="col s12"
            name="newPassword"
            type="password"
            pattern=".{8,}"
            errorMessage="Your password should be at least 8 characters long"
            containerClassName="input-field suffix col s12"
          />
          <FloatingLabelInput
            required
            label="Confirm Password"
            labelClassName="col s12"
            name="confirmNewPassword"
            type="password"
            errorMessage="Your passwords do not match"
            containerClassName="input-field suffix col s12"
          />
          <button
            type="submit"
            className="waves-effect waves-light btn btn-large col s10 offset-s1 light-blue accent-3"
          >
            Continue
          </button>
          <Link routeName="Login">Sign in instead?</Link>
        </Form>
      </div>
    );
  }
}
SignUp.path = 'signup';
SignUp.navigationOptions = {
  title: 'Sign Up',
  linkName: 'Sign Up'
};

export default connect(
  null,
  dispatch => ({ init: name => dispatch(init(name)) })
)(SignUp);