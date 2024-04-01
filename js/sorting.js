import { getRandomInteger } from './util.js';
import { renderUsersPhoto } from './photo-thumbnail.js';

const NUMBER_RANDOM_PHOTO = 10;
const imageFilters = document.querySelector('.img-filters');
const defaultFilter = imageFilters.querySelector('#filter-default');
const randomFilter = imageFilters.querySelector('#filter-random');
const discussedFilter = imageFilters.querySelector('#filter-discussed');
const pictures = document.querySelector('.pictures');

const clearPhotos = () => {
  const photos = pictures.querySelectorAll('.picture');

  photos.forEach((photo) => {
    photo.remove();
  });
};

const sortPhotoDefault = (userPhotos) => userPhotos;

const sortPhotoRandom = (userPhotos) => {
  const newUserPhotosArray = [];
  while (newUserPhotosArray.length < NUMBER_RANDOM_PHOTO) {
    const randomIndex = getRandomInteger(0, userPhotos.length - 1);
    if (!newUserPhotosArray.includes(userPhotos[randomIndex])) {
      newUserPhotosArray.push(userPhotos[randomIndex]);
    }
  }
  return newUserPhotosArray;
};

const sortPhotoDiscussed = (userPhotos) => userPhotos.slice().sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);

let activeFilter = defaultFilter;

const sortPhotos = (userPhotos) => {
  imageFilters.classList.remove('img-filters--inactive');

  defaultFilter.addEventListener('click', () => {
    activeFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');
    activeFilter = defaultFilter;
    renderUsersPhoto(sortPhotoDefault(userPhotos));
  });

  randomFilter.addEventListener('click', () => {
    activeFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');
    activeFilter = randomFilter;
    renderUsersPhoto(sortPhotoRandom(userPhotos));
  });

  discussedFilter.addEventListener('click', () => {
    activeFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
    activeFilter = discussedFilter;
    renderUsersPhoto(sortPhotoDiscussed(userPhotos));
  });
};
export {sortPhotos, clearPhotos};
