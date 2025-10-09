let firstNum;
let operator;
let secondNum;
const container = document.querySelector(".container");
const displayArea = document.querySelector(".display");
const equalTo = document.querySelector(".equalTo");

function add(arr) {
  return arr[0] + arr[1];
}

function subtract(arr) {
  return arr[0] - arr[1];
}

function multiply(arr) {
  return arr[0] * arr[1];
}

function divide(arr) {
    arr[0] / arr[1]
}
function operate(num1, symbol, num2) {
  if (symbol === "+") return add([num1, num2]);
  if (symbol === "-") return subtract([num1, num2]);
  if (symbol === "×") return multiply([num1, num2]);
  if (symbol === "÷") return divide([num1, num2]);
}

function display(event) {
  let elemClicked = event.target;

  if (elemClicked.textContent === "C") {
    displayArea.textContent = "";
  } else if (elemClicked.textContent === "x") {
    let exp = Array.from(displayArea.textContent);
    exp.pop();
    console.log(exp);
    displayArea.textContent = exp.join("");
  } else if (elemClicked.textContent === "=") {
  } else {
    displayArea.textContent += elemClicked.textContent;
  }
}

function evaluate(event) {
  let elemClicked = event.target;
  let operator;
  if (displayArea.textContent.includes("+")) operator = "+";
  if (displayArea.textContent.includes("-")) operator = "-";
  if (displayArea.textContent.includes("×")) operator = "×";
  if (displayArea.textContent.includes("÷")) operator = "÷";
  let expArr = displayArea.textContent.split(operator);
  console.log(expArr);
  firstNum = Number(expArr[0]);
  secondNum = Number(expArr[1]);
  displayArea.textContent = operate(firstNum, operator, secondNum);
}

container.addEventListener("click", display);
equalTo.addEventListener("click", evaluate);
console.log(operate(1, "+", 5));
console.log(operate(1, "-", 9));
console.log(operate(1, "×", 189));
console.log(operate(5, "÷", 10));
