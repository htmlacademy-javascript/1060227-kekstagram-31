import { addScaleListeners, removeScaleListeners } from './scale.js';
import { deleteEffect } from './image-effects.js';
import { sendData } from './api.js';
import {isEscapeKey} from './util.js';

const COMMENT_LIMIT = 140;
const LIMIT_HASHTAG = 5;
const TIMEOUT = 5000;
const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadButtonElement = document.querySelector('.img-upload__input');
const editFormImageElement = document.querySelector('.img-upload__overlay');
const buttonCloseElement = editFormImageElement.querySelector('.img-upload__cancel');
const textHashtagElement = editFormImageElement.querySelector('.text__hashtags');
const textCommentElement = editFormImageElement.querySelector('.text__description');
const buttonSubmitElement = document.querySelector('.img-upload__submit');
const errorTemplateElement = document.querySelector('#data-error')?.content;

const successFormTemplateElement = document.querySelector('#success')?.content?.querySelector('.success');
const successFormElement = successFormTemplateElement.cloneNode(true);
const successButtonElement = successFormElement.querySelector('.success__button');

const errorFormTemplateElement = document.querySelector('#error')?.content?.querySelector('.error');
const errorFormElement = errorFormTemplateElement.cloneNode(true);
const errorButtonElement = errorFormElement.querySelector('.error__button');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
});


uploadButtonElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  addScaleListeners();
  editFormImageElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  deleteEffect();
});

const closeEditFormImage = () => {
  editFormImageElement.classList.add('hidden');
  uploadButtonElement.value = '';
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formElement.reset();
  pristine.reset();
};

buttonCloseElement.addEventListener('click', () => {
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
    onErrorMessageClose();
  }
}

function onSuccessMessageKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    onSuccessMessageClose();
  }
}

textHashtagElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textCommentElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const validateLengthComment = (comment) => comment.length <= COMMENT_LIMIT;
const validateHashtagLimit = (hashtagsList) => {
  let hashtagsArray = hashtagsList.trim().split(' ');
  hashtagsArray = hashtagsArray.filter((hashtag) => hashtag !== '');

  return hashtagsArray.length <= LIMIT_HASHTAG;
};

const validateHashtagUniq = (hashtagsList) => {
  let hashtagsArray = hashtagsList.toLowerCase().trim().split(' ');
  hashtagsArray = hashtagsArray.filter((hashtag) => hashtag !== '');
  const hashtagsUniqueArray = Array.from(new Set(hashtagsArray));
  return hashtagsArray.length === hashtagsUniqueArray.length;
};

const validateHashtag = (hashtagsList) => {
  if (hashtagsList === '') {
    return true;
  }
  let hashtagsArray = hashtagsList.trim().split(' ');
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  hashtagsArray = hashtagsArray.filter((hashtag) => hashtag !== '');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!hashtagRegex.test(hashtagsArray[i])) {
      return false;
    }
  }
  return true;
};


pristine.addValidator(textCommentElement, validateLengthComment, 'Длина комментария больше 140 символов');
pristine.addValidator(textHashtagElement, validateHashtagLimit, 'Превышено количество хэштегов');
pristine.addValidator(textHashtagElement, validateHashtagUniq, 'Хэштеги повторяются');
pristine.addValidator(textHashtagElement, validateHashtag, 'Введён невалидный хэштег');

function onSuccessMessageClose() {
  bodyElement.removeChild(successFormElement);
  document.removeEventListener('keydown', onSuccessMessageKeydown);
  document.removeEventListener('click', onOutsideClickSuccess);
}

const closeSuccessMessageByClick = () => {
  successButtonElement.addEventListener('click', onSuccessMessageClose);
};

function onOutsideClickSuccess (evt) {
  const isOutsideClick = evt.composedPath().includes(successFormElement.querySelector('.success__inner'));
  if (!isOutsideClick) {
    onSuccessMessageClose();
  }
}

function onErrorMessageClose() {
  bodyElement.removeChild(errorFormElement);
  bodyElement.removeEventListener('keydown', onErrorMessageKeydown);
  document.removeEventListener('click', onOutsideClickError);
}


const closeErrorMessageByClick = () => {
  errorButtonElement.addEventListener('click', onErrorMessageClose);
};

function onOutsideClickError (evt) {
  const isOutsideClick = evt.composedPath().includes(errorFormElement.querySelector('.error__inner'));
  if (!isOutsideClick) {
    onErrorMessageClose();
  }
}

const openMessage = (messageForm) => {
  bodyElement.appendChild(messageForm);
  if (messageForm === successFormElement) {
    closeEditFormImage();
    document.addEventListener('keydown', onSuccessMessageKeydown);
    document.addEventListener('click', onOutsideClickSuccess);
  } else {
    bodyElement.addEventListener('keydown', onErrorMessageKeydown);
    document.addEventListener('click', onOutsideClickError);
  }
};

const showGetDataError = () => {
  document.body.appendChild(errorTemplateElement);
  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    document.body.removeChild(errorMessage);
  }, TIMEOUT);
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      buttonSubmitElement.disabled = true;
      sendData(new FormData(evt.target))
        .then(() => {
          openMessage(successFormElement);
          closeSuccessMessageByClick();
        })
        .catch(() => {
          openMessage(errorFormElement);
          closeErrorMessageByClick();
        })
        .finally(() => {
          buttonSubmitElement.disabled = false;
        });
    }
    removeScaleListeners();
  });
};

export {setUserFormSubmit, closeEditFormImage, showGetDataError};
