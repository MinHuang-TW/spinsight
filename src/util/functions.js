import appearance from '../images/category/appearance.png';
import belongings from '../images/category/belongings.png';
import character from '../images/category/character.png';
import life from '../images/category/life.png';
import limited from '../images/category/limited.png';
import permanent from '../images/category/permanent.png';
import warning from '../images/category/warning.png';
import OK from '../images/category/OK.png';

export const fetchIcon = (category) => {
  switch (category) {
    case 'appearance':
      return appearance;
    case 'belongings':
      return belongings;
    case 'character':
      return character;
    case 'life':
      return life;
    case 'limited':
      return limited;
    case 'permanent':
      return permanent;
    case 'OK':
      return OK;
    case 'warning':
      return warning;

    default:
      break;
  }
};

export const fetchCategory = (randomNumber) => {
  switch (randomNumber) {
    case 0:
      return 'appearance';
    case 1:
      return 'limited';
    case 2:
      return 'character';
    case 3:
      return 'life';
    default:
    case 4:
      return 'permanent';
    case 5:
      return 'belongings';
  }
};

export const categories = [
  'appearance',
  'belongings',
  'character',
  'life',
  'permanent',
  'limited',
];

export const randomize = (number) => Math.floor(Math.random() * number);

export const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const getRotation = (number) => 2160 + number * 60;

export const count = (data, type) =>
  data.filter(({ category }) => category === type).length;
