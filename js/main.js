import './photo-thumbnail.js';
import './full-size-foto.js';
import './form.js';
import './image-effects.js';
import './scale.js';
import './sorting.js';
import './load-photo.js';
import { getData } from './api.js';
import { renderUsersPhoto } from './photo-thumbnail.js';
import { setUserFormSubmit, closeEditFormImage, showGetDataError } from './form.js';
import { sortPhotos } from './sorting.js';

getData()
  .then((photos) => {
    renderUsersPhoto(photos);
    sortPhotos(photos);
  })
  .catch(() => {
    showGetDataError();
  });

setUserFormSubmit(closeEditFormImage);
