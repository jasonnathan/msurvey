/**
 * @package scenes/SentimentView/connectStateToGraph
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import { max } from 'ramda';
import { maxValueInObj } from '/imports/ui/features/SpiderGraph';

const keyLabels = [
  { key: 'Food', label: 'Food', align: 'middle' },
  { key: 'Exhibits', label: 'Exhibits', align: 'start' },
  { key: 'Staff', label: 'Staff', align: 'middle' },
  { key: 'Rest', label: 'Rest Areas', align: 'middle' },
  { key: 'Toilets', label: 'Toilets', align: 'end' }
];

const mocked = {
  Food: 53,
  Exhibits: 28,
  Staff: 64,
  Rest: 50,
  Toilets: 13
};
const mockedZero = {
  Food: 0,
  Exhibits: 0,
  Staff: 0,
  Rest: 0,
  Toilets: 0
};

const graphPropsSelector = () => {
  const recommendedValues = mockedZero;
  const addedValues = mocked;
  const existingValues = {};
  const maxRecommendValue = maxValueInObj(recommendedValues);
  const maxAddedValue = maxValueInObj(addedValues);
  const maxExistingValue = maxValueInObj(existingValues);

  const maxValue = [maxRecommendValue, maxAddedValue, maxExistingValue].reduce(
    max,
    0
  );

  return {
    domainMax: (Math.ceil(maxValue / 6) + 1) * 6,
    data: {
      keyLabels,
      sets: [
        {
          key: 'everyone',
          label: 'Everyone',
          values: recommendedValues
        },
        {
          key: 'me',
          label: 'Myself',
          isAdded: true,
          values: addedValues
        },
        {
          key: 'exist',
          label: 'Exist',
          isExist: true,
          values: existingValues
        }
      ]
    }
  };
};

export default graphPropsSelector;
