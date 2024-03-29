import {getRandomArrayElement, getRandomInteger, createCounter} from './util.js';
import {NAMES, DESCRIPTION_LIST, MESSAGE_LIST} from './data.js';
//import { getData } from './api.js';

const ValuesConstants = {
  NUMBER_PHOTO_DESCRIPTION: 25,
  MIN_NUMBER_AVATAR: 1,
  MAX_NUMBER_AVATAR: 6,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 30,
  MIN_MESSAGES: 1,
  MAX_MESSAGES: 2,
};

const getIdPhoto = createCounter();
const getIdComment = createCounter();
const getNumberPhoto = createCounter();

const getRandomNumberAvatar = () => `img/avatar-${getRandomInteger(ValuesConstants.MIN_NUMBER_AVATAR, ValuesConstants.MAX_NUMBER_AVATAR)}.svg`;
const getUrlPhoto = (number) => `photos/${number}.jpg`;
const getDescription = (number) => DESCRIPTION_LIST[number - 1];

const getRandomMessage = () => {
  const messageNumber = getRandomInteger(ValuesConstants.MIN_MESSAGES, ValuesConstants.MAX_MESSAGES);
  let newMessage = '';
  let randomMessageIndexOld = -1;
  for (let j = 1; j <= messageNumber; j++) {
    let randomMessageIndexNow = getRandomInteger(0, MESSAGE_LIST.length - 1);
    while (randomMessageIndexNow === randomMessageIndexOld) {
      randomMessageIndexNow = getRandomInteger(0, MESSAGE_LIST.length - 1);
    }
    newMessage += MESSAGE_LIST[randomMessageIndexNow];
    randomMessageIndexOld = randomMessageIndexNow;
  }
  return newMessage;
};

const createComment = () => ({
  id: getIdComment(),
  avatar: getRandomNumberAvatar(),
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => {
  const numberPhoto = getNumberPhoto();
  return {
    id: getIdPhoto(),
    url: getUrlPhoto(numberPhoto),
    description: getDescription(numberPhoto),
    likes: getRandomInteger(ValuesConstants.MIN_LIKES, ValuesConstants.MAX_LIKES),
    comments: Array.from({length: getRandomInteger(ValuesConstants.MIN_COMMENTS, ValuesConstants.MAX_COMMENTS)}, createComment),
  };
};

const getPhotosDescription = () => Array.from({length: ValuesConstants.NUMBER_PHOTO_DESCRIPTION}, createPhotoDescription);
export {getPhotosDescription};
