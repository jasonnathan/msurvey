/**
 * @package Emailer
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com> {@link https://www.jasonnathan.com}
 * @version  1.0
 */

import { Meteor } from 'meteor/meteor';
import { SSR } from 'meteor/meteorhacks:ssr';
import { Email } from 'meteor/email';
import { pick } from 'ramda';

// Assets is a global

class Emailer {
  constructor(params) {
    const {
      template = 'notification',
      to,
      from = 'MSurvey Support <support@msurvery.jasonnathan.com>'
    } = params;
    // default to notification emails
    const templatePath = 'emailTemplates/' + template + '.html';
    this.to = to;
    this.from = from;
    this.templateData = pick(
      ['firstName', 'subject', 'teaser', 'message', 'action'],
      params
    );
    this.template = Assets.getText(templatePath);
  }

  send() {
    // this can run in the next event loop, so we don't block
    return Meteor.defer(() => {
      SSR.compileTemplate('_placeholder_', this.template);
      return Email.send({
        from: this.from,
        to: this.to,
        subject: this.templateData.subject.title,
        html: SSR.render('_placeholder_', this.templateData)
      });
    });
  }
}

export default Emailer;
