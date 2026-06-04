let firstNum;
let operator;
let secondNum;
const container = document.querySelector(".container");
const displayArea = document.querySelector(".display");
container.addEventListener("click", updateDisplayArea);
let operatorCount = 0;
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
  let exp = Array.from(displayArea.textContent);
  console.log(exp);

  if (elemClicked.textContent === "C") {
    displayArea.textContent = 0;
  }

  // Delete user input
  else if (elemClicked.textContent === "del") {
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
  // Prevent double decimals in a number
  else if (exp.includes(".") && elemClicked.textContent === ".") return;
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

  if (exp[0] === "-" || exp[0] === "+") {
    // Check if there are other operators clicked
    let operators = ["+", "-", "×", "÷"];
    operatorCount = 0;
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
  operator = getOperator(displayArea.textContent);
  expArr = displayArea.textContent.split(operator);

  if (operatorCount === 2) {
    let secondOperator = getOperator(expArr[1]) || "-";

    console.log(secondOperator, operator);
    console.log(expArr);

    expArr = expArr.concat(expArr[1].split(secondOperator));
    console.log(expArr);
    firstNum = operator + expArr[2];
    firstNum = Number(firstNum);
    secondNum = Number(expArr[3]);
    console.log(firstNum, secondNum);
    displayArea.textContent = operate(firstNum, secondOperator, secondNum);
    operatorCount = 0;
  } else {
    firstNum = Number(expArr[0]);
    secondNum = Number(expArr[1]);

    displayArea.textContent = operate(firstNum, operator, secondNum);
  }
}

function getOperator(str) {
  let operatorInStr;
  if (str.includes("+")) {
    operatorInStr = "+";
  }
  if (str.includes("-")) {
    operatorInStr = "-";
    return operatorInStr;
  }
  if (str.includes("×")) {
    operatorInStr = "×";
  }
  if (str.includes("÷")) {
    operatorInStr = "÷";
  }
  return operatorInStr;
}
