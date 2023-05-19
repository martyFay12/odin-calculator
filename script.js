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

function recordDigit() {
  const digit = this.textContent;
  operandFlag ? operand1 + digit : operand2 + digit;
}

function recordOperation() {
  if (operationSaved) {
    // already an operation saved
    doMath();
  }
  operationSaved = this.textContent;
}

// function doMath(){
//     switch(operationSaved){
//         case('=')
//     }
// }
