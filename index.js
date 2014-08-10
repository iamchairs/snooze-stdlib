var snooze = require('snooze');

require('./lib/services/lodash');
require('./lib/services/$validator');
require('./lib/services/$fs');
require('./lib/services/$md5');

module.exports = snooze.module('snooze-stdlib');
