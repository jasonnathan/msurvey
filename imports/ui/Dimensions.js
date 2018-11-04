/**
 * src https://raw.githubusercontent.com/necolas/react-native-web/master/src/apis/Dimensions/index.js
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */
const debounce = require('debounce');

const canUseDOM = !!(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

const win = canUseDOM ? window : { screen: {} };

const dimensions = {};

const Dimensions = {
  get(dimension) {
    return dimensions[dimension];
  },

  set() {
    dimensions.window = {
      fontScale: 1,
      height: win.innerHeight,
      scale: win.devicePixelRatio || 1,
      width: win.innerWidth
    };

    dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };
  }
};

Dimensions.set();

if (canUseDOM) {
  window.addEventListener('resize', debounce(Dimensions.set, 16), false);
}

export default Dimensions;
