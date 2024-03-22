const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
//const DEFAULT_VALUE = 100;
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
let scaleValueNumber = parseInt(scaleValue.value, 10);

scaleSmallerButton.addEventListener('click', () => {
  if (scaleValueNumber > MIN_VALUE) {
    scaleValueNumber -= STEP;
    scaleValue.value = `${scaleValueNumber}%`;
    imageUploadPreview.style.transform = `scale(${scaleValueNumber / 100})`;
  }
});

scaleBiggerButton.addEventListener('click', () => {
  if (scaleValueNumber < MAX_VALUE) {
    scaleValueNumber += STEP;
    scaleValue.value = `${scaleValueNumber}%`;
    imageUploadPreview.style.transform = `scale(${scaleValueNumber / 100})`;
  }
});
