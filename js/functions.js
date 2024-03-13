// Домашнее задание 5.16 Функции возвращаются
const getTimeArray = (time) => time.split(':');
const getTimeInMinutes = (timeArray) => Number(timeArray[0]) * 60 + Number(timeArray[1]);

const checkTimeMeeting = (startWork, finishWork, startMeeting, durationMeeting) => {
  const startWorkArray = getTimeArray(startWork);
  const finishWorkArray = getTimeArray(finishWork);
  const startMeetingArray = getTimeArray(startMeeting);
  return (getTimeInMinutes(startWorkArray) <= getTimeInMinutes(startMeetingArray) + durationMeeting) && (getTimeInMinutes(startMeetingArray) + durationMeeting <= getTimeInMinutes(finishWorkArray)) && (getTimeInMinutes(startMeetingArray) >= getTimeInMinutes(startWorkArray));
};
console.log(checkTimeMeeting('08:00', '17:30', '14:00', 90));
