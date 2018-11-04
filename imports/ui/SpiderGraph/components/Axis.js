// @flow
import * as React from 'react';
import type { Tick } from '../types.flow';

type Props = {
  scale: Tick,
  align: string,
  offsetAngle: number,
  domainMax: number,
  label: string,
  color: string,
  style?: {},
  pressedOpacity?: number,
  defaultOpacity?: number
};

export default class Axis extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fillOpacity: props.defaultOpacity
    };
  }
  toggleOpacity = () =>
    this.setState({
      fillOpacity:
        this.state.fillOpacity === this.props.defaultOpacity
          ? this.props.pressedOpacity
          : this.props.defaultOpacity
    });

  xyFactor(x = true) {
    return Math[x ? 'cos' : 'sin'](this.props.offsetAngle - Math.PI / 2);
  }

  render() {
    const { scale, domainMax, label, color, style = {}, align } = this.props;
    const {
      fontSize,
      fontFamily,
      fontWeight,
      textFill,
      axisWidth,
      lineHeight
    } = { ...defaultRadarAxisStyle, style };
    const scaleByMax = scale(domainMax);
    const x2 = scaleByMax * this.xyFactor();
    const y2 = scaleByMax * this.xyFactor(false);
    return (
      <g>
        <line
          x1={ 0 }
          y1={ 0 }
          x2={ x2 }
          y2={ y2 }
          stroke={ color }
          strokeWidth={ axisWidth }
        />
        <text
          x={ x2 * 1.1 }
          y={ y2 * 1.1 }
          fontSize={ fontSize }
          fontFamily={ fontFamily }
          fontWeight={ fontWeight }
          style={ { lineHeight } }
          fill={ textFill }
          fillOpacity={ this.state.fillOpacity }
          textAnchor={ align }
          dy={ '0.3em' }
        >
          {label}
        </text>
      </g>
    );
  }
}

Axis.defaultProps = {
  fillOpacity: '1',
  pressedOpacity: '.5'
};

const defaultRadarAxisStyle = {
  fontSize: 11,
  fontFamily:
    '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  textFill: 'rgb(68, 68, 68)',
  fontWeight: '500',
  lineHeight: '24',
  axisWidth: 1
};
