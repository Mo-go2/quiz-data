import { nameValue } from './surveyForm.js'

let qtitle = document.querySelector('.qtitle');
let buttons = document.querySelector('#buttons')


qtitle.style.userSelect = 'none';


let qcollumn = document.querySelector('.qno-img');
try {
  qcollumn.style.fontSize = '36px';
} catch (error) {
  switch (error.name) {
    case "TypeError":
    qcollumn = console.log
      break;
 }
}

let agreementtext = document.querySelector('#cagreement');
try {
  agreementtext.style.fontSize = '10px';
} catch (error) {
  switch (error.name) {
    case "TypeError":
    agreementtext = console.log
      break;
 }
}



let listenerHappend = false
let savedName = ''
let savedPhone = ''

if (window.location.pathname.includes('html/surveyForm.html') && nameValue.length !== 15) {


let onetimeUse = [0, 0, 0, 0, 0, 0, 0, 0]



let arrPhone = []
arrPhone[0] = document.getElementById('name')
arrPhone[1] = document.getElementById('phone');
arrPhone[2] = listenerHappend;
arrPhone[3] = document.getElementById('submitbutton');


let previousLength = 0
let currentCursor = arrPhone[1].selectionStart;
let savedValue = ''


function correctChars() {
  arrPhone[1].addEventListener('focus', function() {
    let value = arrPhone[1].value

    if (value.length == 0) value = `+7 () - -${value}`;

if (onetimeUse[0] === 0) {
  setTimeout(function () {
      arrPhone[1].setSelectionRange(4, 4);
      onetimeUse[0]++
    }, 5)
};


    addEventListener('keypress', e => {
      if (e.target !== arrPhone[1]) return;

      if (!/\d/.test(e.key))

        e.preventDefault();
        listenerHappend = true

});

arrPhone[1].value = value
  });
};



function replaceCursor() {

arrPhone[1].addEventListener('input', e => {
  let value = arrPhone[1].value
  let currentLength = value.length

 if (currentLength < previousLength) {
   valueCounter = Math.max(0, valueCounter - 1);
  } else if (currentLength > previousLength) {
    currentLength++;
  };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  switch (currentLength) {

    case 13:
 switch (onetimeUse[2]) {
   case 0:
      setTimeout(function() {
        arrPhone[1].setSelectionRange(9, 9)
      }, 10);
      delay(100).then(onetimeUse[2] = 1)
      .catch(error => console.error(error))
     break;
 }
    break;


    case 16:
switch (onetimeUse[1]) {
  case 0:
    setTimeout(function() {
      arrPhone[1].value = `${value.slice(0, 100)}`

      setTimeout(function() {
        arrPhone[1].setSelectionRange(13, 14);
        onetimeUse[1]++
      }, 5);
    }, 5);

    const keyupHandler = e => {
      if (onetimeUse[1] === 1) {
        onetimeUse[1]--;

        removeEventListener('input', keyupHandler);
      }
    };

    addEventListener('input', keyupHandler);
    break;
}
      break;


    case 17:
      setTimeout(function() {
        arrPhone[1].setSelectionRange(18, 18);
      }, 10);
      break;
      default:
  };

  if (currentLength == 0) {
    setTimeout(e => {
      currentLength++
    }, 5)
  };
});
};



function returningChars() {

arrPhone[1].addEventListener('keyup', e => {
  let value = arrPhone[1].value;

if (arrPhone[1].value.length > 0) {

    savedValue = arrPhone[1].value
};

});


  arrPhone[1].addEventListener('input', e => {
    let value = arrPhone[1].value;

    if (!value.includes('+') ||
    !value.includes('(') ||
    !value.includes(')') ||
    (value.match(/-/g) || []).length < 2 ||
    (value.match(/ /g) || []).length < 2)
     {
       arrPhone[1].value = savedValue
     }
  });


addEventListener('input', e => {
if (e.target !== arrPhone[1]) return;

if (arrPhone[1].value.length == 0) {
 arrPhone[1].value = `+7 () - -${arrPhone[1].value}`
    }

if (arrPhone[1].value.length > 18) {
 arrPhone[1].value = savedValue
    }
  });
};



let alertName = document.createElement('div')
alertName.textContent = 'Минимум 5 символов'
alertName.className = 'alertname'
alertName.style.userSelect = 'none'

let alertPhone = document.createElement('div')
alertPhone.textContent = 'Вы не до конца заполнили поле'
alertPhone.className = 'alertphone'
alertPhone.style.userSelect = 'none'


function saveValues() {
  arrPhone[0].addEventListener('blur', e => {
    if (arrPhone[0].value.length >= 4) {savedName = arrPhone[0].value
  } else {
    document.body.appendChild(alertName);
  }


if (document.body.contains(alertName) && arrPhone[0].value.length >= 4) {
  alertName.remove()
  }
});



  arrPhone[1].addEventListener('blur', e => {
    if (arrPhone[1].value.length == 18) {savedPhone = arrPhone[1].value
    } else {
      document.body.appendChild(alertPhone);
    }

    if (document.body.contains(alertPhone) && arrPhone[1].value.length == 18) {
      alertPhone.remove();
    }
  });


  arrPhone[3].addEventListener('click', function submit(e) {
    switch ('') {
      case savedName:
        e.preventDefault();
        break;
      case savedPhone:
        e.preventDefault();
        break;
    }
  });
};







function submitForm(e) {
e.preventDefault()

const form = document.querySelector('.survey');
const formData = new FormData(form)


  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
.then(response => response.json())
.then(data => {
console.log(data);
})

.catch(error => {
  console.error(error)
})
};


document.querySelector('.survey').addEventListener('submit', submitForm);



correctChars();
returningChars();
replaceCursor();

saveValues();
};
