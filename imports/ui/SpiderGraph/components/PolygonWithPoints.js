// @flow
import * as React from 'react';
import { flatten, reject } from 'ramda';
import Tween from 'rc-tween-one';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';

import ValueCircle from './ValueCircle';
import type { Point, DataSet } from '../types.flow';

Tween.plugins.push(SvgMorphPlugin);

type Props = {
  points: Array<Point>,
  set: DataSet
  // makeHandleOnPress: string => () => void,
};

export default class SpiderCircle extends React.PureComponent<Props> {
  render() {
    const { points, set } = this.props;
    const pointsToPlot = reject(({ value }) => !value, points);
    const startingPoints = flatten(pointsToPlot.map(() => [0, 0])).join(',');
    const polygonPoints = flatten(
      pointsToPlot.map(point => [point.x, point.y])
    ).join(',');
    const colors = {
      polygonColor: '#8c8c8c',
      strokeColor: '#8c8c8c',
      fillColor: 'white'
    };
    if (set.isAdded) {
      colors.polygonColor = '#f76767';
      colors.strokeColor = '#fb0e2a';
    }
    if (set.isExist) {
      colors.polygonColor = '#fb0e2a';
      colors.strokeColor = '#fb0e2a';
      colors.fillColor = '#fb0e2a';
    }

    console.log(polygonPoints);

    return pointsToPlot.length ? (
      <g>
        <Tween
          animation={ [{ points: startingPoints }, { points: polygonPoints }] }
          style={ {
            fill: colors.polygonColor,
            strokeWidth: 1,
            stroke: colors.strokeColor,
            fillOpacity: 0.5
          } }
          component="polygon"
          points={ startingPoints }
          attr="attr"
        />
        {/**
        <polygon
          ratios={ polygonPoints }
          fill={ colors.polygonColor }
          stroke={ colors.strokeColor }
          strokeWidth={ 1 }
          fillOpacity={ 0.5 }
        />
       */}
        {pointsToPlot.map(point => (
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
