import maxValueInObj from '../maxValueInObj';
import expect from 'expect';

describe('maxValueInObj', () => {
  it('should return max values of an abritary object', () => {
    const obj = {
      some: 1,
      thing: 1,
      random: 10,
      somethingElse: -1,
      another: 0
    };
    expect(maxValueInObj(obj)).toEqual(10);
  });
});
