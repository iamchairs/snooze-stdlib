snooze-stdlib
=============

## STABLE VERSION COMING

August 10, 2014 Status Update

Thank you for using snooze/snooze-stdlib. Being the only one working on snooze right now in my free time I don't have a lot of time to work on snooze AND update the documentation. With all the changes and updates I'm adding to snooze it's currently in a very unstable state with no recent documentation. This will be fixed when snooze reaches v1.0 which could be in a few weeks to a few months.

Stay up to date on progress by following me on twitter:
https://twitter.com/micahwllmsn

And feel free to send me questions, comments, bug reports via email:
micahwllmsn@gmail.com

Thank you for your patients!

## Site

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
