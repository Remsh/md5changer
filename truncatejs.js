const fs = require('fs');
var exec = require('child_process').exec;

//truncate无法处理文件名有空格，先用Bulk Rename Utility处理一下

var walk    = require('walk');

// Walker options
var walker  = walk.walk('./models2', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    let fileName = root + '/' + stat.name;
    truncateWalk(fileName);
    next();
});

walker.on('end', function() {
    console.log('Done!');
});


function truncateWalk(filename) {

	var clientPath = 'truncate -s +10 ' +  filename;
	var child = exec(clientPath);

	child.stdout.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log(filename  + ' closing code: ' + code);
	});
}
