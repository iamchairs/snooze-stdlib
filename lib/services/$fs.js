var snooze = require('snooze');
var fs = require('fs');
var ncp = require('ncp').ncp;
var mmm = require('mmmagic');
var Magic = mmm.Magic;
var q = require('q');

var _Magic = new Magic(mmm.MAGIC_MIME_TYPE);

snooze.module('snooze-stdlib').service('$fs', function() {
	var _copyDir = function(src, dest) {
		var deferred = q.defer();

		ncp(src, dest, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _mvDir = function(src, dest) {
		var deferred = q.defer();

		ncp(src, dest, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				fs.rmdir(src, function(err) {
					if(err) {
						deferred.reject(err);
					} else {
						deferred.resolve();
					}
				});
			}
		});

		return deferred.promise;
	};

	var _copyFile = function(src, dest) {
		var deferred = q.defer();

		var rd = fs.createReadStream(src);
		rd.on("error", function(err) {
			deferred.reject(err);
		});
		var wr = fs.createWriteStream(dest);
		wr.on("error", function(err) {
			deferred.reject(err);
		});
		wr.on("close", function(ex) {
			deferred.resolve();
		});
		rd.pipe(wr);

		return deferred.promise;
	};

	var _moveFile = function(src, dest) {
		var deferred = q.defer();

		_copyFile(src, dest).then(function() {
			fs.unlink(src, function(err) {
				if(err) {
					deferred.reject(err);
				} else {
					deferred.resolve();
				}
			});
		}).fail(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	var _cp = function(src, dest) {
		var deferred = q.defer();

		if(fs.existsSync(src)) {
			if(_isDirSync(src)) {
				_copyDir(src, dest).then(function() {
					deferred.resolve();
				}).fail(function(err) {
					deferred.reject(err);
				});
			} else {
				_copyFile(src, dest).then(function() {
					deferred.resolve();
				}).fail(function(err) {
					deferred.reject(err);
				});
			}
		} else {
			deferred.reject('path doesn\'t exist: ' + src)
		}

		return deferred.promise;
	};

	var _mv = function(src, dest) {
		var deferred = q.defer();

		if(fs.existsSync(src)) {
			if(_isDirSync(src)) {
				_moveDir(src, dest).then(function() {
					deferred.resolve();
				}).fail(function(err) {
					deferred.reject(err);
				});
			} else {
				_moveFile(src, dest).then(function() {
					deferred.resolve();
				}).fail(function(err) {
					deferred.reject(err);
				});
			}
		} else {
			deferred.reject('path doesn\'t exist: ' + src)
		}

		return deferred.promise;
	};

	var _rm = function(path) {
		var deferred = q.defer();

		if(fs.existsSync(src)) {
			if(_isDirSync(src)) {
				_unlink(path).then(function() {
					deferred.resolve();
				}).fail(function(err) {
					deferred.reject(err);
				});
			} else {
				_rmdir(path).then(function() {
					deferred.resolve();
				}).fail(function(err) {
					deferred.reject(err);
				});
			}
		} else {
			deferred.reject('path doesn\'t exist: ' + path);
		}

		return deferred.promise;
	};

	var _unlink = function(path) {
		var deferred = q.defer();


		fs.unlink(src, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _unlinkSync = function(path) {
		fs.unlinkSync(path);
	};

	var _rmdir = function(path) {
		var deferred = q.defer();

		fs.rmdir(path, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _rmdirSync = function(path) {
		fs.rmdirSync(path);
	};

	var _mkdir = function(path) {
		var deferred = q.defer();

		fs.mkdir(path, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _mkdirSync = function(path) {
		fs.mkdirSync(path);
	};

	var _rename = function(old, nw) {
		var deferred = q.defer();

		fs.rename(old, nw, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _renameSync = function(old, nw) {
		fs.renameSync(old, nw);
	};

	var _chown = function(path, uid, guid) {
		var deferred = q.defer();

		fs.chown(path, uid, guid, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _chownSync = function(path, uid, guid) {
		fs.chownSync(path, uid, guid);
	};

	var _chmod = function(path, mode) {
		var deferred = q.defer();

		fs.chmod(path, mode, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _chmodSync = function(path, mode) {
		fs.chmodSync(path, mode);
	};

	var _readdir = function(path) {
		var deferred = q.defer();

		fs.readdir(path, function(err, files) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(files);
			}
		});

		return deferred.promise;
	};

	var _readdirSync = function(path) {
		return fs.readdirSync(path);
	};

	var _readFile = function(path) {
		var deferred = q.defer();

		fs.readFile(path, {flag:'r'}, function(err, data) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(data);
			}
		});

		return deferred.promise;
	};

	var _readFileSync = function(path) {
		return fs.readFileSync(path, {flag:'r'});
	};

	var _writeFile = function(path, data) {
		var deferred = q.defer();

		fs.writeFile(path, data, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _writeFileSync = function(path, data) {
		return fs.writeFileSync(path, data);
	};

	var _appendFile = function(path, data) {
		var deferred = q.defer();

		fs.appendFile(path, data, function(err) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	var _appendFileSync = function(path, data) {
		return fs.appendFileSync(path, data);
	};

	var _watch = function(path, cb) {
		fs.watch(path, db);
	};

	var _exists = function(path) {
		var deferred = q.defer();

		fs.exists(path, function(exists) {
			deferred.resolve(exists);
		});

		return deferred.promise;
	};

	var _existsSync = function(path) {
		return deferred.existsSync(path);
	};

	var _isDir = function(path) {
		var deferred = q.defer();

		fs.stat(path, function(err, stats) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(stats.isDirectory());
			}
		});

		return deferred.promise;
	};

	var _isDirSync = function(path) {
		var stats = fs.statSync(path);
		return stats.isDirectory();
	};

	var _getMime = function(path) {
		var deferred = q.defer();

		_Magic.detectFile(path, function(err, result) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});

		return deferred.promise;
	};

	return {
		cp: _cp,
		mv: _mv,
		rm: _rm,
		mkdir: _mkdir,
		mkdirSync: _mkdirSync,
		rename: _rename,
		renameSync: _renameSync,
		chown: _chown,
		chownSync: _chownSync,
		chmod: _chmod,
		chmodSync: _chmodSync,
		readdir: _readdir,
		readdirSync: _readdirSync,
		readFile: _readFile,
		readFileSync: _readFileSync,
		writeFile: _writeFile,
		writeFileSync: _writeFileSync,
		appendFile: _appendFileSync,
		watch: _watch,
		exists: _exists,
		existsSync: _existsSync,
		isDir: _isDir,
		isDirSync: _isDirSync,
		getMime: _getMime
	};
});
