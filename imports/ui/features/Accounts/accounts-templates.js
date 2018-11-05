/**
 * @package Accounts Templates
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

Session.setDefault('isLoginError', false);
/**
 * Fix to trigger the label transition when it is clicked on this is a bug currently.
 * @param {object} e event object
 */
const setLabelActive = function(e) {
  $(e.currentTarget)
    .parent()
    .find('input')
    .focus();
};

/**
 * LOGIN FORM
 */
Template.loginForm.onCreated(function() {
  this.isProcessing = new ReactiveVar(false);
});

Template.loginForm.onRendered(function() {
  $('.tooltipped').tooltip();
});

Template.loginForm.helpers({
  title() {
    const redirect = FlowRouter.getQueryParam('redirect');
    return redirect
      ? 'Please sign in to continue'
      : 'Log in to your MSurvey Account';
  },
  isProcessing() {
    return Template.instance().isProcessing.get();
  },
  errorMessage() {
    const em = Session.get('isLoginError');

    return _.isString(em) ? em : null;
  }
});

Template.loginForm.events({
  'click .input-field label': setLabelActive,
  'submit #loginForm'(e, tmpl) {
    e.preventDefault();
    let formInputs = tmpl.$('#loginForm input'),
      hasErrors = false,
      email,
      password;

    formInputs.each(function() {
      let element = $(this),
        name = element.attr('name');

      if (element.hasClass('invalid')) {
        hasErrors = true;
        return;
      }

      name === 'email' && (email = element.val().trim());
      name === 'password' && (password = element.val());
    });

    if (hasErrors) {
      return false;
    }
    tmpl.isProcessing.set(true);
    // deferring to allow animation
    Meteor.setTimeout(() => {
      Meteor.loginWithPassword(email, password, err => {
        tmpl.isProcessing.set(false);
        if (err) {
          return Session.set(
            'isLoginError',
            'Sorry, your password and email do not match'
          );
        }

        Session.set('isLoginError', false);
        const redirect = FlowRouter.getQueryParam('redirect');

        if (redirect) {
          return FlowRouter.go(decodeURIComponent(redirect));
        }

        FlowRouter.go('dashboardHome');
      });
    }, 500);
  }
});
/******************************************************************************/

/**
 * SIGN UP FORM
 */
Template.betaSignupForm.onCreated(function() {
  this.hasErrors = new ReactiveVar(false);
});
Template.betaSignupForm.onRendered(function() {
  $('.tooltipped').tooltip();
});

Template.betaSignupForm.helpers({
  errorMessage() {
    const em = Template.instance().hasErrors.get();
    return _.isString(em) ? em : null;
  }
});

Template.betaSignupForm.events({
  'click #logOutBadRequest'(e, tmpl) {
    e.preventDefault();
    Accounts.logOut();
    window.location.href = '/';
  },
  'click .input-field label': setLabelActive,
  'blur input, keyup input, change input'(e, tmpl) {
    let element = $(e.currentTarget),
      formInputs = $('#betaSignupForm input'),
      hasErrors = false,
      name = element.attr('name');

    if (name === 'confirmNewPassword') {
      if (element.val() !== $('input[name=newPassword]').val()) {
        element.addClass('invalid');
      } else {
        element.removeClass('invalid');
      }
    }

    formInputs.each(function() {
      if ($(this).hasClass('invalid') || !$(this).val()) {
        hasErrors = true;
      }
    });

    tmpl.hasErrors.set(hasErrors);
  },
  'submit #betaSignupForm'(e, tmpl) {
    e.preventDefault();
    let inputs = tmpl.$('#betaSignupForm input'),
      hasErrors = false,
      pass,
      confirmPass;

    inputs.each(function() {
      let element = $(this),
        name = element.attr('name');

      if (element.hasClass('invalid')) {
        hasErrors = true;
      }

      name === 'newPassword' && (pass = element.val());
      name === 'confirmNewPassword' && (confirmPass = element.val());
    });

    if (pass !== confirmPass) {
      hasErrors = true;
      $('input[name=confirmNewPassword]').addClass('invalid');
    }

    if (hasErrors) {
      return false;
    }

    Accounts.resetPassword(FlowRouter.getParam('token'), pass, err => {
      if (err) {
        return tmpl.hasErrors.set(err.reason);
      }
      return FlowRouter.go('dashboardHome');
    });
  }
});
/******************************************************************************/

/**
 * FORGOT PASSWORD FORM
 */
