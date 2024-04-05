import {picturesContainer} from './photo-thumbnail.js';

const COMMENTS_NUMBER_LIMIT = 5;
let COMMENTS_NUMBER_CURRENT = 0;
const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const descriptionPhoto = bigPictureContainer.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment')?.content?.querySelector('.social__comment');
const socialCommentsList = bigPictureContainer.querySelector('.social__comments');
const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
let commentsArray = [];


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

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const commentFragment = document.createDocumentFragment();

const createComment = (comment) => {
  const commentTemplateClone = commentTemplate.cloneNode(true);
  const socialPicture = commentTemplateClone.querySelector('.social__picture');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  commentTemplateClone.querySelector('.social__text').textContent = comment.message;
  commentFragment.appendChild(commentTemplateClone);
  socialCommentsList.appendChild(commentFragment);
};


const createCommentsList = (comment, startIndex = 0) => {
  let newCommentIndex = 0;
  for (let i = startIndex; i < Math.min(startIndex + COMMENTS_NUMBER_LIMIT, comment.length); i++) {
    createComment(comment[i]);
    commentsLoader.classList.add('hidden');
    newCommentIndex = i + 1;
  }
  if (comment.length > newCommentIndex) {
    commentsLoader.classList.remove('hidden');
  }
  return newCommentIndex;
};

const showCommentsAfterClick = () => {
  const commentsNumber = createCommentsList(commentsArray, COMMENTS_NUMBER_CURRENT);
  commentShownCount.textContent = commentsNumber;
  COMMENTS_NUMBER_CURRENT = commentsNumber;
};

const createPhotoDescription = (urlPhoto, likesPhoto, descriptionOfPhoto, commentsPhoto) => {
  image.src = urlPhoto;
  likesCount.textContent = likesPhoto;
  descriptionPhoto.textContent = descriptionOfPhoto;
  commentTotalCount.textContent = commentsPhoto.length;
  socialCommentsList.innerHTML = '';
  commentShownCount.textContent = createCommentsList(commentsPhoto);
  if (commentsPhoto.length > COMMENTS_NUMBER_LIMIT) {
    commentsArray = commentsPhoto;
    COMMENTS_NUMBER_CURRENT = 5;
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', showCommentsAfterClick);
  }
};

const showBigPhoto = (userPhotos) => {
  picturesContainer.addEventListener('click', (evt) => {
    userPhotos.forEach(({ id, url, likes, description, comments }) => {
      if ((Number(evt.target.closest('.picture')?.dataset.pictureId)) === id) {
        openBigPicture();
        createPhotoDescription(url, likes, description, comments);
      }
    });
  });
};

export {showBigPhoto};
