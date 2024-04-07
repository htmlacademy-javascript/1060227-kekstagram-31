import { clearPhotos } from './sorting.js';
import { showBigPhoto } from './full-size-foto.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')?.content?.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const renderUsersPhoto = (userPhotos) => {
  clearPhotos();
  userPhotos.forEach(({id, url, description, likes, comments}) => {
    const pictureTemplateClone = pictureTemplateElement.cloneNode(true);
    pictureTemplateClone.dataset.pictureId = id;
    pictureTemplateClone.querySelector('.picture__img').src = url;
    pictureTemplateClone.querySelector('.picture__img').alt = description;
    pictureTemplateClone.querySelector('.picture__likes').textContent = likes;
    pictureTemplateClone.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureTemplateClone);
  });

  picturesContainerElement.appendChild(picturesFragment);
  showBigPhoto(userPhotos);
};

export {picturesContainerElement, renderUsersPhoto};
