function add(arr) {
  return arr.reduce((acc, curr) => (acc += curr), 0);
}

function subtract(arr) {
  return arr.reduce((acc, curr) => (acc -= curr), 0);
}

function multiply(arr) {
  return arr.reduce((acc, curr) => (acc *= curr), 1);
}

function divide(arr) {
  return arr.reduce((acc, curr) => (acc /= curr), 1);
}

console.log(add([1, 2, 3]));
console.log(subtract([1, 2, 3]));
console.log(multiply([1, 2, 3]));
console.log(divide([1, 2, 3]));
