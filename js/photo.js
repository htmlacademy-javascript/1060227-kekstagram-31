import {getRandomArrayElement, getRandomInteger, createCounter} from './util.js';
import {NAMES, DESCRIPTION_LIST, MESSAGE_LIST} from './data.js';

const VALUES_CONSTANTS = {
  numberPhotoDescription: 25,
  minNumberAvatar: 1,
  maxNumberAvatar: 6,
  minLikes: 15,
  maxLikes: 200,
  minComments: 0,
  maxComments: 30,
  minMessages: 1,
  maxMessages: 2,
};

const getIdPhoto = createCounter();
const getIdComment = createCounter();
const getNumberPhoto = createCounter();

const getRandomNumberAvatar = () => `img/avatar-${getRandomInteger(VALUES_CONSTANTS.minNumberAvatar, VALUES_CONSTANTS.maxNumberAvatar)}.svg`;
const getUrlPhoto = (number) => `photos/${number}.jpg`;
const getDescription = (number) => DESCRIPTION_LIST[number - 1];

const getRandomMessage = () => {
  const messageNumber = getRandomInteger(VALUES_CONSTANTS.minMessages, VALUES_CONSTANTS.maxMessages);
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
    likes: getRandomInteger(VALUES_CONSTANTS.minLikes, VALUES_CONSTANTS.maxLikes),
    comments: Array.from({length: getRandomInteger(VALUES_CONSTANTS.minComments, VALUES_CONSTANTS.maxComments)}, createComment),
  };
};

const getPhotosDescription = () => Array.from({length: VALUES_CONSTANTS.numberPhotoDescription}, createPhotoDescription);

export {getPhotosDescription};
