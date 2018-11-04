/**
 * @package Account Publications
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('allUsers', function(sortOpts) {
  sortOpts = sortOpts || '_id-asc';

  if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
    this.stop();
  }

  sortOpts = sortOpts.split('-');
  const ascDesc = sortOpts[1] === 'asc' ? 1 : -1;
  const sort = {};

  switch (sortOpts[0]) {
  case 'email':
    sort['emails.address'] = ascDesc;
    break;
  case 'name':
    sort['profile.firstName'] = ascDesc;
    break;
  case 'date':
    sort['createdAt'] = ascDesc;
    break;
  default:
    sort['_id'] = ascDesc;
    break;
  }

  return Meteor.users.find(
    {},
    {
      sort: sort,
      fields: {
        profile: 1,
        emails: 1,
        roles: 1,
        createdAt: 1
      }
    }
  );
});
