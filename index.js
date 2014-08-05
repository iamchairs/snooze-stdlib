var snooze = require('snooze');

require('./lib/services/lodash');
require('./lib/services/$validator');
require('./lib/services/$fs');

module.exports = snooze.module('snooze-stdlib');
