const inputFieldSeason = document.querySelector('#season')

const sessionValues = JSON.parse(sessionStorage.getItem('savedValues'));
const stackedValues = sessionValues.reduce((acc, item) => {

  acc.summer += item[0].summer
  acc.fall   += item[0].fall
  acc.winter += item[0].winter
  acc.spring += item[0].spring

  return acc;
}, { summer: 0, fall: 0, winter: 0, spring: 0 });

const largestValue = Math.max(...Object.values(stackedValues))



const quizFinalValue = Object.entries(stackedValues).reduce((acc, [key, value]) => {
  if (value === largestValue) acc[key] = value;
  return acc
}, {});


if (Object.keys(quizFinalValue).length > 1) {
  const keys = Object.keys(quizFinalValue);
  const randomKey = Object.keys(quizFinalValue)[Math.floor(Math.random() * keys.length)];
  delete quizFinalValue[randomKey];
}

inputFieldSeason.value = Object.keys(quizFinalValue).join(',')







const quizList = document.querySelectorAll('.summerh, .fallh, .winterh, .springh, .summert, .fallt, .wintert, .springt')
const quizText = [...quizList]



const appendItems = {
  'summer': {
    append: [quizText[0], quizText[4]],
    removeBelow: [quizText[5], quizText[6], quizText[7]]
  },

  'fall': {
    append: [quizText[1], quizText[5]],
    removeBelow: [quizText[6], quizText[7]]
  },

  'winter': {
    append: [quizText[2], quizText[6]],
    removeBelow: [quizText[7]]
  },

  'spring': {
    append: [quizText[3], quizText[7]]
  }
};




const appendMapping = {
  'summer' : {
      0 : () => appendItems.summer.append.forEach(obj => obj.style.opacity = '1'),
      1 : () => appendItems.summer.removeBelow.forEach(obj => obj.remove()),
  },

  'fall' : {
      0 : () => appendItems.fall.append.forEach(obj => obj.style.opacity = '1'),
      1 : () => appendItems.fall.removeBelow.forEach(obj => obj.remove())
  },

  'winter' : {
      0 : () => appendItems.winter.append.forEach(obj => obj.style.opacity = '1'),
      1 : () => appendItems.winter.removeBelow.forEach(obj => obj.remove())
  },

  'spring' : {
      0 : () => appendItems.spring.append.forEach(obj => obj.style.opacity = '1'),
      1 : () => appendItems.spring.removeBelow?.forEach(obj => obj.remove())
  }
};




Object.keys(quizFinalValue).forEach((key) => {
  appendMapping[key]?.[0]()
  appendMapping[key]?.[1]()
});


if (sessionValues.length === 5) {
  sessionValues.pop();
  sessionStorage.setItem('savedValues', JSON.stringify(sessionValues));
}







// NOTE: перенести проект на github и сервер
