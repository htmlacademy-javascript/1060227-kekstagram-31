const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadImage = document.querySelector('.img-upload__input');
const image = document.querySelector('.img-upload__preview img');
const previews = document.querySelectorAll('.effects__preview');

uploadImage.addEventListener('change', () => {
  const file = uploadImage.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    image.src = URL.createObjectURL(file);
    previews.forEach((preview) => {
      preview.style.backgroundImage = `url(${image.src})`;
    });
  }
});
