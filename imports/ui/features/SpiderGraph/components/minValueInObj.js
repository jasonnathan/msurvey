/**
 * @package features/SpiderGraph MinValInObjects
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { values, reduce, compose, min } from 'ramda';

export default compose(
  reduce(min, Infinity),
  values
);
