var MD5 = require('MD5');
var snooze = require('snooze');

snooze.module('snooze-stdlib').service('$md5', function() {
	return {
		$get: function() {
			return MD5;
		}
	};
});