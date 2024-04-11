import { getRandomInteger, debounce} from './util.js';
import { renderUsersPhoto } from './photo-thumbnail.js';

const NUMBER_RANDOM_PHOTO = 10;
const imageFiltersElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const picturesElement = document.querySelector('.pictures');
const buttonsFiltersElement = filterFormElement.querySelectorAll('.img-filters__button');

const clearPhotos = () => {
  const photos = picturesElement.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });
};

const sortPhotos = (userPhotos) => {
  imageFiltersElement.classList.remove('img-filters--inactive');

  const sortPhotoDefault = () => userPhotos;

  const sortPhotoRandom = () => {
    const newUserPhotosArray = [];
    while (newUserPhotosArray.length < NUMBER_RANDOM_PHOTO) {
      const randomIndex = getRandomInteger(0, userPhotos.length - 1);
      if (!newUserPhotosArray.includes(userPhotos[randomIndex])) {
        newUserPhotosArray.push(userPhotos[randomIndex]);
      }
    }
    return newUserPhotosArray;
  };

  const sortPhotoDiscussed = () => userPhotos.slice().sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);


  const onButtonClick = (evt) => {
    const buttonId = evt.target.id;
    if (!buttonId) {
      return;
    }
    buttonsFiltersElement.forEach((element) => element.classList.remove('img-filters__button--active'));
    document.querySelector(`#${buttonId}`).classList.add('img-filters__button--active');
  };

  const onFilterClick = (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const buttonId = evt.target.id;

    switch(buttonId) {
      case 'filter-default':
        renderUsersPhoto(sortPhotoDefault(userPhotos));
        break;
      case 'filter-random':
        renderUsersPhoto(sortPhotoRandom(userPhotos));
        break;
      case 'filter-discussed':
        renderUsersPhoto(sortPhotoDiscussed(userPhotos));
        break;
    }
  };
  filterFormElement.addEventListener('click', debounce(onFilterClick));
  filterFormElement.addEventListener('click', onButtonClick);
};


export {sortPhotos, clearPhotos};
