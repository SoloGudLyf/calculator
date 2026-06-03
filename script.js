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
    displayArea.textContent = 0;
  }

  // Delete user input
  else if (elemClicked.textContent === "del") {
    let exp = Array.from(displayArea.textContent);
    exp.pop();
    if (exp.length == 0) exp.push("0");
    displayArea.textContent = exp.join("");
  }

  // Calculate expression and give answer
  else if (elemClicked.textContent === "=") {
    evaluate();
  } else if (
    elemClicked.textContent === "+" ||
    elemClicked.textContent === "-" ||
    elemClicked.textContent === "×" ||
    elemClicked.textContent === "÷"
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
    displayArea.textContent =
      displayArea.textContent == "0"
        ? elemClicked.textContent
        : displayArea.textContent + elemClicked.textContent;
  }
}

function checkOperator() {
  let exp = Array.from(displayArea.textContent);
  console.log(displayArea.textContent);

  if (exp[0] === "-" || exp[0] === "+") {
    // Check if there are other operators clicked
    let operators = ["+", "-", "×", "÷"];
    let operatorCount = 0;
    exp.map((r) => {
      if (operators.includes(r)) operatorCount++;
    });
    if (operatorCount === 2) return true;

    // The only operator in the expression is a leading on i.e + or -
    return false;
  } else if (
    exp.includes("+") ||
    exp.includes("-") ||
    exp.includes("×") ||
    exp.includes("÷")
  ) {
    return true;
  }
}

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
  console.log(expArr);

  firstNum = Number(expArr[0]);
  secondNum = Number(expArr[1]);
  displayArea.textContent = operate(firstNum, operator, secondNum);
}
