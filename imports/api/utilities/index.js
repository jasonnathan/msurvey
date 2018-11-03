import { pluck, flatten, compose } from 'ramda';
import { max } from 'd3-array';

export const get = key => pluck(key);
export const getValue = get('value');
export const getAxis = get('axis');
export const getValues = data =>
  flatten(Array.isArray(data[0]) ? data.map(getValue) : getValue(data));
export const getAxisText = data =>
  getAxis(Array.isArray(data[0]) ? data[0] : data);

export const getMax = compose(
  max,
  getValues
);
