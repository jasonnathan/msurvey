import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from '../imports/ui/App.js';
import store from '../imports/ui/store';

Meteor.startup(() => {
  render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById('render-target')
  );
});
