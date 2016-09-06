var Message = function() {
  this._data = {
    'push_type': 1,
    'android': {
      'doings': 1
    }
  };
  return this;
};

/*
 * Notification bar上显示的标题
 * 必须
 */
Message.prototype.title = function(title) {
  return this.setAndroid('notification_title', title);
};

/*
 * Notification bar上显示的内容
 * 必须
 */
 Message.prototype.content = function(content) {
  return this.setAndroid('notification_content', content);
};

/*
 * 系统小图标名称
 * 该图标预置在客户端，在通知栏顶部展示
 */
Message.prototype.status_icon = function(status_icon) {
  return this.setAndroid('notification_status_icon', status_icon);
};

/*
 * 用户自定义 dict
 * "extras":{"season":"Spring", "weather":"raining"}]
 */
Message.prototype.extras = function(extras) {
  if (!Array.isArray(extras)) {
    var extraArray = [];
    var keys = Object.keys(extras);
    keys.forEach(function(key){
        var v = {};
        v[key] = extras[key];
        extraArray.push(v)
    })
    extras = extraArray
  }
  return this.setAndroid('extras', extras);
};

/*
 * 推送范围
 * 1：指定用户，必须指定tokens字段
 * 2：所有人，无需指定tokens，tags，exclude_tags
 * 3：一群人，必须指定tags或者exclude_tags字段
 */
Message.prototype.push_type = function(push_type) {
  return this.set('push_type', push_type);
};

/*
 * 用户标签，目前仅对android用户生效
 * 样例：{"tags":[{"location":["ShangHai","GuangZhou"]},}"age":["20","30"]}]}
 * 含义：在广州或者上海，并且年龄为20或30岁的用户
 */
Message.prototype.tags = function(tags) {
  return this.set('tags', tags);
};

/*
 * 需要剔除的用户的标签，目前仅对android用户生效
 * 样例：{"exclude_tags":[{"music":["blue"]},{"fruit":["apple"]}]}
 * 含义：不给喜欢蓝调音乐的用户，或者喜欢苹果的用户发送消息
 */
Message.prototype.exclude_tags = function(exclude_tags) {
  return this.set('exclude_tags', exclude_tags);
};

/*
 * 消息生效时间。如果不携带该字段，则表示消息实时生效。实际使用时，该字段精确到分
 * 消息发送时间戳，timestamp格式ISO 8601：2013-06-03T17:30:08+08:00
 */
Message.prototype.send_time = function(send_time) {
  return this.set('send_time', send_time);
};

/*
 * 消息过期删除时间
 * 消息过期时间，timestamp格式ISO 8601：2013-06-03T17:30:08+08:00
 */
Message.prototype.expire_time = function(expire_time) {
  return this.set('expire_time', expire_time);
};

/*
 * 目标设备类型
 * 1：android
 * 2：ios
 * 默认为android
 */
Message.prototype.device_type = function(device_type) {
  return this.set('device_type', device_type);
};

/*
 * 1：直接打开应用
 * 2：通过自定义动作打开应用
 * 3：打开URL
 * 4：富媒体消息
 * 5：短信收件箱广告
 * 6：彩信收件箱广告
 * 注意：当手机收到短信、彩信收件箱广告后，在收件人一栏显示的是应用在联盟上注册的名字哦~
 */
Message.prototype.doings = function(doings) {
  return this.setAndroid('doings', doings);
};

Message.prototype.setAndroid = function(key, value) {
  this._data['android'][key] = value;
  return this;
};

Message.prototype.set = function(key, value) {
  this._data[key] = value;
  return this;
};

Message.prototype.getAndroidData = function() {
  return this._data;
};

Message.prototype.getData = function() {
  return this._data;
};

Message.prototype.toString = function() {
  return JSON.stringify(this._data);
};

module.exports = Message;
