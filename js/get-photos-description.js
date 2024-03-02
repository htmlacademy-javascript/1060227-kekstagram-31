import {getRandomArrayElement, getRandomInteger, createCounter} from './util.js';
import {NAMES, DESCRIPTION_LIST, MESSAGE_LIST} from './data.js';

const lengthPhotosDescription = 25;
const getIdPhoto = createCounter();
const getIdComment = createCounter();
const getNumberPhoto = createCounter();

const getRandomNumberAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;
const getUrlPhoto = (number) => `photos/${number}.jpg`;
const getDescription = (number) => DESCRIPTION_LIST[number - 1];

const getRandomMessage = () => {
  const messageNumber = getRandomInteger(1, 2);
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
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};

const PhotosDescription = () => Array.from({length: lengthPhotosDescription}, createPhotoDescription);

export {PhotosDescription};
