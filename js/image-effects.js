const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectValueInput = document.querySelector('.effect-level__value');
const effectItem = document.querySelector('.effects__item');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});
