import {getPhotosDescription} from './photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')?.content?.querySelector('.picture');


const photosDescription = getPhotosDescription();

const picturesFragment = document.createDocumentFragment();

photosDescription.forEach(({id, url, description, likes, comments}) => {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateClone.dataset.pictureId = id;
  pictureTemplateClone.querySelector('.picture__img').src = url;
  pictureTemplateClone.querySelector('.picture__img').alt = description;
  pictureTemplateClone.querySelector('.picture__likes').textContent = likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(pictureTemplateClone);
});

picturesContainer.appendChild(picturesFragment);

export {picturesContainer, photosDescription};
