import {emptyCells} from './board.js';
export function generateMove(){
     let lengthOf = emptyCells.length-1;
     return emptyCells[getRandomInteger(0,lengthOf)];
}

function getRandomInteger(min, max) {
  min = Math.ceil(min); // Round up the minimum value
  max = Math.floor(max); // Round down the maximum value
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage: Generate a random integer between 1 and 10
// Generate a random integer between min (inclusive) and max (inclusive)
/*function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomInt = getRandomInt(1, 10);
console.log(randomInt);
*/