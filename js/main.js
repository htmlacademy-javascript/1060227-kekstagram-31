const NAMES = [
  'Ольга',
  'Иван',
  'Елена',
  'Анна',
  'Сергей',
  'Антон',
  'Александр',
  'Полина',
  'Егор',
  'Майя',
  'Кирилл',
  'Наталья',
  'Илья',
  'Маргарита',
  'Макар',
  'Ника',
  'Федор',
  'Ульяна',
  'Алексей',
  'Вера',
  'Василий',
  'Виктория',
  'Валерий',
  'София',
  'Герман',
  'Екатерина',
  'Игорь',
  'Марина',
  'Тимофей',
  'Ирина'
];

const DESCRIPTION_LIST = [
  'Территория отеля',
  'Указатель как дойти до пляжа',
  'Океан',
  'Девушка',
  'Суп',
  'Машина',
  'Клубника на тарелке',
  'Компот в стаканах',
  'Самолет пролетает над пляжем',
  'Обувница',
  'Путь к океану',
  'Машина белая ауди',
  'Овощи и красная рыба',
  'Котик-ролл',
  'Теплые дутики',
  'Самолет в небе',
  'Выступление оркестра',
  'Ретроавтомобиль',
  'Тапочки с фонариками',
  'Пальмы',
  'Салат',
  'Закат на берегу океана',
  'Краб',
  'Концерт',
  'Джип в озере с бегемотом, крокодилом'
];

const MESSAGE_LIST = [
  'Всё отлично! ',
  'В целом всё неплохо. Но не всё. ',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. ',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. ',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. ',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createCounter = () => {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
};

const getIdPhoto = createCounter();
const getIdComment = createCounter();
const getNumberPhoto = createCounter();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomNumberAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;

const getUrlPhoto = (number) => `photos/${number}.jpg`;

const getDescription = (number) => DESCRIPTION_LIST[number - 1];

const getRandomMessage = () => {
  const messageNumber = getRandomInteger(1, 2);
  let newMessage = '';
  let randomMessageIndexOld = -1;
  for (let j = 1; j <= messageNumber; j++) {
    let randomMessageIndexNow = getRandomInteger(0, MESSAGE_LIST.length - 1);
    while (randomMessageIndexNow === randomMessageIndexOld) {
      randomMessageIndexNow = getRandomInteger(0, MESSAGE_LIST.length - 1);
    }
    newMessage += MESSAGE_LIST[randomMessageIndexNow];
    randomMessageIndexOld = randomMessageIndexNow;
  }
  return newMessage;
};

const createComment = () => ({
  id: getIdComment(),
  avatar: getRandomNumberAvatar(),
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => {
  const numberPhoto = getNumberPhoto();
  return {
    id: getIdPhoto(),
    url: getUrlPhoto(numberPhoto),
    description: getDescription(numberPhoto),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};

const PhotosDescription = Array.from({length: 25}, createPhotoDescription);

// console.log(PhotosDescription);
JSON.stringify(PhotosDescription);
