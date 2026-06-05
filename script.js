let firstNum;
let operator;
let secondNum;
const container = document.querySelector(".container");
const displayArea = document.querySelector(".display");
container.addEventListener("click", updateDisplayArea);
let operatorCount = 0;
let leadingOperator = false;
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
  let result;
  if (symbol === "+") {
    result = add([num1, num2]);
  } else if (symbol === "-") {
    result = subtract([num1, num2]);
  } else if (symbol === "×") {
    result = multiply([num1, num2]);
  } else if (symbol === "÷") {
    result = divide([num1, num2]);
  }
  if (isNaN(result) || result === Infinity) {
    alert("Math error, check computation");
    result = 0;
  } else if (result % 1 != 0) return result.toFixed(5);

  return result;
}

function updateDisplayArea(event) {
  let elemClicked = event.target;
  let exp = Array.from(displayArea.textContent);
  let dotInExpCount = 0;
  exp.map((elem) => {
    if (elem === ".") dotInExpCount++;
  });

  //Clear display area
  if (elemClicked.textContent === "C") {
    displayArea.textContent = 0;
  } else if (
    elemClicked.className === "display" ||
    elemClicked.textContent.length > 3
  )
    return;
  else if (
    exp.length > 18 &&
    elemClicked.textContent != "=" &&
    elemClicked.textContent != "del"
  )
    return;
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
    if (checkOperator(Array.from(displayArea.textContent))) {
      return;
    } else {
      displayArea.textContent += elemClicked.textContent;
    }
  }
  // Prevent double decimals in a number
  // return if there's a point in the first number
  else if (
    exp.includes(".") &&
    elemClicked.textContent === "." &&
    dotInExpCount <= 1 &&
    !checkOperator(exp.slice(1))
  ) {
    return;
  }
  // return if there's a point in the second number
  else if (
    checkOperator(exp.slice(1)) &&
    dotInExpCount >= 2 &&
    elemClicked.textContent === "."
  ) {
    return;
  }
  // Display number buttons clicked or decimal
  else {
    displayArea.textContent =
      displayArea.textContent == "0"
        ? elemClicked.textContent
        : displayArea.textContent + elemClicked.textContent;
  }
}

function checkOperator(exp) {
  if (exp[0] === "-" || exp[0] === "+") {
    leadingOperator = true;
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
  if (!checkOperator(Array.from(displayArea.textContent))) {
    return;
  }

  let expArr;
  operator = getOperator(displayArea.textContent);
  expArr = displayArea.textContent.split(operator);

  if (operatorCount === 2) {
    let secondOperator = getOperator(expArr[1]) || "-";

    expArr = expArr.concat(expArr[1].split(secondOperator));
    firstNum = operator + expArr[2];
    firstNum = Number(firstNum);
    secondNum = Number(expArr[3]);
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
