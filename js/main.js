import {getPhotosDescription} from './photo.js';
import './photo-thumbnail.js';
import './full-size-foto.js';
import './form.js';
import './image-effects.js';
import './scale.js';
import './sorting.js';
import { getData } from './api.js';
import { renderUsersPhoto } from './photo-thumbnail.js';
import { setUserFormSubmit } from './form.js';
import { closeEditFormImage } from './form.js';
import { filterPhotos } from './sorting.js';

//getPhotosDescription();


// fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => response.json())
//   .then((photos) => {
//     renderUsersPhoto(photos);
//   });

getData()
  .then((photos) => {
    renderUsersPhoto(photos);
    filterPhotos(photos);
  });

setUserFormSubmit(closeEditFormImage);
