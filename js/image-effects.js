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

const DEFAULT_FILTER = 'none';
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectValueInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');

noUiSlider.create(effectLevelSlider, {
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
      imageUploadPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imageUploadPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imageUploadPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imageUploadPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imageUploadPreview.style.filter = `brightness(${value})`;
      break;
    case 'none':
    default:
      effectLevelContainer.classList.add('hidden');
      imageUploadPreview.style.filter = '';
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  const newValueSlider = effectLevelSlider.noUiSlider.get();
  effectValueInput.value = newValueSlider;
  applyFilter(newValueSlider);
});

effectsList.addEventListener('click', (evt) => {
  currentFilterValue = evt.target.value;

  if (!currentFilterValue) {
    return;
  }

  if (currentFilterValue === DEFAULT_FILTER) {
    applyFilter();
  } else {
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(effects[currentFilterValue]);
  }
});

const deleteEffect = () => {
  currentFilterValue = DEFAULT_FILTER;
  applyFilter();
};

export {deleteEffect};
