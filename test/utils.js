var expect = require('chai').expect;
var config = require('../example/config');
var utils = require('../lib/utils');

describe('utils.parseOptions', function() {
  it('should throw if no required params', function() {
    expect(function() {
      utils.parseOptions.call(11);
    }).to.throw('config must be Object');
  });

  it('should throw if no appSecret', function() {
    expect(function() {
      utils.parseOptions.call({appId: 'appId'});
    }).to.throw('options.appSecret required');
  });

  it('should throw if no appId', function() {
    expect(function() {
      utils.parseOptions.call({appSecret: 'appSecret'});
    }).to.throw('options.appId required');
  });
});
