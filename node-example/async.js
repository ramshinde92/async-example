var fs = require('fs');
console.log("before read");
fs.readFile('a.txt', 'utf8', function (err, data) {
		if (err) throw err;
		console.log(data);
});
console.log("after read");
