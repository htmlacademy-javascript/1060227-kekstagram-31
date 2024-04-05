import { getRandomInteger, debounce} from './util.js';
import { renderUsersPhoto } from './photo-thumbnail.js';

const NUMBER_RANDOM_PHOTO = 10;
//const RERENDER_DELAY = 500;
const imageFilters = document.querySelector('.img-filters');
// const defaultFilter = imageFilters.querySelector('#filter-default');
// const randomFilter = imageFilters.querySelector('#filter-random');
// const discussedFilter = imageFilters.querySelector('#filter-discussed');
const filterForm = document.querySelector('.img-filters__form');
const pictures = document.querySelector('.pictures');


const clearPhotos = () => {
  const photos = pictures.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });
};

const sortPhotos = (userPhotos) => {
  imageFilters.classList.remove('img-filters--inactive');

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

  const changeFilterClass = (filterName) => {
    document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
    document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
  };

  const onClickFilter = (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const idFilter = evt.target.id;

    switch(idFilter) {
      case 'filter-default':
        changeFilterClass(idFilter);
        renderUsersPhoto(sortPhotoDefault(userPhotos));
        break;
      case 'filter-random':
        changeFilterClass(idFilter);
        renderUsersPhoto(sortPhotoRandom(userPhotos));
        break;
      case 'filter-discussed':
        changeFilterClass(idFilter);
        renderUsersPhoto(sortPhotoDiscussed(userPhotos));
        break;
    }
  };
  filterForm.addEventListener('click', debounce(onClickFilter));
};


export {sortPhotos, clearPhotos};
