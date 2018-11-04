/**
 * @package Fixtures (Startup)
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    const superAdmin = Accounts.createUser({
      username: 'jasonnathan',
      email: 'jjnathanjr@gmail.com',
      password: 'Launchpad@blk71',
      profile: {
        firstName: 'Jason',
        lastName: 'Nathan'
      }
    });

    Meteor.users.update(
      { _id: superAdmin, 'emails.address': 'jjnathanjr@gmail.com' },
      { $set: { 'emails.$.verified': true } }
    );

    Roles.addUsersToRoles(
      superAdmin,
      ['super-admin', 'admin'],
      Roles.GLOBAL_GROUP
    );

    const user = Accounts.createUser({
      username: 'User 1',
      email: 'jjnathanjr+1user@gmail.com',
      password: 'Launchpad@blk71',
      profile: {
        firstName: 'User 1',
        lastName: 'Nathan'
      }
    });

    Meteor.users.update(
      { _id: user, 'emails.address': 'jjnathanjr+1user@gmail.com' },
      { $set: { 'emails.$.verified': true } }
    );
    Roles.addUsersToRoles(user, ['user'], Roles.GLOBAL_GROUP);
  }
});
