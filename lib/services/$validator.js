var snooze = require('snooze');
var validator = require('validator');

snooze.module('snooze-stdlib').service('$validator', function() {
	return validator;
});