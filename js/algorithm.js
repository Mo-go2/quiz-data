const title = document.querySelector('.title')
if (title) title.style.userSelect = 'none';

document.addEventListener('DOMContentLoaded', e => {
  let choice = document.querySelectorAll('.choice, .choice1, .choice2, .choice3, .choice4,  .choice5, .choice6, .choice7, .choice8, .choice9, .choice_, .choice_1, .choice_2, .choice_3, .choice_4, .choice_5, .choice_6, .choice_7, .choice_8')

let arrChoice = [...choice];

let results = [
  {summer: 0, fall: 0, winter: 0, spring: 0}
];

const savedResultsState = [
  { summer: 0 },
  { fall: 0 },
  { winter: 0 },
  { spring: 0 }
];

const choiceMappings = {
  'index': 'choice',
  'page1': 'choice4',
  'page2': 'choice8',
  'page3': 'choice_1',
  'page4': 'choice_5'
};

let page = window.location.pathname;
page == '/html/' ? page = '/html/index.html' : '/html/'

let savedValues = []
function savingValue() {

    if (page.includes('index')) {
      savedValues[0] = results
    }

    if (page.includes('page1')) {
      savedValues[1] = results
    }

    if (page.includes('page2')) {
      savedValues[2] = results
    }

    if (page.includes('page3')) {
      savedValues[3] = results
    }

    if (page.includes('page4')) {
      savedValues[4] = results
    }

};



const resultsValues = {
  choice: [
    { summer: 1, fall: 0, winter: 0, spring: 1 },
    { summer: 0, fall: 1, winter: 0, spring: 2 },
    { summer: 0, fall: 0, winter: 2, spring: 0 },
    { summer: 0, fall: 2, winter: 0, spring: 0 }
  ],

  choice4: [
    { summer: 2, fall: 0, winter: 0, spring: 0 },
    { summer: 0, fall: 1, winter: 0, spring: 1 },
    { summer: 0, fall: 0, winter: 2, spring: 0 },
    { summer: 0, fall: 1, winter: 1, spring: 0 }
  ],

  choice8: [
    { summer: 1, fall: 0, winter: 0, spring: 1 },
    { summer: 2, fall: 0, winter: 0, spring: 0 },
    { summer: 0, fall: 1, winter: 1, spring: 1 }
  ],

  choice_1: [
    { summer: 1, fall: 0, winter: 0, spring: 1 },
    { summer: 1, fall: 1, winter: 0, spring: 0 },
    { summer: 0, fall: 0, winter: 1, spring: 0 },
    { summer: 0, fall: 1, winter: 1, spring: 1 }
  ],

  choice_5: [
    { summer: 0, fall: 0, winter: 0, spring: 1 },
    { summer: 1, fall: 0, winter: 0, spring: 1 },
    { summer: 1, fall: 0, winter: 1, spring: 0 },
    { summer: 0, fall: 1, winter: 1, spring: 0 }
  ]
};





function clearValues() {
  results.forEach(obj => {
    let keys = Object.keys(obj)

  keys.forEach(key => obj[key] = 0)

  results = savedResultsState.map(obj => ({ ...obj }));
});
};



let matchingKey = Object.keys(choiceMappings).find(key => page.includes(key));

if (matchingKey && !page.includes('page3')) {


  function changePriority(className, value) {
  arrChoice.forEach((arr, index) => {
    arr.addEventListener('change', e => {
      clearValues()

      if (arr.checked) {
        selectedValue = value[index]
        Object.assign(results[index], selectedValue)
        results = results.filter(obj => Object.keys(obj).length > 1);
      };


      savingValue()
    });
  })
  };


} else if (page.includes('page3')) {


  function changePriorityCheckbox(className, value) {

    arrChoice.forEach((arr, index) => {
      arr.addEventListener('change', e => {


          Object.keys(results[0]).forEach(key => {
            const selectedValue = value[index]


            if (selectedValue[key] !== undefined) {
              results[0][key] += arr.checked ? selectedValue[key] : -selectedValue[key]
            }
          });

      savingValue()
    });
  })
  };


};




try {
  if (matchingKey) {
    changePriority(choice, resultsValues[choiceMappings[matchingKey]]);
  };
} catch (error) {};


if (page.includes('page3')) {
  changePriorityCheckbox(choice, resultsValues['choice_1']);
};










const alertNext = document.querySelector('.alertnext')
const alertNextIndex = document.querySelector('.alertnextindex')

const next = document.querySelector('.next')
const back = document.querySelector('.back')

const saveMappings = {
  'index': 0,
  'page1': 1,
  'page2': 2,
  'page3': 3,
  'page4': 4
};

const matchingKeySession = Object.keys(saveMappings).find(key => page.includes(key));

let savedData = JSON.parse(sessionStorage.getItem('savedValues')) || [];
sessionStorage.setItem('savedValues', JSON.stringify(savedData))
sessionStorage.setItem('compareValues', JSON.stringify(savedData))

let savedValuesSession = JSON.parse(sessionStorage.getItem('savedValues'))
let compareValuesSession = JSON.parse(sessionStorage.getItem('compareValues'))






function correctSession() {


  next.addEventListener('click', e => {
  if (matchingKeySession) {

let savedValuesSession = JSON.parse(sessionStorage.getItem('savedValues'))
let compareValuesSession = JSON.parse(sessionStorage.getItem('compareValues'))

    if (JSON.stringify(savedValuesSession) === JSON.stringify(compareValuesSession)) {
      e.preventDefault();
      page.includes('index') ? alertNextIndex.style.opacity = '1' : alertNext.style.opacity = '1'
      return;
    }

  };
  });


  if (back) {
    back.addEventListener('click', e => {
      savedData.pop();
      sessionStorage.setItem('savedValues', JSON.stringify(savedData))
    });
  }


};



let removeLastChoiceAllowed = false
let checkCount = 0

arrChoice.forEach((arr, index) => {
  arr.addEventListener('change', e => {
    let savedData = JSON.parse(sessionStorage.getItem('savedValues')) || [];

    const index = saveMappings[matchingKeySession]
    const savedChoice = savedValues[index] || {};



      checkCount++
      if (checkCount >= 2 && !page.includes('page3')) {
        removeLastChoiceAllowed = true;
      }

      if (removeLastChoiceAllowed) {
        savedData.splice(-1, 1)
      }



      if (!page.includes('page3')) {

        savedData.push(savedChoice)
        savedData = savedData.filter(obj => obj !== null)
        sessionStorage.setItem('savedValues', JSON.stringify(savedData))

      } else {

        savedData[3] = savedChoice
        sessionStorage.setItem('savedValues', JSON.stringify(savedData))

      }





  })
})


correctSession()
});
