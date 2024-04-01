const TIMEOUT = 5000;
const errorTemplate = document.querySelector('#data-error')?.content;

const getData = () =>fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })

  .catch(() => {
    document.body.appendChild(errorTemplate);
    setTimeout(() => {
      const errorMessage = document.querySelector('.data-error');
      document.body.removeChild(errorMessage);
    }, TIMEOUT);
  });

const sendData = (body) => fetch(
  'https://31.javascript.htmlacademy.pro/kekstaram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте еще раз');
  });

export {getData, sendData};
