/**
 * @package Account Methods Test
 * @copyright Jason J Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>
 * @version  1.0
 */

/* beautify ignore:start */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import './account-methods.js';
/* beautify ignore:end */

describe('User Accounts', function() {
  describe('Forgot Password', function() {
    it('should throw an error if a given email is not a string', function() {
      expect(() => Meteor.call('accounts.checkEmailExists', 12345)).toThrow(
        Error
      );
    });
    it('should throw an error if no user was found for a given email address', function() {
      expect(() =>
        Meteor.call('accounts.checkEmailExists', 'someRandomEmail@random.com')
      ).toThrow(Error);
    });
  });
});
