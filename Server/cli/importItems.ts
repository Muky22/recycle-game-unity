const items = [];

var fs = require('fs');
var files = fs.readdirSync(
  '/Users/meldiron/Desktop/recycle-game-unity/Assets/SimpleItems/Prefabs',
);

let filesArr = files.filter(i => {
  return !i.includes('.meta');
});

filesArr = filesArr.map(i => {
  i = i
    .split('.prefab')
    .join('')
    .split('Items_')
    .join('')
    .toLowerCase();

  return i;
});

filesArr.forEach(i => {
  items.push({
    tag: i,
    correctAnswer: 'SET_ME',
  });
});

console.log(JSON.stringify(items));
