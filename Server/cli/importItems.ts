const items = [
  {
    tag: 'knife',
    correctAnswer: 'Blue',
  },
];

var fs = require('fs');
var files = fs.readdirSync(
  '/Users/meldiron/Desktop/recycle-game-unity/Server/build',
);

console.log(files);
