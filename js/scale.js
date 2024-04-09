const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;
const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
let scaleValueNumber = parseInt(scaleValueElement.value, 10);

const editScale = () => {
  scaleValueElement.value = `${scaleValueNumber}%`;
  imageUploadPreviewElement.style.transform = `scale(${scaleValueNumber / 100})`;
};

const onReduceButtonClick = () => {
  if (scaleValueNumber > MIN_VALUE) {
    scaleValueNumber -= STEP;
    editScale();
  }
};

const onIncreaseButtonClick = () => {
  if (scaleValueNumber < MAX_VALUE) {
    scaleValueNumber += STEP;
    editScale();
  }
};

const addScaleListeners = () => {
  imageUploadPreviewElement.style.transform = `scale(${DEFAULT_VALUE / 100})`;
  scaleSmallerButtonElement.addEventListener('click', onReduceButtonClick);
  scaleBiggerButtonElement.addEventListener('click', onIncreaseButtonClick);
};

const removeScaleListeners = () => {
  scaleSmallerButtonElement.removeEventListener('click', onReduceButtonClick);
  scaleBiggerButtonElement.removeEventListener('click', onIncreaseButtonClick);
};

export {addScaleListeners, removeScaleListeners};
