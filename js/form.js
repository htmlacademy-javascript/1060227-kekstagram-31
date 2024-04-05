import { addScaleListeners, removeScaleListeners } from './scale.js';
import { deleteEffect } from './image-effects.js';
import { sendData } from './api.js';
import {isEscapeKey} from './util.js';

const COMMENT_LIMIT = 140;
const LIMIT_HASHTAG = 5;
const TIMEOUT = 5000;
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('.img-upload__input');
const editFormImage = document.querySelector('.img-upload__overlay');
const buttonClose = editFormImage.querySelector('.img-upload__cancel');
const textHashtag = editFormImage.querySelector('.text__hashtags');
const textComment = editFormImage.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
const errorTemplate = document.querySelector('#data-error')?.content;

const successFormTemplate = document.querySelector('#success')?.content?.querySelector('.success');
const successForm = successFormTemplate.cloneNode(true);
const successButton = successForm.querySelector('.success__button');

const errorFormTemplate = document.querySelector('#error')?.content?.querySelector('.error');
const errorForm = errorFormTemplate.cloneNode(true);
const errorButton = errorForm.querySelector('.error__button');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
});


uploadButton.addEventListener('change', (evt) => {
  evt.preventDefault();
  addScaleListeners();
  editFormImage.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  deleteEffect();
});

const closeEditFormImage = () => {
  editFormImage.classList.add('hidden');
  uploadButton.value = '';
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  pristine.reset();
};

buttonClose.addEventListener('click', () => {
  closeEditFormImage();
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditFormImage();
  }
}

function onErrorMessageKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    hideErrorMessage();
  }
}

function onSuccessMessageKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    hideSuccessMessage();
  }
}

textHashtag.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textComment.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const validateLengthComment = (comment) => comment.length <= COMMENT_LIMIT;
const validateHashtagLimit = (hashtagList) => {
  let hashtagArray = hashtagList.trim().split(' ');
  hashtagArray = hashtagArray.filter((hashtag) => hashtag !== '');

  return hashtagArray.length <= LIMIT_HASHTAG;
};

const validateHashtagUniq = (hashtagList) => {
  let hashtagArray = hashtagList.toLowerCase().trim().split(' ');
  hashtagArray = hashtagArray.filter((hashtag) => hashtag !== '');
  const uniqueArray = Array.from(new Set(hashtagArray));
  return hashtagArray.length === uniqueArray.length;
};

const validateHashtag = (hashtagList) => {
  if (hashtagList === '') {
    return true;
  }
  let hashtagArray = hashtagList.trim().split(' ');
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  hashtagArray = hashtagArray.filter((hashtag) => hashtag !== '');
  for (let i = 0; i < hashtagArray.length; i++) {
    if (!hashtagRegex.test(hashtagArray[i])) {
      return false;
    }
  }
  return true;
};


pristine.addValidator(textComment, validateLengthComment, 'Длина комментария больше 140 символов');
pristine.addValidator(textHashtag, validateHashtagLimit, 'Превышено количество хэштегов');
pristine.addValidator(textHashtag, validateHashtagUniq, 'Хэштеги повторяются');
pristine.addValidator(textHashtag, validateHashtag, 'Введён невалидный хэштег');

function hideSuccessMessage() {
  body.removeChild(successForm);
  document.removeEventListener('keydown', onSuccessMessageKeydown);
  document.removeEventListener('click', onOutsideClickSuccess);
}

const closeSuccessMessageByClick = () => {
  successButton.addEventListener('click', hideSuccessMessage);
};

function onOutsideClickSuccess (evt) {
  const isOutsideClick = evt.composedPath().includes(successForm.querySelector('.success__inner'));
  if (!isOutsideClick) {
    hideSuccessMessage();
  }
}

function hideErrorMessage() {
  body.removeChild(errorForm);
  body.removeEventListener('keydown', onErrorMessageKeydown);
  document.removeEventListener('click', onOutsideClickError);
}


const closeErrorMessageByClick = () => {
  errorButton.addEventListener('click', hideErrorMessage);
};

function onOutsideClickError (evt) {
  const isOutsideClick = evt.composedPath().includes(errorForm.querySelector('.error__inner'));
  if (!isOutsideClick) {
    hideErrorMessage();
  }
}

const openMessage = (messageForm) => {
  body.appendChild(messageForm);
  if (messageForm === successForm) {
    closeEditFormImage();
    document.addEventListener('keydown', onSuccessMessageKeydown);
    document.addEventListener('click', onOutsideClickSuccess);
  } else {
    body.addEventListener('keydown', onErrorMessageKeydown);
    document.addEventListener('click', onOutsideClickError);
  }
};

const showGetDataError = () => {
  document.body.appendChild(errorTemplate);
  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    document.body.removeChild(errorMessage);
  }, TIMEOUT);
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      buttonSubmit.disabled = true;
      sendData(new FormData(evt.target))
        .then(() => {
          openMessage(successForm);
          closeSuccessMessageByClick();
        })
        .catch(() => {
          openMessage(errorForm);
          closeErrorMessageByClick();
        })
        .finally(() => {
          buttonSubmit.disabled = false;
        });
    }
    removeScaleListeners();
  });
};

export {setUserFormSubmit, closeEditFormImage, showGetDataError};
