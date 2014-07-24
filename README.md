snooze-stdlib
=============

New site with better documentation now up!

http://snoozejs.org/snooze-stdlib

The Snooze Standard Library is a module that includes helpful services that most server applications will use.

## Installation

Install snooze-stdlib alongside snooze.

```
npm install snooze-stdlib
```

The directory structure should look something like-

```
main.js
node_modules\
	snooze\
	snooze-stdlib\
```

## Add Module Dependency

```
var snooze = require('snooze');

snooze.module('myServer', ['snooze-stdlib']);
```

## You're Done!

That's it. Now you can inject snooze-stdlib services in any of your controllres, services, and validators!

```
snooze.module('myServer').controller('MyCtrl', function($q) {
	return {
		test: function() {
			var deferred = $q.defer();

			setTimeout(function() {
				deferred.resolve('Resolved after 1 second.');
			}, 1000);

			return deferred.promise;
		}		
	};
});
```

# Current Library

Instead of updating this here I'll be updating the snoozejs.org site
