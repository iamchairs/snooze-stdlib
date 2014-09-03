var snooze = require('snooze');

module.exports = snooze.module('snooze-stdlib')
	.libs(['lib/services'])
	.requireLibs(__dirname);
