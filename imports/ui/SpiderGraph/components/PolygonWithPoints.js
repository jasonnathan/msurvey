// @flow
import * as React from 'react';
import { flatten, reject } from 'ramda';
import Tween from 'rc-tween-one';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';

import ValueCircle from './ValueCircle';
import type { Point } from '../types.flow';

Tween.plugins.push(SvgMorphPlugin);

type Props = {
  points: Array<Point>
  // set: DataSet
  // makeHandleOnPress: string => () => void,
};

export default class SpiderCircle extends React.PureComponent<Props> {
  pointsToPlot = reject(({ value }) => !value, this.props.points);

  startingPoints = flatten(this.pointsToPlot.map(() => [0, 0])).join(',');

  polygonPoints = flatten(this.pointsToPlot.map(({ x, y }) => [x, y])).join(',');

  animation = {
    points: this.polygonPoints,
    ease: 'easeInOutQuad',
    repeat: false,
    duration: 700
  };

  render() {
    const colors = {
      polygonColor: '#f76767',
      strokeColor: '#fb0e2a',
      fillColor: 'white'
    };

    return this.pointsToPlot.length ? (
      <g>
        <Tween
          animation={ this.animation }
          style={ {
            fill: colors.polygonColor,
            strokeWidth: 1,
            stroke: colors.strokeColor,
            fillOpacity: 0.5
          } }
          component="polygon"
          points={ this.startingPoints }
          attr="attr"
        />
        {this.pointsToPlot.map(point => (
          <ValueCircle
            key={ point.key }
            point={ {
              ...point,
              x: point.x,
              y: point.y
            } }
            strokeColor={ colors.strokeColor }
            fillColor={ colors.fillColor }
          />
        ))}
      </g>
    ) : null;
  }
}
