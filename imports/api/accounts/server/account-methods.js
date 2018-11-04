/**
 * @package Emailer
 * @copyright Jason J Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { merge } from 'ramda';
import Emailer from '/imports/startup/server/email.js';

Meteor.methods({
  /**
   * A simple method that finds a user by his email or throws an error
   * if one is not found
   *
   * @param  {String} email A valid email address
   * @return {String}       The user id of the found user
   */
  'accounts.checkEmailExists'(email) {
    check(email, String);
    const user = Accounts.findUserByEmail(email);

    if (!user) {
      throw new Meteor.Error(403, 'No record found for that email address');
    }

    return user._id;
  },

  /**
   * Send the user an email with a link that when opened allows the user
   * to set a new password, without the old password. See adaptation from
   * [(accounts-password/password_server.js, line 529)]
   * {@link https://github.com/meteor/meteor/blob/master/packages/accounts-password/password_server.js#L529}.
   *
   * @summary Send an email with a link the user can use to reset their password.
   * @locus Server
   * @param {String} userId The id of the user to send email to.
   */
  'accounts.sendPasswordResetEmail'(userId) {
    this.unblock();

    const user = Meteor.users.findOne(userId);

    if (!user) {
      // bad request
      throw new Meteor.Error(
        400,
        'Password Request called, but no user was found'
      );
    }

    // for now, we default to the first email found
    const email = user.emails[0].address;

    const token = Random.secret();
    const when = new Date();
    const tokenRecord = {
      token,
      email,
      when
    };

    // update mongo with the new token
    Meteor.users.update(userId, {
      $set: {
        'services.password.reset': tokenRecord
      }
    });

    // before passing to template, update user object with new token
    Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

    // use custom emailer class
    const mailer = new Emailer({
      to: email,
      firstName: user.profile.firstName,
      subject: {
        color: '#c20062',
        title: 'Password Reset Request'
      },
      teaser:
        "We have received a request to reset your password. If you haven't requested for one, please ignore this email, otherwise please click the button to reset your password.",
      message:
        "We have received a request to reset your password. If you haven't requested for one, please ignore this email, otherwise please click the button to reset your password.",
      action: {
        link: Accounts.urls.resetPassword(token),
        text: 'Reset Password Now'
      }
    });

    mailer.send();
    return true;
  },

  /**
   * Create a user without a password so that we can send him an invite email
   * subsequently to activate his account. Only a user with the role admin can
   * perform this action and is subsequently added to the newly created user's
   * invitedBy field
   *
   * {@link https://github.com/meteor/meteor/blob/master/packages/accounts-password/password_client.js#L115}.
   *
   * @summary Create a user if he doesn't exists and return his userId
   * @locus Server
   * @param {Object} params with props firstName, lastName, email and role
   */
  'accounts.createInviteUser'(params) {
    const { firstName, lastName, email, role } = params;

    check(firstName, String);
    check(lastName, String);
    check(email, String);
    check(role, String);

    if (Accounts.findUserByEmail(email)) {
      throw new Meteor.Error(
        400,
        'User with given email address already exists!'
      );
    }

    const admin = Meteor.userId();

    // nothing left to do if no user or not an admin
    if (!admin || !Roles.userIsInRole(admin, ['admin'], Roles.GLOBAL_GROUP)) {
      // client catches this
      throw new Meteor.Error(
        403,
        'You must be an admin to perform this action'
      );
    }

    this.unblock();

    // create a user without a password
    const createdUserId = Accounts.createUser({
      email: email,
      profile: {
        firstName,
        lastName
      }
    });

    // set the inviteBy flag so we know who invited this user
    Meteor.users.update(createdUserId, {
      $set: {
        invitedBy: admin
      }
    });

    // add the given role to the user
    Roles.addUsersToRoles(createdUserId, [role], Roles.GLOBAL_GROUP);

    return createdUserId;
  },

  /**
   * Send the user an email informing them that their account was created, with
   * a link that when opened both marks their email as verified and forces them
   * to choose their password. We also add the token for email verification because
   * it makes sense to do both in this case.
   *
   * See adaptation from
   * [(accounts-password/password_server.js, line 595)]
   * {@link https://github.com/meteor/meteor/blob/master/packages/accounts-password/password_server.js#L595}.
   *
   * @summary Send an email with a link the user can use to set their initial password.
   * @locus Server
   * @param {String} userId The id of the user to send email to.
   */
  'accounts.sendInviteEmail'(userId) {
    this.unblock();

    // only admins, infering logged in admins, can call this method
    const admin = Meteor.userId();

    if (!admin || !Roles.userIsInRole(admin, ['admin'], Roles.GLOBAL_GROUP)) {
      //throw forbidden
      throw new Meteor.Error(403, 'Only admins can send out invites');
    }

    const user = Meteor.users.findOne(userId);

    if (!user) {
      // throw bad request
      throw new Meteor.Error(
        400,
        'Password Request called, but no user was found'
      );
    }

    const email = user.emails[0].address;

    const token = Random.secret();
    const when = new Date();
    const tokenRecord = {
        token,
        email,
        when
      },
      emailTokenRecord = merge(tokenRecord, { address: email });

    Meteor.users.update(userId, {
      $set: { 'services.password.reset': tokenRecord },
      $push: { 'services.email.verificationTokens': emailTokenRecord }
    });

    Meteor._ensure(user, 'services', 'email');
    Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

    // set to array if doesn't exist
    if (!user.services.email.verificationTokens) {
      user.services.email.verificationTokens = [];
    }

    // here's where we copy the token to the user's email service
    user.services.email.verificationTokens.push(emailTokenRecord);

    Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

    const mailer = new Emailer({
      to: email,
      firstName: user.profile.firstName,
      subject: {
        color: '#444444',
        title: 'You were invited to MSurvey!'
      },
      teaser: 'This is an exclusive invitation to use the MSurvey platforms.',
      message: 'This is an exclusive invitation to use the MSurvey platforms.',
      action: {
        link: Accounts.urls.enrollAccount(token),
        text: 'Sign Up Now'
      }
    });
    mailer.send();
    return true;
  }
});
