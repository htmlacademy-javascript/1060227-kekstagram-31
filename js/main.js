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
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
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
const getUrl = createCounter();

const createComment = () => {
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  const messageNumber = getRandomInteger(1, 2);
  let newMessage = '';
  let randomMessageIndexOld = -1;
  //  Проверка на уникальность второго предложения в message (по заданию должно выводиться сообщение либо из одного, либо из двух случайных предложений)
  for (let j = 1; j <= messageNumber; j++) {
    let randomMessageIndexNow = getRandomInteger(0, MESSAGE_LIST.length - 1);
    while (randomMessageIndexNow === randomMessageIndexOld) {
      randomMessageIndexNow = getRandomInteger(0, MESSAGE_LIST.length - 1);
    };
    newMessage += MESSAGE_LIST[randomMessageIndexNow] + ' ';
    randomMessageIndexOld = randomMessageIndexNow;
  };
  return {
    id: getIdComment(),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: newMessage,
    name: NAMES[randomNameIndex],
  };
};

const createPhotoDescription = () => {
  const i = getUrl();
  return {
    id: getIdPhoto(),
    url: 'photos/' + i + '.jpg',
    description: DESCRIPTION_LIST[i - 1],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};

const PhotosDescription = Array.from({length: 25}, createPhotoDescription);

console.log(JSON.stringify(PhotosDescription));
