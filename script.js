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

function reset() {
  operandFlag = true;
  operand1 = "";
  operand2 = "";
  operationSaved = "";
  addListenterToDecimal();
}

function recordDigit() {
  const digit = this.textContent;
  operandFlag ? (operand1 += digit) : (operand2 += digit);
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
}

function recordOperation() {
  if (operationSaved) {
    // already an operation saved
    doMath();
  }
  operationSaved = this.textContent;
  operandFlag = !operandFlag;
  console.log(
    `operand1: ${operand1}, operand2: ${operand2}, operation: ${operationSaved}, operationflag:${operandFlag}`
  );
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
  return 0;
}

function mathMult() {
  return 1;
}

function mathDiv() {
  return 0;
}
