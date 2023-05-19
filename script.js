let operandFlag = true;
let operand1 = "";
let operand2 = "";
let operationSaved = "";

// SELECT BUTTONS
const digits = document.querySelectorAll(".digit");
const operations = document.querySelectorAll(".operation");
const decimalButton = document.querySelector(".decimal-digit");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const plusMinusButton = document.querySelector(".plus-minus");

// ADD EVENT LISTENERS
digits.forEach((digit) => digit.addEventListener("click", recordDigit));
operations.forEach((operation) =>
  operation.addEventListener("click", recordOperation)
);
equalsButton.addEventListener("click", equalsPress);
reset();
clearButton.addEventListener("click", reset);
plusMinusButton.addEventListener("click", plusMinus);

function plusMinus() {
  if (operandFlag) {
    if (operand1[0] === "-") {
      operand1 = operand1.slice(1);
    } else {
      operand1 = "-" + operand1;
    }
  } else {
    if (operand2[0] === "-") {
      operand2 = operand2.slice(1);
    } else {
      operand2 = "-" + operand2;
    }
  }
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
}

function equalsPress() {
  doMath();
  addListenerToDecimal();
  operandFlag = !operandFlag;
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
}

function reset() {
  operandFlag = true;
  operand1 = "";
  operand2 = "";
  operationSaved = "";
  addListenerToDecimal();
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
}

function addListenerToDecimal() {
  decimalButton.addEventListener("click", recordDigit);
}

function removeListenerFromDecimal() {
  decimalButton.removeEventListener("click", recordDigit);
}

function recordDigit() {
  const digit = this.textContent;
  operandFlag ? (operand1 += digit) : (operand2 += digit);
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
  if (digit === ".") removeListenerFromDecimal();
}

function recordOperation() {
  if (operationSaved) {
    // already an operation saved
    if (doMath()) {
      operandFlag = !operandFlag;
    } else return;
  }
  operationSaved = this.textContent;
  operandFlag = !operandFlag;
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
  addListenerToDecimal();
}

function doMath() {
  switch (operationSaved) {
    case "+":
      return mathAdd(operand1, operand2);
    case "-":
      return mathAdd(operand1, "-" + operand2);
    case "*":
      return mathMult(operand1, operand2);
    case "/":
      return mathDiv(operand1, operand2);
  }
}

function mathAdd() {
  operand1 = Number(operand1) + Number(operand2);
  operand2 = "";
  operationSaved = "";
  return true;
}

function mathMult() {
  operand1 = Number(operand1) * Number(operand2);
  operand2 = "";
  operationSaved = "";
  return true;
}

function mathDiv() {
  if (Number(operand2) === 0) return divisionByZero();
  operand1 = Number(operand1) / Number(operand2);
  operand2 = "";
  operationSaved = "";
  return true;
}

function divisionByZero() {
  alert("you really are a moron...");
  reset();
  return false;
}
