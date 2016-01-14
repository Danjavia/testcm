// __tests__/sum-test.js
jest.dontMock('../src/unit/sum');

describe('sum', function() {
 it('adds 1 + 2 to equal 3', function() {
   var sum = require('../src/unit/sum');
   expect(sum(1, 2)).toBe(3);
 });
});