module.exports = {
	appId: 1,
	appSecret: 'your appSecret',
	tokens: 'your device token',
    callback: function() {
    	console.log(JSON.stringify(arguments, null, 2));
    }
};
