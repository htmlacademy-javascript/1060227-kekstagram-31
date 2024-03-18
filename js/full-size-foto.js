import {picturesContainer, photosDescription} from './photo-thumbnail.js';

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
const COMMENTS_NUMBER = 5;


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

const createOneComment = (comment) => {
  const commentTemplateClone = commentTemplate.cloneNode(true);
  commentTemplateClone.querySelector('.social__picture').src = comment.avatar;
  commentTemplateClone.querySelector('.social__picture').alt = comment.name;
  commentTemplateClone.querySelector('.social__text').textContent = comment.message;
  commentFragment.appendChild(commentTemplateClone);
  socialCommentsList.appendChild(commentFragment);
};

const createCommentsList = (comment) => {
  let countComments = 0;
  for (let i = 0; i < COMMENTS_NUMBER; i++) {
    if (comment.length === 0) {
      commentsLoader.classList.add('hidden');
      break;
    }
    createOneComment(comment[0]);
    comment.shift();
    commentsLoader.classList.remove('hidden');
    countComments++;
  }
  if (comment.length === 0) {
    commentsLoader.classList.add('hidden');
  }
  return countComments;
};


const createPhotoDescription = (urlPhoto, likesPhoto, descriptionOfPhoto, commentsPhoto) => {
  image.src = urlPhoto;
  likesCount.textContent = likesPhoto;
  descriptionPhoto.textContent = descriptionOfPhoto;
  commentTotalCount.textContent = commentsPhoto.length;
  socialCommentsList.innerHTML = '';
  const newComments = commentsPhoto.slice();
  let countCommentsFull = createCommentsList(newComments);
  commentShownCount.textContent = countCommentsFull;
  if (commentsPhoto.length > COMMENTS_NUMBER) {
    commentsLoader.addEventListener('click', () => {
      countCommentsFull += createCommentsList(newComments);
      commentShownCount.textContent = countCommentsFull;
    });
  }
};

picturesContainer.addEventListener('click', (evt) => {
  photosDescription.forEach(({ id, url, likes, description, comments }) => {
    if ((Number(evt.target.closest('.picture')?.dataset.pictureId)) === id) {
      openBigPicture();
      createPhotoDescription(url, likes, description, comments);
    }
  });
});


