import { clearPhotos } from './sorting.js';
import { showBigPhoto } from './full-size-foto.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')?.content?.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const renderUsersPhoto = (userPhotos) => {
  clearPhotos();
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
};

export {picturesContainer, renderUsersPhoto};
