const getLevelData = (xp: number) => {
  let totalXp = xp;
  let level = 1;

  while (totalXp >= level) {
    totalXp -= level;
    level++;
  }

  return { level, xp: totalXp };
};

console.log(getLevelData(0));
console.log(getLevelData(1));
console.log(getLevelData(2));
console.log(getLevelData(3));
console.log(getLevelData(4));
console.log(getLevelData(5));
console.log(getLevelData(6));
console.log(getLevelData(7));
console.log(getLevelData(8));
console.log(getLevelData(9));
console.log(getLevelData(10));

import io from 'socket.io-client';
const socket = io('localhost:4000');
