import {picturesContainer, photosDescription} from './photo-thumbnail.js';

const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const image = bigPictureContainer.querySelector('.big-picture__img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const descriptionPhoto = bigPictureContainer.querySelector('.social__caption');
const socialCommentsList = bigPictureContainer.querySelector('.social__comments');
const socialCommentOne = bigPictureContainer.querySelector('.social__comment');
const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');


const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

const createOneComment = () => {
  const commentElement = socialCommentOne.cloneNode(true);
};


picturesContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  openBigPicture();
  photosDescription((photo) => {
    image.src = photo.url;
    likesCount.textContent = photo.likes;
    descriptionPhoto.textContent = photo.description;
  });
});


//export {openBigPicture, bigPictureContainer};
