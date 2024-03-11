import {getPhotosDescription} from './photo.js';
//import {openBigPicture} from './full-size-foto.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')?.content;


const photosDescription = getPhotosDescription();

const picturesFragment = document.createDocumentFragment();

photosDescription.forEach(({url, description, likes, comments}) => {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateClone.querySelector('.picture__img').src = url;
  pictureTemplateClone.querySelector('.picture__img').alt = description;
  pictureTemplateClone.querySelector('.picture__likes').textContent = likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(pictureTemplateClone);

  // pictureTemplateClone.addEventListener('click', () => {
  //   showBigPicture();
  // });
});

picturesContainer.appendChild(picturesFragment);

// picturesContainer.addEventListener('click', () => {
//   openBigPicture();
// });

export {picturesContainer, photosDescription};
