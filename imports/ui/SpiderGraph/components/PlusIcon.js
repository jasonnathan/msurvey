// @flow
import * as React from 'react';
import type { Point } from '../types.flow';

type Props = {
  handleOnPress?: () => void,
  fill?: string,
  fillPressed?: string,
  point: Point
};

type State = {
  fill: string
};

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
    const { point } = this.props;
    return (
      <g>
        <circle
          cx={ point.x }
          cy={ point.y }
          r="15"
          fill="#fff"
          // onPress={ this.onPress }
          // onPressIn={ this.toggleColour }
          // onPressOut={ this.toggleColour }
        />
        <path
          x={ point.x - 15 }
          y={ point.y - 15 }
          fill={ this.state.fillColor }
          d="M16.5,7.5 L13.5,7.5 L13.5,13.5 L7.5,13.5 L7.5,16.5 L13.5,16.5 L13.5,22.5 L16.5,22.5 L16.5,16.5 L22.5,16.5 L22.5,13.5 L16.5,13.5 L16.5,7.5 Z M15,0 C6.71572875,-5.07265313e-16 1.01453063e-15,6.71572875 0,15 C-1.01453063e-15,23.2842712 6.71572875,30 15,30 C23.2842712,30 30,23.2842712 30,15 C30,6.71572875 23.2842712,5.07265313e-16 15,0 Z M15,27 C8.372583,27 3,21.627417 3,15 C3,8.372583 8.372583,3 15,3 C21.627417,3 27,8.372583 27,15 C27,21.627417 21.627417,27 15,27 Z"
        />
      </g>
    );
  }
}

PlusIcon.defaultProps = {
  fill: '#ec1b24',
  fillPressed: '#A32136'
};
