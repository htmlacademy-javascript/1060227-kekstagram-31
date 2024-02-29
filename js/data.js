import {getNumberPhoto} from '/js/util.js';
import {getIdPhoto} from '/js/util.js';
import {getUrlPhoto} from '/js/util.js';
import {getDescription} from '/js/util.js';
import {getRandomInteger} from '/js/util.js';
import {createComment} from '/js/util.js';


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

const PhotosDescription = () => Array.from({length: 25}, createPhotoDescription);

export {PhotosDescription};
// console.log(PhotosDescription);
//JSON.stringify(PhotosDescription);
