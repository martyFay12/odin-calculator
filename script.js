let operandFlag = true;
let operand1 = "";
let operand2 = "";
let operationSaved = "";

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", recordDigit));

const operations = document.querySelectorAll(".operation");
operations.forEach((operation) =>
  operation.addEventListener("click", recordOperation)
);
const decimalButton = document.querySelector(".decimal-digit");
reset();

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
