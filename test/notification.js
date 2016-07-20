var _ = require('lodash');
var expect = require('chai').expect;
var config = require('../example/config');
var Message = require('../').Message;
var Notification = require('../').Notification;

var msg = new Message();
msg
  .title('title example')
  .content('description example');

var notification = new Notification({
  appSecret: config.appSecret,
  appId: config.appId
});

describe('Notification::accessToken', function() {
  it('should fail if config invalid appId', function(done) {
    var n = new Notification({
      appSecret: config.appSecret,
      appId: 'invalid appId'
    });

    n.send(config.token, msg, function(err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should sucess if config valid appId', function(done) {
    notification.send(config.token, msg, function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});

describe('Notification::notificationSend', function() {
  it('should fail if send to invalid token', function(done) {
    notification.send('invalid token', msg, function(err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should sucess if send to valid token', function(done) {
    notification.send(config.token, msg, function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});
