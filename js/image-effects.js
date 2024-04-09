const DEFAULT_FILTER = 'none';

const effects = {
  chrome: {range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  },

  sepia: {range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  },

  marvin: {range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  },

  phobos: {range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  },

  heat: {range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  },
};
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectValueInputElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects');

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let currentFilterValue;

const applyFilter = (value) => {
  switch (currentFilterValue) {
    case 'chrome':
      imageUploadPreviewElement.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imageUploadPreviewElement.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imageUploadPreviewElement.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imageUploadPreviewElement.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imageUploadPreviewElement.style.filter = `brightness(${value})`;
      break;
    case 'none':
    default:
      effectLevelContainerElement.classList.add('hidden');
      imageUploadPreviewElement.style.filter = '';
  }
};

effectLevelSliderElement.noUiSlider.on('update', () => {
  const newValueSlider = effectLevelSliderElement.noUiSlider.get();
  effectValueInputElement.value = newValueSlider;
  applyFilter(newValueSlider);
});

effectsListElement.addEventListener('click', (evt) => {
  currentFilterValue = evt.target.value;

  if (!currentFilterValue) {
    return;
  }

  if (currentFilterValue === DEFAULT_FILTER) {
    applyFilter();
  } else {
    effectLevelContainerElement.classList.remove('hidden');
    effectLevelSliderElement.noUiSlider.updateOptions(effects[currentFilterValue]);
  }
});

const deleteEffect = () => {
  currentFilterValue = DEFAULT_FILTER;
  applyFilter();
};

export {deleteEffect};
