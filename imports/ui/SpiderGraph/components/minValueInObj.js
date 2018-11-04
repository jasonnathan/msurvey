import { values, reduce, compose, min } from 'ramda';

export default compose(
  reduce(min, Infinity),
  values
);
