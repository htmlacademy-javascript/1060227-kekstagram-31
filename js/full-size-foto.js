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

const createComment = (comment) => {
  const commentTemplateClone = commentTemplate.cloneNode(true);
  const socialPicture = commentTemplateClone.querySelector('.social__picture');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  commentTemplateClone.querySelector('.social__text').textContent = comment.message;
  commentFragment.appendChild(commentTemplateClone);
  socialCommentsList.appendChild(commentFragment);
};


const createCommentsList = (comment, startIndex) => {
  let newCommentIndex = 0;
  for (let i = startIndex; i < Math.min(startIndex + COMMENTS_NUMBER, comment.length); i++) {
    createComment(comment[i]);
    commentsLoader.classList.add('hidden');
    newCommentIndex = i + 1;
  }
  if (comment.length > newCommentIndex) {
    commentsLoader.classList.remove('hidden');
  }
  return newCommentIndex;
};


const createPhotoDescription = (urlPhoto, likesPhoto, descriptionOfPhoto, commentsPhoto) => {
  image.src = urlPhoto;
  likesCount.textContent = likesPhoto;
  descriptionPhoto.textContent = descriptionOfPhoto;
  commentTotalCount.textContent = commentsPhoto.length;
  socialCommentsList.innerHTML = '';
  let indexCommentsStart = 0;
  let countComments = createCommentsList(commentsPhoto, indexCommentsStart);
  commentShownCount.textContent = countComments;
  if (commentsPhoto.length > COMMENTS_NUMBER) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', () => {
      indexCommentsStart += COMMENTS_NUMBER;
      countComments = createCommentsList(commentsPhoto, indexCommentsStart);
      commentShownCount.textContent = countComments;
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
