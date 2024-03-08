import {getPhotosDescription} from './photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;


const photosDescription = getPhotosDescription();

const picturesFragment = document.createDocumentFragment();

photosDescription.forEach((photo) => {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateClone.querySelector('.picture__img').src = photo.url;
  pictureTemplateClone.querySelector('.picture__img').alt = photo.description;
  pictureTemplateClone.querySelector('.picture__likes').textContent = photo.likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = photo.comments.length;
  picturesFragment.appendChild(pictureTemplateClone);
});

picturesContainer.appendChild(picturesFragment);
