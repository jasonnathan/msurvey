import { pluck, flatten, compose } from 'ramda';
import { max } from 'd3-array';

export const getValue = pluck('value');
export const getAxis = pluck('axis');

export function getValues(data) {
  return flatten(
    Array.isArray(data[0]) 
      ? data.map(getValue) 
      : getValue(data)
    );
}

export function getAxisText(data) {
  return getAxis(
    Array.isArray(data[0]) 
      ? data[0] 
      : data
    );
}

export const getMaxValue = compose(
  max,
  getValues
);

export function computeRadius({ factor, w, h }) {
  return factor * Math.min(w / 2, h / 2);
}