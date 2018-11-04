/**
 * @package features/SpiderGraph Points
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
// @flow
import { sortBy, isNil, pluck, flatten } from 'ramda';
import type { Tick, Point, Data } from '../types.flow';

const points = (
  data: Data,
  scales: { [variableKey: string]: Tick },
  offsetAngles: { [variableKey: string]: number }
): Array<{ setKey: string, points: Array<Point> }> => {
  const allVariableKeys = flatten(pluck('key', data.keyLabels));
  return data.sets.map(({ key, values }) => {
    const points = Object.keys(values).reduce((acc, variableKey) => {
      const value = values[variableKey];
      const scale = scales[variableKey];
      const offsetAngle = offsetAngles[variableKey];
      return (
        isNil(scale) || isNil(offsetAngle)
          ? acc
          : acc.push({
            x: scale(value) * Math.cos(offsetAngle - Math.PI / 2),
            y: scale(value) * Math.sin(offsetAngle - Math.PI / 2),
            value,
            label: data.keyLabels[variableKey],
            setKey: key,
            variableKey,
            key: `${key}--${variableKey}`
          }),
        acc
      );
    }, []);
    return {
      setKey: key,
      points: sortBy(
        ({ variableKey }) => allVariableKeys.indexOf(variableKey),
        points
      )
    };
  });
};

export default points;
