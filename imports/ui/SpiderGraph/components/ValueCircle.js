// @flow
import * as React from 'react';
// import { format } from 'd3-format';
import type { Point } from '../types.flow';

type Props = {
  handleOnPress?: () => void,
  fill?: string,
  fillPressed?: string,
  point: Point,
  strokeColor?: string,
  // fillColor?: string
};

type State = {
  fill: string
};

// const currency = format('$,');

export default class PlusIcon extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = { fillColor: props.fill };
  }

  toggleColour = () =>
    this.setState({
      fillColor:
        this.state.fillColor === this.props.fill
          ? this.props.fillPressed
          : this.props.fill
    });

  onPress = () => {
    this.props.handleOnPress && this.props.handleOnPress();
  };

  render() {
    const { point, strokeColor } = this.props;
    return (
      <g>
        <circle
          cx={ point.x }
          cy={ point.y }
          r={ 5 }
          fill={ strokeColor }
          fillRule="evenodd"
          // onPress={ this.onPress }
          // onPressIn={ this.toggleColour }
          // onPressOut={ this.toggleColour }
        />
      </g>
    );
  }
}

PlusIcon.defaultProps = {
  fill: '#A32136',
  fillPressed: '#A32136'
};
