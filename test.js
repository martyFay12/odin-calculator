function shortScientific(string) {
  const num = Number(string);
  const numInSciNot = {};
  [numInSciNot.coefficient, numInSciNot.exponent] = num
    .toExponential()
    .split("e")
    .map((item) => Number(item));
  console.log(numInSciNot);
}

shortScientific("1002020202003030320203");
