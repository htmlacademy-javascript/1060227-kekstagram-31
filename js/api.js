const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// const TIMEOUT = 5000;
// const errorTemplate = document.querySelector('#data-error')?.content;

const getData = () =>fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  });

// .catch(() => {
//   document.body.appendChild(errorTemplate);
//   setTimeout(() => {
//     const errorMessage = document.querySelector('.data-error');
//     document.body.removeChild(errorMessage);
//   }, TIMEOUT);
// });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  });
  // .catch(() => {
  //   throw new Error('Не удалось отправить форму. Попробуйте еще раз');
  // });

export {getData, sendData};
