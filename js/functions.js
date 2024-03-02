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
    const element = parseInt(string[i], 10);
    if (!Number.isNaN(element)) {
      newString += element;
    }
  }
  return parseInt(newString, 10);
}
getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2056);
getNumber(-1);
getNumber(1.5);


// Домашнее задание 5.16 Функции возвращаются
const getTimeArray = (time) => time.split(':');
const getTimeInMinutes = (timeArray) => Number(timeArray[0]) * 60 + Number(timeArray[1]);

const checkTimeMeeting = (startWork, finishWork, startMeeting, durationMeeting) => {
  const startWorkArray = getTimeArray(startWork);
  const finishWorkArray = getTimeArray(finishWork);
  const startMeetingArray = getTimeArray(startMeeting);
  finishWork = getTimeInMinutes(finishWorkArray);
  startWork = getTimeInMinutes(startWorkArray);
  startMeeting = getTimeInMinutes(startMeetingArray);
  const finishMeeting = startMeeting + durationMeeting;
  return (startWork <= finishMeeting) && (finishMeeting <= finishWork) && (startMeeting >= startWork);
};
checkTimeMeeting('08:00', '17:30', '14:00', 90);