Template.forgetPasswordForm.onCreated(function() {
  // used to hold the email address
  this.emailField = new ReactiveVar(null);

  // flag to update UI if processing
  this.isProcessing = new ReactiveVar(false);

  // flag to display success message
  this.isSuccess = new ReactiveVar(false);

  // flag to display error message
  this.isError = new ReactiveVar(false);

  // flag to trigger email
  this.foundUser = new ReactiveVar(null);

  // run a tracker to detect a found user to invoke the forgot password methods accordingly
  this.autorun(comp => {
    const u = this.foundUser.get();

    // re-run if no user is found
    if (!u) return;

    // stop the computation
    comp.stop();

    // call the forgotPassword function to send an email to the user
    Meteor.call('accounts.sendPasswordResetEmail', u, (err, res) => {
      this.isProcessing.set(false);
      if (err) {
        return this.isError.set(err.reason);
      }
      if (res) {
        this.isSuccess.set(true);
      }
    });
  });
});

Template.forgetPasswordForm.onRendered(function() {
  $('.tooltipped').tooltip();
});

Template.forgetPasswordForm.helpers({
  // helper but not used because html5 validation does not trigger until blur
  submitEnabled() {
    return Template.instance().emailField.get() ? '' : 'disabled';
  },
  isProcessing() {
    return Template.instance().isProcessing.get();
  },
  isError() {
    return Template.instance().isError.get();
  },
  isSuccess() {
    return Template.instance().isSuccess.get();
  }
});

Template.forgetPasswordForm.events({
  // update the email field whenever a user makes changes to the field
  'blur #forgotEmail > input'(e, tmpl) {
    // tmpl.$ is local to the template instance, making it that much more effecient
    const email = tmpl.$('#forgotEmail input');

    //unfortunately, html5 validation only kicks in after the the input loses focus
    tmpl.emailField.set(email.hasClass('valid') ? email.val() : null);
  },

  // submission finds a user by email which in turn triggers the autorun to submit a password reset email
  'submit #forgetPasswordForm'(e, tmpl) {
    e.preventDefault();
    const email = tmpl.$('#forgotEmail input');

    // nothing to do if email is not valid
    if (email.hasClass('invalid')) {
      return false;
    }

    // set the isProcessing flag to true
    tmpl.isProcessing.set(true);

    //reset errors
    tmpl.isError.set(null);

    // check for an existing user and set the reactive var accordingly
    Meteor.call('accounts.checkEmailExists', email.val().trim(), function(
      err,
      res
    ) {
      if (err) {
        tmpl.isProcessing.set(false);
        // errors get displayed is there are any
        return tmpl.isError.set(err.reason);
      }

      // we found a user. this triggers the autorun above
      return !!res && tmpl.foundUser.set(res);
    });
  },
  // make sure label clicks allow the underlying input to focus
  'click .input-field label': setLabelActive
});
/******************************************************************************/

/**
 * RESET PASSWORD FORM
 */

Template.resetpasswordForm.onCreated(function() {
  this.hasErrors = new ReactiveVar(true);
});

Template.resetpasswordForm.onRendered(function() {
  $('.tooltipped').tooltip();
});

Template.resetpasswordForm.helpers({
  submitEnabled() {
    return Template.instance().hasErrors.get() ? 'disabled' : '';
  },
  errorMessage() {
    const em = Template.instance().hasErrors.get();

    return _.isString(em) ? em : false;
  }
});

Template.resetpasswordForm.events({
  'blur input, keyup input, change input'(e, tmpl) {
    let element = $(e.currentTarget),
      formInputs = $('#resetpasswordForm input'),
      hasErrors = false,
      name = element.attr('name');

    if (name === 'confirmResetPassword') {
      if (element.val() !== $('input[name=resetPassword]').val()) {
        element.addClass('invalid');
      } else {
        element.removeClass('invalid');
      }
    }

    formInputs.each(function() {
      if ($(this).hasClass('invalid') || !$(this).val()) {
        hasErrors = true;
      }
    });

    tmpl.hasErrors.set(hasErrors);
  },
  'click .input-field label': setLabelActive,
  'submit #resetpasswordForm'(e, tmpl) {
    e.preventDefault();
    let inputs = tmpl.$('#resetpasswordForm input'),
      hasErrors = false,
      pass,
      confirmPass;

    inputs.each(function() {
      let element = $(this),
        name = element.attr('name');

      if (element.hasClass('invalid')) {
        hasErrors = true;
      }

      name === 'resetPassword' && (pass = element.val());
      name === 'confirmResetPassword' && (confirmPass = element.val());
    });

    if (pass !== confirmPass) {
      hasErrors = true;
      $('input[name=confirmResetPassword]').addClass('invalid');
    }

    if (hasErrors) {
      return false;
    }

    Accounts.resetPassword(FlowRouter.getParam('token'), pass, err => {
      if (err) {
        tmpl.hasErrors.set(err.reason);
      }
      FlowRouter.go('dashboardHome');
    });
  }
});
/******************************************************************************/
