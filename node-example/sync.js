var fs = require('fs');
console.log("before read");
console.log(fs.readFileSync('a.txt', 'utf8'));
console.log("after read");
