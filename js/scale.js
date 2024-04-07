const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;
const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
let scaleValueNumber = parseInt(scaleValueElement.value, 10);

const changeSizePhoto = () => {
  imageUploadPreviewElement.style.transform = `scale(${scaleValueNumber / 100})`;
};

const onSmallerButtonClick = () => {
  if (scaleValueNumber > MIN_VALUE) {
    scaleValueNumber -= STEP;
    scaleValueElement.value = `${scaleValueNumber}%`;
    changeSizePhoto();
  }
};

const onBiggerButtonClick = () => {
  if (scaleValueNumber < MAX_VALUE) {
    scaleValueNumber += STEP;
    scaleValueElement.value = `${scaleValueNumber}%`;
    changeSizePhoto();
  }
};

const addScaleListeners = () => {
  imageUploadPreviewElement.style.transform = `scale(${DEFAULT_VALUE / 100})`;
  scaleSmallerButtonElement.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

const removeScaleListeners = () => {
  scaleSmallerButtonElement.removeEventListener('click', onSmallerButtonClick);
  scaleBiggerButtonElement.removeEventListener('click', onBiggerButtonClick);
};

export {addScaleListeners, removeScaleListeners};
