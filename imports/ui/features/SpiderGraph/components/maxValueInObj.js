/**
 * @package features/SpiderGraph MaxValInObj
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { values, reduce, compose, max } from 'ramda';

export default compose(
  reduce(max, 0),
  values
);
