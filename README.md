# huawei-push
> 华为 Android 推送服务 Node 实现版

官方未提供 Node 版的 SDK, 此 SDK 依照官方文档 [华为推送服务 Server 端SDK (HuaweiPushServiceSDK for server)](http://developer.huawei.com/cn/consumer/wiki/index.php)实现.

目前只实现 Android 通知栏推送功能，其他实现以后补充，欢迎提 PR。

此项目根据 [xiaomi-push](https://github.com/isayme/xiaomi-push) 改写而成。

# 支持的特性

- Message: 用于构建要发送的消息内容
- Notification: 通知栏推送相关

# 安装及使用

    npm install huawei-push --save

# 示例

```
var msg = new Message();
msg
  .title('title example')
  .content('description example')
  .extras({'user_id': 4843, 'target': 'Greedy Land'});
var notification = new Notification({
  appId: 'your appId',
  appSecret: 'your appSecret'
});
notification.send('your device token', msg, config.callback);
```

* 注意，自定义信息 extras 华为接口是需要传 Array，但我觉得不方便，所以这里可以支持传字典。

使用示例可以参看[example](./example).

# API说明

请参考 [华为推送服务 Server 端SDK (HuaweiPushServiceSDK for server)](http://developer.huawei.com/cn/consumer/wiki/index.php)。

# 联系我
`email`: `340052204@qq.com`
