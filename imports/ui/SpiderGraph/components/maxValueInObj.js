import { values, reduce, compose, max } from 'ramda';

export default compose(
  reduce(max, 0),
  values
);
