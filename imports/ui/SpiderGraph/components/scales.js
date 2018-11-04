// @flow
import type { Tick, Value } from '../types.flow';
import { scaleLinear } from 'd3-scale';

const scales = (
  keyLabels: Array<Value>,
  domainMax: number,
  radius: number
): { [variableKey: string]: Tick } =>
  keyLabels.reduce(
    (acc, { key, label }) => ({
      ...acc,
      label,
      [key]: scaleLinear()
        .domain([0, domainMax])
        .range([0, radius])
    }),
    {}
  );
export default scales;
