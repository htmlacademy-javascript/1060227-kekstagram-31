import { addScaleListeners, removeScaleListeners } from './scale.js';
import { deleteEffect } from './image-effects.js';
import { sendData } from './api.js';

const COMMENT_LIMIT = 140;
const LIMIT_HASHTAG = 5;
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('.img-upload__input');
const editFormImage = document.querySelector('.img-upload__overlay');
const buttonClose = editFormImage.querySelector('.img-upload__cancel');
const textHashtag = editFormImage.querySelector('.text__hashtags');
const textComment = editFormImage.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');

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
};

buttonClose.addEventListener('click', () => {
  closeEditFormImage();
});

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditFormImage();
    hideSuccessMessage();
  }
}

function onMessageKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    hideErrorMessage();
  }
}

textHashtag.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

textComment.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const validateLengthComment = (comment) => comment.length <= COMMENT_LIMIT;
const validateHashtagLimit = (hashtagList) => hashtagList.split(' ').length <= LIMIT_HASHTAG;
const validateHashtagUniq = (hashtagList) => {
  const hashtagArray = hashtagList.toLowerCase().split(' ');
  const uniqueArray = Array.from(new Set(hashtagArray));
  return hashtagArray.length === uniqueArray.length;
};

const validateHashtag = (hashtagList) => {
  if (hashtagList === '') {
    return true;
  }
  const hashtagArray = hashtagList.split(' ');
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
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
  //successForm.classList.add('hidden');
  body.removeChild(successForm);
  document.removeEventListener('keydown', onDocumentKeydown);
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
  body.removeEventListener('keydown', onMessageKeydown);
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
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onOutsideClickSuccess);
  } else {
    body.addEventListener('keydown', onMessageKeydown);
    document.addEventListener('click', onOutsideClickError);
  }
};


const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      buttonSubmit.disabled = true;
      //buttonSubmit.textContent = 'Cохраняю';
      sendData(new FormData(evt.target))
        .then(() => {
          //openSuccessMessage();
          openMessage(successForm);
          closeSuccessMessageByClick();
        })
        .catch(() => {
          //openErrorMessage();
          openMessage(errorForm);
          closeErrorMessageByClick();
        })
        .finally(() => {
          buttonSubmit.disabled = false;
          //buttonSubmit.textContent = 'Опубликовать';
        });
    }
    removeScaleListeners();
  });
};

export {setUserFormSubmit, closeEditFormImage};
