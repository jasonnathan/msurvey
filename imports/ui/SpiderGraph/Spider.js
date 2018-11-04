// @flow
import React from 'react';
import makePoints from './components/points';
import makeScales from './components/scales';
import type { Data } from './types.flow';
import SpiderWrapper from './components/Wrapper';

type Props = {
  data: Data,
  width: number,
  height: number,
  padding: number,
  domainMax: number,
  style?: {},
  navigation: {
    navigate: string => void,
    goBack: (?string) => void
  },
  setEditingProduct: string => void
};

function convertData(props) {
  const { data, width, height, padding, domainMax } = props;
  const innerHeight = height - padding * 2;
  const innerWidth = width - padding * 2;

  const radius =
    (Math.ceil(Math.min(innerWidth / 2, innerHeight / 2) ) + 1) * 1.3;
  const computedScales = makeScales(data.keyLabels, domainMax, radius);

  const angleSliceRadians = (Math.PI * 2) / data.keyLabels.length;
  const offsetAngles = data.keyLabels.reduce(
    (acc, { key }, idx) => ({
      ...acc,
      [key]: angleSliceRadians * idx
    }),
    {}
  );

  const allPoints = makePoints(data, computedScales, offsetAngles);

  return { allPoints, computedScales, offsetAngles, radius };
}

export default function Spider(props: Props) {
  const { data, width, height, padding, domainMax, style } = props;
  const { allPoints, computedScales, offsetAngles, radius } = convertData(
    props
  );

  const backgroundScale = computedScales[data.keyLabels[0].key];

  return (
    <SpiderWrapper
      data={ data }
      width={ width }
      height={ height }
      padding={ padding }
      domainMax={ domainMax }
      style={ style }
      scales={ computedScales }
      backgroundScale={ backgroundScale }
      offsetAngles={ offsetAngles }
      radius={ radius }
      computedPoints={ allPoints }
      colors={ {} }
      navigation={ props.navigation }
      setEditingProduct={ props.setEditingProduct }
    />
  );
}
