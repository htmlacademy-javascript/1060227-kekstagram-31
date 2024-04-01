import { getRandomInteger } from "./util.js";
import { renderUsersPhoto } from "./photo-thumbnail.js";

const NUMBER_RANDOM_PHOTO = 10;
const imageFilters = document.querySelector('.img-filters');
const defaultFilter = imageFilters.querySelector('#filter-default');
const randomFilter = imageFilters.querySelector('#filter-random');
const discussedFilter = imageFilters.querySelector('#filter-discussed');
//const filterButton = document.querySelector('.img-filters__button');
const filterButtonsArray = Array.from(document.querySelectorAll('.img-filters__button'));

imageFilters.classList.remove('img-filters--inactive');

const filterPhotoDefault = (userPhotos) => userPhotos;

const filterPhotoRandom = (userPhotos) => {
  const newUserPhotosArray = [];
  while (userPhotos.length < NUMBER_RANDOM_PHOTO) {
    const randomIndex = getRandomInteger(0, userPhotos.length - 1);
    if (!newUserPhotosArray.includes(userPhotos[randomIndex])) {
      newUserPhotosArray.push(userPhotos[randomIndex]);
    }
  }
  return newUserPhotosArray;
};

const filterPhotoDiscussed = (userPhotos) => {
  userPhotos.slice().sort((commentA, commentB) => commentB.length - commentA.length);
};

for (const filterButton of filterButtonsArray) {
  filterButton.addEventListener('click', ()=> {
    filterButtonsArray.forEach((button) => button.classList.remove('img-filters__button--active'));
    filterButton.classList.add('img-filters__button--active');
  }
  );
}

const filterPhotos = (userPhotos) => {
  defaultFilter.addEventListener('click', filterPhotoDefault());
  randomFilter.addEventListener('click', filterPhotoRandom());
  discussedFilter.addEventListener('click', filterPhotoDiscussed());
};


export {filterPhotos};
