import expect from 'expect';
import { getValues, getMaxValue, getAxisText } from './index.js';
import data, { allValues, oneSetValue } from './data.js';

describe('getValues()', function() {
  it('should extract all {value} properties from an array of of objects', function() {
    expect(getValues(data[0])).toEqual(oneSetValue);
  });
  it('should extract all {value} properties from an array of an array of objects', function() {
    expect(getValues(data)).toEqual(allValues);
  });
});

describe('getMaxValue()', function() {
  it('should find the largest {value} property val in an array of an array of objects', function() {
    expect(getMaxValue(data)).toEqual(0.59);
  });
  it('should find the largest {value} property val in an array of objects', function() {
    expect(getMaxValue(data[0])).toEqual(0.59);
  });
});

describe('getAxisLabels()', function() {
  it('should extract all the axis labels defined in an array of object', function() {
    expect(getAxisText(data)).toEqual([
      'Email',
      'Social Networks',
      'Internet Banking',
      'News Sportsites',
      'Search Engine',
      'View Shopping sites',
      'Paying Online',
      'Buy Online',
      'Stream Music',
      'Online Gaming',
      'Navigation',
      'App connected to TV program',
      'Offline Gaming',
      'Photo Video',
      'Reading',
      'Listen Music',
      'Watch TV',
      'TV Movies Streaming',
      'Listen Radio',
      'Sending Money',
      'Other',
      'Use less Once week'
    ]);
  });
});
