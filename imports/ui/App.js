import React, { PureComponent } from 'react';
import { schemeCategory10 } from 'd3-scale-chromatic';

import connectStateToGraph from './connectStateToGraph';

// import data from '../api/utilities/data';
// import { getAxisText } from '../api/utilities';
import RadarGraph from './RadarGraph';
export default class App extends PureComponent {
  render() {
    // const {
    //   w,
    //   h,
    //   ExtraWidthX,
    //   ExtraWidthY,
    //   TranslateX,
    //   TranslateY
    // } = this.props;
    return (
      <RadarGraph
        { ...connectStateToGraph() }
        width={ 500 }
        height={ 500 }
        padding={ 120 }
        navigation={ {} }
        setEditingProduct={ () => {} }
      />
    );
  }
}

App.defaultProps = {
  radius: 5,
  maxValue: 0.6,
  ExtraWidthX: 300,
  levels: 6,
  w: 500,
  h: 500,
  factor: 1,
  factorLegend: 0.85,
  radians: 2 * Math.PI, // full circle
  opacityArea: 0.5,
  ToRight: 5,
  TranslateX: 80,
  TranslateY: 30,
  ExtraWidthY: 100,
  color: schemeCategory10
};
