import React, { PureComponent } from 'react';
import { schemeCategory10 } from 'd3-scale-chromatic';
export default class App extends PureComponent {
  render() {
    return <h1>Hi</h1>;
  }
}
// d3 max is more tolerant than Math.max and allows natural order.
// Math.max(cfg.maxValue, max(d, i => max(i.map(({ value }) => value))));

const cfg = {
  radius: 5,
  w: 600,
  h: 600,
  factor: 1,
  factorLegend: 0.85,
  levels: 3,
  maxValue: 0,
  radians: 2 * Math.PI,
  opacityArea: 0.5,
  ToRight: 5,
  TranslateX: 80,
  TranslateY: 30,
  ExtraWidthX: 100,
  ExtraWidthY: 100,
  color: schemeCategory10()
};
