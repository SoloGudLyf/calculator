let firstNum;
let operator;
let secondNum;

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
    arr.reverse()
  return arr.reduce((acc, curr) =>acc = curr / acc, 1);
}
function operate(num1, symbol, num2) {
  if (symbol === "+") return add([num1, num2]);
  if (symbol === "-") return subtract([num1, num2]);
  if (symbol === "×") return multiply([num1, num2]);
  if (symbol === "÷") return divide([num1, num2]);
}

console.log(operate(1, "+", 5));
console.log(operate(1, "-", 9));
console.log(operate(1, "×", 189));
console.log(operate(5, "÷", 10));
