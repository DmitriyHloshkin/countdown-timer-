import { showNoValidAnimation, pulsAnimation } from './general/animation.js';
import { correctOverflow } from './general/general-scripts.js';
import { setStorage, getStorageProp } from './general/localStorage.js';

const counter = (storageState) => {
  const counterState = {
    date: null,
    stopCounter: false,
    nameCounter: '',
  };

  const blockCounter = document.querySelector('.counter'),
        btnStart = blockCounter.querySelector('.counter__start-btn'),
        btnAddDate = blockCounter.querySelector('.dates-list__add'),
        inputDate = blockCounter.querySelector('#select-date'),
        titleElem = blockCounter.querySelector('.counter__title span'),
        dateList = blockCounter.querySelector('.counter .dates-list__list'),
        countdown = blockCounter.querySelector('.countdown');
        
  changeInputDate();
  changeNameCounter();
  startTimer();
  fillDatesList();

  inputDate.addEventListener('change', () => {
    counterState.nameCounter = 'указанной даты';
    pulsAnimation(btnStart);
  });

  btnStart.addEventListener('click', () => {
    if (!inputDate.value) return;
    counterState.date = Date.parse(inputDate.value);
    changeNameCounter();
    
    if (counterState.stopCounter) {
      counterState.stopCounter = false;
      startTimer();
    }

    pulsAnimation(countdown);
  });

  btnAddDate.addEventListener('click', () => {
    if (!addingPermision()) {
      showNoValidAnimation(getEmptyElement(dateList.lastElementChild));
      return;
    }

    addDataListItem();
    correctOverflow();

    function addingPermision() {
      if (dateList.querySelectorAll('li').length === 0) return true;

      return !Array.from(dateList.querySelectorAll('li')).some(listItem => {  
        return !listItem.querySelector('.dates-list__name').value || !listItem.querySelector('.dates-list__date').value;
      });
    }

    function getEmptyElement(parentElement) {
      return !parentElement.querySelector('.dates-list__name').value ? parentElement.querySelector('.dates-list__name') : 
      parentElement.querySelector('.dates-list__date');
    }

  });

  dateList.addEventListener('click', e => {
    const elem = e.target;
    
    if (elem.tagName !== 'svg' && elem.tagName !== 'BUTTON' && elem.tagName !== 'use') return;

    let btn;

    switch (elem.tagName) {
      case('svg'): 
        btn = elem.parentElement;
        break;

      case('use'):
        btn = elem.parentElement.parentElement;
        break;

      default:
        btn = elem;     
    }

    const listItem = btn.parentElement;

    if (btn.classList.contains('dates-list__btn-remove')) { 
      const dateName = listItem.querySelector('.dates-list__name'),
            confirmQuestion = listItem.querySelector('.dates-list__confirm-delete');
      
      dateName.style.display = 'none';
      confirmQuestion.style.display = 'flex';
      
      const btnYes = confirmQuestion.querySelector('.dates-list__yes-delete'),
            btnNo = confirmQuestion.querySelector('.dates-list__no-delete');

      btnYes.addEventListener('click', () => {
        listItem.remove();
        saveDatesListToStorage(); 
      });

      btnNo.addEventListener('click', () => {
        dateName.style.display = 'block';
        confirmQuestion.style.display = 'none';
      });
    
      correctOverflow();
    }

    if(btn.classList.contains('dates-list__btn-select')) {
      const name = listItem.querySelector('.dates-list__name'),
            date = listItem.querySelector('.dates-list__date');

      if (/^\s+$/.test(name.value) || !name.value) {
        showNoValidAnimation(name);
        return;
      }

      if (!date.value) {
        showNoValidAnimation(date);
        return;
      }
      
      changeInputDate(date.value);
      counterState.stopCounter = true;
      counterState.nameCounter = name.value;
      pulsAnimation(btnStart);
      
    }

  });

  function counterInit({selectorDays, selectorHours, selectorMinutes, selectorSeconds, circle}) {
    const elemDays = document.querySelector(selectorDays),
          elemHours = document.querySelector(selectorHours),
          elemMinutes = document.querySelector(selectorMinutes),
          elemSeconds = document.querySelector(selectorSeconds);

    const remainingTime = getTimeRemaining();

    changeCounterCircle({...remainingTime, ...circle});

    elemDays.textContent     = remainingTime.days < 10 ? `0${remainingTime.days}` : remainingTime.days;
    elemHours.textContent    = remainingTime.hours < 10 ? `0${remainingTime.hours}` : remainingTime.hours;
    elemMinutes.textContent  = remainingTime.minutes < 10 ? `0${remainingTime.minutes}` : remainingTime.minutes;
    elemSeconds.textContent  = remainingTime.seconds < 10 ? `0${remainingTime.seconds}` : remainingTime.seconds;

    function getTimeRemaining() {
      let timeToStop = +new Date(counterState.date);
      
      const diffDateInSec = ( timeToStop - Date.now() ) / 1000;
      let days, hours, minutes, seconds;
      
      if (diffDateInSec <= 0) {
        days = 0; 
        hours = 0; 
        minutes = 0; 
        seconds = 0;
        counterState.stopCounter = true;
  
      } else {
        days = Math.floor( ( (diffDateInSec / 60 / 60) / 24) );
        hours =  Math.floor( ( (diffDateInSec / 60 / 60) % 24) );
        minutes = Math.floor( (diffDateInSec / 60) % 60 );
        seconds = Math.floor( diffDateInSec % 60 );
      }
  
      return {
        days,
        hours,
        minutes,
        seconds
      };
    }
  
    function changeCounterCircle({days, hours, minutes, seconds, circleSeconds, circleMinutes, circleHours, circleDays }) {
      const elemCircleSec = document.querySelector(circleSeconds),
            elemCircleMin = document.querySelector(circleMinutes),
            elemCircleHour = document.querySelector(circleHours),
            elemCircleDay = document.querySelector(circleDays);
  
      elemCircleSec.style.strokeDasharray = `${seconds} 60`;
      elemCircleMin.style.strokeDasharray = `${minutes} 60`;
      elemCircleHour.style.strokeDasharray = `${60 / 24 * hours} 60`;
      elemCircleDay.style.strokeDasharray = `${60 / 365 * days} 60`;
    }
  }

  function startTimer() {
    const counterId = setInterval(() => {
      if (counterState.stopCounter) {
        clearInterval(counterId);
        return;
      }
        counterInit({
          selectorDays: '#days',
          selectorHours: '#hours',
          selectorMinutes: '#minutes',
          selectorSeconds: '#seconds',
          circle: {
            circleSeconds: '.circle__segment-seconds',
            circleMinutes: '.circle__segment-minutes',
            circleHours: '.circle__segment-hours',
            circleDays: '.circle__segment-days',
          },
        }); 
    }, 1000);
  }

  function changeNameCounter() {
    titleElem.textContent = !counterState.nameCounter ? 'конца дня' : counterState.nameCounter; 
  }

  function changeInputDate(date) {
    const endDay = new Date(new Date().setUTCHours(23, 59, 59)).toJSON().replace(/\..+/, '');
    
    inputDate.value = date || endDay;
    counterState.date =  date || endDay;
  }
  
  function fillDatesList() {
    if (!getStorageProp('dateList') ) return;

    getStorageProp('dateList').forEach(obj => {
      addDataListItem(obj.name, obj.date); 
    });

  }

  function addDataListItem(name = '', date= '') {
    const listItem = document.createElement('li');

    listItem.classList.add('dates-list__item');
    
    listItem.innerHTML = `
        <button class="dates-list__btn-remove main-btn" title="удалить дату">
          <svg class="dates-list__svg dates-list__svg-mr0">
            <use xlink:href="./img/dates-list/dates-list-sprint.svg#minus"></use>
          </svg>
        </button>

        <input type="text" class="dates-list__name" maxlength="25" value="${name}">

        <div class="dates-list__confirm-delete">
          <span>Желаете удалить дату?</span>
          <button class="dates-list__yes-delete main-btn">Да</button>
          <button class="dates-list__no-delete main-btn">Нет</button>
        </div>

        <input type="datetime-local" class="dates-list__date" value="${date}">

        <button class="dates-list__btn-select main-btn" title="установить дату">
          <svg class="dates-list__svg dates-list__svg-mr0">
            <use xlink:href="./img/dates-list/dates-list-sprint.svg#select"></use>
          </svg>
        </button>`;

    dateList.append(listItem);
    addListenerForStorageDates();

    function addListenerForStorageDates() {
      const names = blockCounter.querySelectorAll('.dates-list__name'),
            dates = blockCounter.querySelectorAll('.dates-list__date');
  
      [...names, ...dates].forEach(elem => elem.addEventListener('input', saveDatesListToStorage));
      
    }
  }

  function saveDatesListToStorage() {
    const dateListItems = Array.from(blockCounter.querySelectorAll('li'));
        
    const datesList = dateListItems.map(elem => {
      return {
        name: elem.querySelector('.dates-list__name').value,
        date: elem.querySelector('.dates-list__date').value,
      };
    });
    
    storageState.dateList = datesList; 
    setStorage(storageState);
  }

};

export default counter;