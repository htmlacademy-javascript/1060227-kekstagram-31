import {getPhotosDescription} from './photo.js';
import { showBigPhoto } from './full-size-foto.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')?.content?.querySelector('.picture');


//const photosDescription = getPhotosDescription();

const picturesFragment = document.createDocumentFragment();
//Получается отрисовать только сразу при получении данных из фетча,
//но если передать данные дальше, то получаю ошибку TypeError: undefined is not a function (near '...photosDescription.forEach...')
// const ddddData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach(({id, url, description, likes, comments}) => {
//       const pictureTemplateClone = pictureTemplate.cloneNode(true);
//       pictureTemplateClone.dataset.pictureId = id;
//       pictureTemplateClone.querySelector('.picture__img').src = url;
//       pictureTemplateClone.querySelector('.picture__img').alt = description;
//       pictureTemplateClone.querySelector('.picture__likes').textContent = likes;
//       pictureTemplateClone.querySelector('.picture__comments').textContent = comments.length;
//       picturesFragment.appendChild(pictureTemplateClone);
//     });
//     picturesContainer.appendChild(picturesFragment);
//     return data;
//   });
// const photosDescription = ddddData();

// picturesContainer.appendChild(picturesFragment);

// export {picturesContainer, photosDescription};

const renderUsersPhoto = (userPhotos) => {
  userPhotos.forEach(({id, url, description, likes, comments}) => {
    const pictureTemplateClone = pictureTemplate.cloneNode(true);
    pictureTemplateClone.dataset.pictureId = id;
    pictureTemplateClone.querySelector('.picture__img').src = url;
    pictureTemplateClone.querySelector('.picture__img').alt = description;
    pictureTemplateClone.querySelector('.picture__likes').textContent = likes;
    pictureTemplateClone.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureTemplateClone);
  });

  picturesContainer.appendChild(picturesFragment);
  showBigPhoto(userPhotos);
  return userPhotos;
};
//picturesContainer.appendChild(picturesFragment);
//export {picturesContainer, photosDescription};
//renderPhoto(photosDescription);
export {picturesContainer, renderUsersPhoto};
