var snooze = require('snooze');
var q = require('q');

snooze.module('snooze-stdlib').service('$q', function() {
	var _defer = function() {
		return q.defer();
	};

	var _all = function(arguments) {
		return q.all.apply(null, arguments);
	};

	return {
		defer: _defer,
		all: _all
	};
});