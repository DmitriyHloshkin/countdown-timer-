// class Counter {
//   stopCounter = false;

//   constructor({
//     selectorDays,
//     selectorHours,
//     selectorMinutes,
//     selectorSeconds,
//     timeToStop,
//     circle,
//   }) {
//     this.elemDays = document.querySelector(selectorDays);
//     this.elemHours = document.querySelector(selectorHours);
//     this.elemMinutes = document.querySelector(selectorMinutes);
//     this.elemSeconds = document.querySelector(selectorSeconds);
//     this.circle = circle;
//     this.timeToStop = Date.parse(timeToStop);
//   }

//   init() {
//     const timeRemaining = this.#getTimeRemaining();
//     this.#changeCounterCircle({ ...timeRemaining, ...this.circle});
    
//     this.elemDays.textContent     = timeRemaining.days < 10 ? `0${timeRemaining.days}` : timeRemaining.days;
//     this.elemHours.textContent    = timeRemaining.hours < 10 ? `0${timeRemaining.hours}` : timeRemaining.hours;
//     this.elemMinutes.textContent  = timeRemaining.minutes < 10 ? `0${timeRemaining.minutes}` : timeRemaining.minutes;
//     this.elemSeconds.textContent  = timeRemaining.seconds < 10 ? `0${timeRemaining.seconds}` : timeRemaining.seconds;

//   }

//   #getTimeRemaining() {
//     const diffDateInSec = ( this.timeToStop - Date.now() ) / 1000;
//     let days, hours, minutes, seconds;
    
//     if (diffDateInSec <= 0) {
//       days = 0; 
//       hours = 0; 
//       minutes = 0; 
//       seconds = 0;
//       this.stopCounter = true;

//     } else {
//       days = Math.floor( ( (diffDateInSec / 60 / 60) / 24) );
//       hours =  Math.floor( ( (diffDateInSec / 60 / 60) % 24) );
//       minutes = Math.floor( (diffDateInSec / 60) % 60 );
//       seconds = Math.floor( diffDateInSec % 60 );
//     }

//     return {
//       days,
//       hours,
//       minutes,
//       seconds
//     };
//   }

//   #changeCounterCircle({days, hours, minutes, seconds, circleSeconds, circleMinutes, circleHours, circleDays }) {
//     const elemCircleSec = document.querySelector(circleSeconds),
//           elemCircleMin = document.querySelector(circleMinutes),
//           elemCircleHour = document.querySelector(circleHours),
//           elemCircleDay = document.querySelector(circleDays);

//     elemCircleSec.style.strokeDasharray = `${seconds} 60`;
//     elemCircleMin.style.strokeDasharray = `${minutes} 60`;
//     elemCircleHour.style.strokeDasharray = `${60 / 24 * hours} 60`;
//     elemCircleDay.style.strokeDasharray = `${60 / 365 * days} 60`;
//   }

// }

// export default ({ selectorDays, selectorHours, selectorMinutes, selectorSeconds, timeToStop, circle , descr }) => {
//   const endDay = new Date().setHours(23, 59, 59, 999),
//         selectDateBtn = document.querySelector('.select-date__btn');

//   const counter = new Counter({
//     selectorDays: selectorDays ?? '#days',
//     selectorHours: selectorHours ?? '#hours',
//     selectorMinutes: selectorMinutes ?? '#minutes',
//     selectorSeconds: selectorSeconds ?? '#seconds',
//     timeToStop: timeToStop ?? new Date(endDay),
//     circle,
//   });

//   counter.init();
//   displayEndDayDate(); 
//   startTimer(); 

//   selectDateBtn.addEventListener("click", () => {
//     let enterDate = document.querySelector('.select-date__inp').value,
//         headerTitle = 'До указанной даты осталось';

//     if (!enterDate) {
//       enterDate = endDay;
//       headerTitle = "До конца дня осталось";
//     }

//     const newDate = new Date(enterDate);
//     counter.timeToStop = newDate;

//     if (counter.stopCounter) {
//       counter.stopCounter = false;
//       startTimer(); 
//     }

//     changeHeaderTitle(headerTitle); 
//   });

//   function startTimer() {
//     const counterId = setInterval(() => {
//       if (counter.stopCounter) {
//         clearInterval(counterId);
//         return;
//       }
//       counter.init();
//     }, 1000);
//   }

//   function changeHeaderTitle(str) {
//     document.querySelector('.header__title').textContent = str;
//   }

//   function displayEndDayDate() {
//     const elemDateInp = document.querySelector('.select-date__inp'),
//           endDay = new Date().setUTCHours(23, 59, 59, 999);
    
//     elemDateInp.value = new Date(endDay).toISOString().replace(/:.{2}\..{4}/,'');
//   }

// };