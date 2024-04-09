import {picturesContainerElement} from './photo-thumbnail.js';

const COMMENTS_NUMBER_LIMIT = 5;
let COMMENTS_NUMBER_CURRENT = 0;
let commentsArray = [];
const bigPictureContainerElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const imageElement = bigPictureContainerElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainerElement.querySelector('.likes-count');
const descriptionPhotoElement = bigPictureContainerElement.querySelector('.social__caption');
const commentTemplateElement = document.querySelector('#comment')?.content?.querySelector('.social__comment');
const socialCommentsListElement = bigPictureContainerElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureContainerElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureContainerElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureContainerElement.querySelector('.comments-loader');


const openBigPicture = () => {
  bigPictureContainerElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureContainerElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancelElement.addEventListener('click', () => {
  closeBigPicture();
});

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const commentFragment = document.createDocumentFragment();

const createComment = (comment) => {
  const commentTemplateClone = commentTemplateElement.cloneNode(true);
  const socialPictureElement = commentTemplateClone.querySelector('.social__picture');
  socialPictureElement.src = comment.avatar;
  socialPictureElement.alt = comment.name;
  commentTemplateClone.querySelector('.social__text').textContent = comment.message;
  commentFragment.appendChild(commentTemplateClone);
  socialCommentsListElement.appendChild(commentFragment);
};


const createCommentsList = (comment, startIndex = 0) => {
  let newCommentIndex = 0;
  for (let i = startIndex; i < Math.min(startIndex + COMMENTS_NUMBER_LIMIT, comment.length); i++) {
    createComment(comment[i]);
    commentsLoaderElement.classList.add('hidden');
    newCommentIndex = i + 1;
  }
  if (comment.length > newCommentIndex) {
    commentsLoaderElement.classList.remove('hidden');
  }
  return newCommentIndex;
};

const showCommentsAfterClick = () => {
  const commentsNumber = createCommentsList(commentsArray, COMMENTS_NUMBER_CURRENT);
  commentShownCountElement.textContent = commentsNumber;
  COMMENTS_NUMBER_CURRENT = commentsNumber;
};

const createPhotoDescription = (urlPhoto, likesPhoto, descriptionOfPhoto, commentsPhoto) => {
  imageElement.src = urlPhoto;
  likesCountElement.textContent = likesPhoto;
  descriptionPhotoElement.textContent = descriptionOfPhoto;
  commentTotalCountElement.textContent = commentsPhoto.length;
  socialCommentsListElement.innerHTML = '';
  commentShownCountElement.textContent = createCommentsList(commentsPhoto);
  if (commentsPhoto.length > COMMENTS_NUMBER_LIMIT) {
    commentsArray = commentsPhoto;
    COMMENTS_NUMBER_CURRENT = 5;
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', showCommentsAfterClick);
  }
};

const showBigPhoto = (userPhotos) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    userPhotos.forEach(({ id, url, likes, description, comments }) => {
      if ((Number(evt.target.closest('.picture')?.dataset.pictureId)) === id) {
        openBigPicture();
        createPhotoDescription(url, likes, description, comments);
      }
    });
  });
};

export {showBigPhoto};
