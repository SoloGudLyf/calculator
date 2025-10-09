let firstNum;
let operator;
let secondNum;
const container = document.querySelector(".container");
const displayArea = document.querySelector(".display");
container.addEventListener("click", updateDisplayArea);

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
  return arr[0] / arr[1];
}
function operate(num1, symbol, num2) {
  if (symbol === "+") return add([num1, num2]);
  if (symbol === "-") return subtract([num1, num2]);
  if (symbol === "×") return multiply([num1, num2]);
  if (symbol === "÷") return divide([num1, num2]);
}

function updateDisplayArea(event) {
  let elemClicked = event.target;

  if (elemClicked.textContent === "C") {
    displayArea.textContent = "";
  }

  // Delete user input
  else if (elemClicked.textContent === "del") {
    let exp = Array.from(displayArea.textContent);
    exp.pop();
    console.log(exp);
    displayArea.textContent = exp.join("");
  }

  // Calculate expression and give answer
  else if (elemClicked.textContent === "=") {
    evaluate();
  } else if (
    elemClicked.textContent === "+" ||
    elemClicked.textContent === "-" ||
    elemClicked.textContent === "×" ||
    elemClicked.textContent === "+"
  ) {
    // Check if an operator already exists
    if (checkOperator()) {
      return;
    } else {
      displayArea.textContent += elemClicked.textContent;
    }
  }

  // Display number buttons clicked or decimal
  else {
    displayArea.textContent += elemClicked.textContent;
  }
}

function checkOperator() {
  let exp = Array.from(displayArea.textContent);
  if (exp[0] === "-" || exp[0] === "+") {
    return false;
  } else if (
    exp.includes("+") ||
    exp.includes("-") ||
    exp.includes("×") ||
    exp.includes("+")
  ) {
    return true;
  }
}
checkOperator();

function evaluate() {
  if (!checkOperator()) {
    return;
  }
  
  let expArr;
  if (displayArea.textContent.includes("+")) operator = "+";
  if (displayArea.textContent.includes("-")) operator = "-";
  if (displayArea.textContent.includes("×")) operator = "×";
  if (displayArea.textContent.includes("÷")) operator = "÷";
  expArr = displayArea.textContent.split(operator);
  firstNum = Number(expArr[0]);
  secondNum = Number(expArr[1]);
  displayArea.textContent = operate(firstNum, operator, secondNum);
}
