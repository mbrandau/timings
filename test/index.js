const expect = require('expect.js'),
  timings = require('../index');

describe('timings', function() {
  it('should expose a function', function() {
    expect(timings).to.be.a('function');
  });
  it('should expose a tracker function on call', function() {
    expect(timings()).to.be.a('function');
  });
  describe('tracker', function() {
    it('should return a number', function() {
      expect(timings()()).to.be.a('number');
    });
    it('should be below 1ms', function() {
      const tracker = require('../index')();
      expect(tracker()).to.be.below(1);
    });
    it('should be between 19ms and 21ms', function(done) {
      const tracker = timings();
      tracker();
      setTimeout(function() {
        expect(tracker()).to.be.greaterThan(19).and.lessThan(21);
        done();
      }, 20);
    });
  });
  describe('getTimings', function() {
    it('should return an array when called with both tracker- and item name', function() {
      const tracker = timings('test1');
      tracker();
      tracker('time');
      tracker('time');
      const array = timings.getTimings('test1', 'time');
      expect(array).to.be.an('array');
      expect(array).to.have.length(2);
    });
    it('should return an object with item names when called with tracker name', function() {
      const tracker = timings('test2');
      tracker('t1');
      tracker('t1');
      tracker('t2');
      const obj = timings.getTimings('test2');
      expect(obj).to.only.have.keys('t1', 't2');
      expect(obj.t1).to.be.an('array');
      expect(obj.t1).to.have.length(2);
      expect(obj.t2).to.be.an('array');
      expect(obj.t2).to.have.length(1);
    });
    it('should return an object with all timings when called without arguments', function(){
      const obj = timings.getTimings();
      expect(obj).to.only.have.keys('test1','test2');
    });
  });
  describe('getAverage', function() {
    it('should return an object with keys times and average', function() {
      const result = timings.getAverage('test1', 'time');
      expect(result).to.only.have.keys('times', 'average');
      expect(result.average).to.be.a('number');
    });
    it('result should have proper times value', function(){
      expect(timings.getAverage('test1','time').times).to.be(2);
    });
    it('should return null if no items were found', function() {
      expect(timings.getAverage('not', 'existent')).to.be(null);
      expect(timings.getAverage('test1', 'empty')).to.be(null);
    });
  });
});
