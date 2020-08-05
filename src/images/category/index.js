import appearance from './appearance.png';
import belongings from './belongings.png';
import character from './character.png';
import life from './life.png';
import limited from './limited.png';
import permanent from './permanent.png';
import warning from './warning.png';
import OK from './OK.png';

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
