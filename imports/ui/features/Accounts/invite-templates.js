/**
 * @package Send Invite
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'lodash';
import './invite-templates.html';

Template.inviteUserForm.onCreated(function() {
  this.hasErrors = new ReactiveVar(true);
  this.userExists = new ReactiveVar(false);
  this.isProcessing = new ReactiveVar(false);
  this.isCheckingEmail = new ReactiveVar(false);
  this.isCreatingAccount = new ReactiveVar(false);
  this.isSendingInvite = new ReactiveVar(false);
  this.createdUser = new ReactiveVar(null);
  this.sendFailed = new ReactiveVar(false);
  this.sendSucceeded = new ReactiveVar(false);
  this.name = new ReactiveVar();
  this.email = new ReactiveVar();
  this.autorun(() => {
    const u = this.createdUser.get();
    if (!u) {
      return;
    }
    this.isProcessing.set(true);
    this.hasErrors.set(false);
    this.sendFailed.set(false);
    this.sendSucceeded.set(false);

    this.isSendingInvite.set(true);
    Meteor.call('accounts.sendInviteEmail', u, (err, res) => {
      this.isSendingInvite.set(false);
      if (err) {
        this.sendFailed.set(true);
        return this.hasErrors.set(err.reason);
      }
      this.sendSucceeded.set(true);
    });
  });

  this.autorun(() => {
    let ue = this.userExists.get(),
      he = this.hasErrors;

    if (!he.get() && !!ue) {
      he.set(ue);
    }
  });
});

Template.inviteUserForm.onRendered(function() {
  Meteor.defer(() => {
    $('select').material_select();
  });

  this.autorun(() => {
    const ip = this.isProcessing.get();
    if (!ip) {
      Meteor.defer(() => {
        $('select').material_select();
      });
    }
  });
});

Template.inviteUserForm.helpers({
  canSendInvite() {
    const tmpl = Template.instance();
    return tmpl.isCheckingEmail.get()
      || tmpl.hasErrors.get()
      || tmpl.userExists.get()
      ? 'disabled'
      : '';
  },
  errorMessage() {
    const em = Template.instance().hasErrors.get();

    return _.isString(em) ? em : null;
  },
  isProcessing() {
    return Template.instance().isProcessing.get();
  },
  isCreatingAccount() {
    return Template.instance().isCreatingAccount.get();
  },
  isSendingInvite() {
    return Template.instance().isSendingInvite.get();
  },
  sendSucceeded() {
    return Template.instance().sendSucceeded.get();
  },
  sendFailed() {
    return Template.instance().sendFailed.get();
  },
  showProgress() {
    const tmpl = Template.instance();
    return tmpl.isSendingInvite.get() || tmpl.isCreatingAccount.get();
  },
  inviteeName() {
    return Template.instance().name.get();
  },
  inviteeEmail() {
    return Template.instance().email.get();
  },
  isCheckingEmail() {
    return Template.instance().isCheckingEmail.get();
  }
});

Template.inviteUserForm.events({
  'click .input-field label'(e) {
    $(e.currentTarget)
      .parent()
      .find('input')
      .focus();
  },
  'change input, blur input, change [name=role]'(e, tmpl) {
    let thisEle = tmpl.$(e.currentTarget),
      form = tmpl.$('#inviteUserForm'),
      inputs = form.find('input'),
      select = form.find('select'),
      hasErrors = false;

    !select.val()
      && select.addClass('invalid')
      && (!hasErrors && (hasErrors = true));

    inputs.each(function() {
      const i = $(this);
      if (i.hasClass('invalid') || !i.val().trim()) {
        hasErrors = true;
      }
      if (i.attr('name') === 'userEmail' && !!i.val().trim()) {
        tmpl.isCheckingEmail.set(true);

        // delay to allow for animations
        Meteor.defer(() => {
          // check for an existing user and stop if one is found
          Meteor.call('accounts.checkEmailExists', i.val().trim(), function(
            err,
            res
          ) {
            tmpl.isCheckingEmail.set(false);
            // we found a user, stop
            if (res) {
              i.addClass('invalid');
              // !hasErrors && (hasErrors = true);
              return tmpl.userExists.set('User is already in the system');
            }

            i.removeClass('invalid');
            return tmpl.userExists.set(false);
          });
        });
      }
    });

    // if (!thisEle.val().trim() || thisEle.hasClass('invalid')) {
    //     thisEle.addClass('invalid');
    //     !hasErrors && (hasErrors = true);
    //     console.log("%c ERROR TRUE: Element has invalid class(" + thisEle.attr("name") + ")", "background-color:black;color:pink");
    // }

    tmpl.hasErrors.set(hasErrors);
  },
  'click .send-invite-button'(e, tmpl) {
    let form = tmpl.$('#inviteUserForm'),
      inputs = form.find('input'),
      select = form.find('select'),
      hasErrors = false;

    inputs.each(function() {
      const i = $(this);
      if (i.hasClass('invalid') || !i.val().trim()) {
        hasErrors = true;
      }
      if (i.attr('name') === 'userEmail') {
        tmpl.isCheckingEmail.set(true);
        // check for an existing user and stop if one is found
        Meteor.call('accounts.checkEmailExists', i.val().trim(), function(
          err,
          res
        ) {
          tmpl.isCheckingEmail.set(false);
          // we found a user, stop
          if (res) {
            i.addClass('invalid');
            !hasErrors && (hasErrors = true);
            return tmpl.userExists.set('User is already in the system');
          }

          i.removeClass('invalid');
          return tmpl.userExists.set(false);
        });
      }
    });

    !select.val()
      && select.addClass('invalid')
      && !hasErrors
      && (hasErrors = true);
    tmpl.hasErrors.set(hasErrors);

    if (tmpl.hasErrors.get()) {
      return false;
    }

    tmpl.isProcessing.set(true);
    tmpl.isCreatingAccount.set(true);
    const params = {
      firstName: form
        .find('[name=firstName]')
        .val()
        .trim(),
      lastName: form
        .find('[name=lastName]')
        .val()
        .trim(),
      email: form
        .find('[name=userEmail]')
        .val()
        .trim(),
      role: form
        .find('[name=role]')
        .val()
        .trim()
    };
    // delay to allow for animations
    Meteor.setTimeout(() => {
      Meteor.call('accounts.createInviteUser', params, (err, res) => {
        tmpl.isCreatingAccount.set(false);
        if (err) {
          return tmpl.hasErrors.set(err.reason);
        }
        if (res) {
          tmpl.name.set(params.firstName + ' ' + params.lastName);
          tmpl.email.set(params.email);
          return tmpl.createdUser.set(res);
        }
      });
    }, 500);
  },
  'click button#try_again'(e, tmpl) {
    e.preventDefault();
    const user = tmpl.createdUser.get();
    tmpl.createdUser.set(null);
    Meteor.defer(() => {
      tmpl.createdUser.set(user);
    });
  },
  'click button#reset_form'(e, tmpl) {
    tmpl.isProcessing.set(false);
  }
});
