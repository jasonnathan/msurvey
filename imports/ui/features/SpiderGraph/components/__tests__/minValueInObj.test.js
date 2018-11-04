import minValueInObj from '../minValueInObj';
import expect from 'expect';

describe('minValueInObj', () => {
  it('should return min values of an abritary object', () => {
    const obj = {
      some: 1,
      thing: 1,
      random: 10,
      somethingElse: -1,
      another: 0
    };
    expect(minValueInObj(obj)).toEqual(-1);
  });
});
