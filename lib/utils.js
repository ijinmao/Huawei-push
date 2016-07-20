var _ = require('lodash');
var urllib = require('urllib');
var debug = require('debug')('huawei_push:utils');
var constant = require('./constant');
var hw_token = {
  'access_token': 0,
  'expire': 0
};

var defaults = {
  timeout: 5000
};

function requestAccess(callback) {
  debug('requestAccess');
  var nowSeconds = Math.floor(Date.now() / 1000);

  if (hw_token['expire'] > nowSeconds) {
    callback(null, hw_token['access_token']);
  }
  url = constant.accessTokenAPI;
  data = {
    'client_id': this.options.appId,
    'client_secret': this.options.appSecret,
    'grant_type': 'client_credentials'
  };

  var options = {
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    timeout: this.options.timeout
  };

  urllib.request(url, options, function(err, data) {
    debug('response:', err, data);

    if (err) {
      callback(err, null);
    }

    // fail if data.code is 0
    if (data.error) {
      err = new Error(data.error_description);
      callback(err, null);
    }

    hw_token['expire'] = nowSeconds + data['expires_in'];
    hw_token['access_token'] = data['access_token'];
    callback(null, hw_token['access_token']);
  });
}

function requestNotification(token, data, appMethod, callback) {
  url = constant.baseAPI;
  debug('request:', url, data);

  var params = notificationParams(token, appMethod, data);

  var options = {
    method: 'POST',
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    dataType: 'json',
    timeout: defaults.timeout
  };

  urllib.request(url, options, function(err, data) {
    debug('response:', err, data);

    if (err || data.error) {
      error = data.error ? data.error : err;
      return callback(error);
    }

    // fail if data.code is 0
    if (data.result_code !== 0) {
      err = new Error(data.result_desc);
      err.result_code = data.result_code;
      return callback(err);
    }

    callback(null, data);
  });
}

function notificationParams(token, appMethod, data) {
  data['tokens'] = token;
  data['nsp_ts'] = Math.floor(Date.now() / 1000);
  data['nsp_svc'] = constant.apiMethod + appMethod;
  data['nsp_fmt'] = 'JSON';
  data['access_token'] = hw_token['access_token'];
  data['android'] = JSON.stringify(data['android']);
  return data;
}

module.exports.requestNotification = function(token, data, appMethod, callback) {
  requestNotification.call(this, token, data, appMethod, callback);
};

module.exports.requestAccess = function(callback) {
  requestAccess.call(this, callback);
};

/*
 * config: configure for Huawei-Push
 * opts: options for parseOptions
 */
module.exports.parseOptions = function(config) {
  if (!_.isObject(config)) {
    throw new Error('options must be Object');
  }

  this.options = _.clone(defaults);
  _.assign(this.options, config);

  if (!_.isNumber(this.options.appId)) {
    throw new Error('options.appId required');
  }

  if (!_.isString(this.options.appSecret)) {
    throw new Error('options.appSecret required');
  }
};
