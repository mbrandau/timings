const expect = require('expect.js');

describe('timings', function() {
  it('should expose a function', function() {
    expect(require('../index')).to.be.a('function');
  });
  it('should expose a tracker function on call', function() {
    expect(require('../index')()).to.be.a('function');
  });
  describe('tracker', function() {
    it('should return a number', function() {
      expect(require('../index')()()).to.be.a('number');
    });
    it('should be below 1ms', function() {
      const tracker = require('../index')();
      expect(tracker()).to.be.below(1);
    });
    it('should be between 19ms and 21ms', function(done){
      const tracker = require('../index')();
      tracker();
      setTimeout(function(){
        expect(tracker()).to.be.greaterThan(19).and.lessThan(21);
        done();
      }, 20);
    });
  });
});
