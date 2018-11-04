// @flow
import React, { Component } from 'react';
// import { schemeCategory10 } from 'd3-scale-chromatic';
import { propEq, pluck } from 'ramda';
import type { Tick, Point, Value, DataSet } from '../types.flow';
import Axis from './Axis';
import PolygonWithPoints from './PolygonWithPoints';
import Rings from './Rings';

type Props = {
  data: {
    sets: Array<DataSet>,
    keyLabels: Array<Value>
  },
  width: number,
  height: number,
  // padding: number,
  domainMax: number,

  scales: { [variableKey: string]: Tick },
  backgroundScale: Tick,
  offsetAngles: { [variableKey: string]: number },
  // voronoiDiagram: any,
  // radius: number,
  navigation: {
    navigate: string => void,
    goBack: (?string) => void
  },
  setEditingProduct: (editProductName: string) => void,
  computedPoints: Array<{ setKey: string, points: Array<Point> }>,
  colors: { [setKey: string]: string }
};

const defaultSpiderStyle = {
  numRings: 5,
  axisColor: '#444444',
  ringFills: ['#bbbbbb', '#aaaaaa', '#999999', '#888888', '#777777', '#666666']
};

export default class Wrapper extends Component {
  props: Props;

  makeHandleOnPress = name => {
    return () => {
      this.props.setEditingProduct({ name });
      this.props.navigation.navigate('Configurator');
    };
  };

  calcIndicatorPosition = (SpiderWidth, SpiderHeight, padding) => {
    return {
      cx: padding - SpiderWidth / 2,
      cy: (SpiderHeight - padding) / 2
    };
  };

  render() {
    const {
      width,
      height,
      scales,
      data,
      offsetAngles,
      domainMax,
      computedPoints,
      backgroundScale
    } = this.props;
    const { ringFills, numRings } = {
      ...defaultSpiderStyle
    };
    const ticks = backgroundScale.ticks(numRings);

    return (
      <svg
        width={ width }
        height={ height }
        style={ {
          display: 'flex',
          margin: 'auto'
        } }
      >
        <g transform={ `translate(${width / 2}, ${height / 2})` }>
          <g>
            <Rings
              ticks={ ticks }
              scale={ backgroundScale }
              ringFills={ ringFills }
              allAxis={ pluck('label', data.keyLabels) }
            />
            {data.keyLabels.map(({ key, label, align }) => {
              return (
                <Axis
                  key={ key }
                  align={ align }
                  scale={ scales[key] }
                  offsetAngle={ offsetAngles[key] }
                  label={ label }
                  domainMax={ domainMax }
                  color="#ccc"
                  axisWidth=".5"
                  navigation={ this.props.navigation }
                  handleOnPress={ this.makeHandleOnPress(label) }
                />
              );
            })}
            {computedPoints.map(({ setKey, points }) => {
              return (
                <PolygonWithPoints
                  key={ setKey }
                  set={ data.sets.find(propEq('key', setKey)) }
                  points={ points }
                  scales={ scales }
                  offsetAngles={ offsetAngles }
                  isSelected={ false }
                  selectedVariableKey={ null }
                  makeHandleOnPress={ this.makeHandleOnPress }
                />
              );
            })}
          </g>
        </g>
      </svg>
    );
  }
}
