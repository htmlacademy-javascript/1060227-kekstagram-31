function checkLengthString (string, maxLength) {
  return string.length <= maxLength;
}
checkLengthString('проверяемая строка', 20);
checkLengthString('проверяемая строка', 18);
checkLengthString('проверяемая строка', 10);


function checkPalindrom (string) {
  string = string.toUpperCase().replaceAll(' ', '');
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return string === newString;
}
checkPalindrom('топот');
checkPalindrom('довод');
checkPalindrom('Кекс');
checkPalindrom('Лёша на полке клопа нашёл ');


function getNumber (string) {
  let newString = '';
  if (typeof string === 'number') {
    string = string.toString();
  }
  string = string.replaceAll(' ', '');
  for (let i = 0; i <= string.length - 1; i++) {
    string[i] = parseInt(string[i], 10);
    if (!Number.isNaN(string[i]) && string[i] >= 0) {
      newString += string[i];
      newString = parseInt(newString, 10);
    }

  }
  if (!newString) {
    return NaN;
  }
  return newString;
}
getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2056);
getNumber(-1);
getNumber(1.5);
