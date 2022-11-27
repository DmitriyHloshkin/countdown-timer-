class Counter {
  #timeZoneOffsetInMs = new Date().getTimezoneOffset() * 60 * 1000;
  stopCounter = false;

  constructor({
    selectorDays,
    selectorHours,
    selectorMinutes,
    selectorSeconds,
    timeToStop
  }) {
    this.elemDays = document.querySelector(selectorDays);
    this.elemHours = document.querySelector(selectorHours);
    this.elemMinutes = document.querySelector(selectorMinutes);
    this.elemSeconds = document.querySelector(selectorSeconds);
    this.timeToStop = Date.parse(timeToStop) + this.#timeZoneOffsetInMs;
  }

  init() {
    const timeRemaining = this.#getTimeRemaining();
    this.elemDays.textContent     = timeRemaining.days < 10 ? `0${timeRemaining.days}` : timeRemaining.days;
    this.elemHours.textContent    = timeRemaining.hours < 10 ? `0${timeRemaining.hours}` : timeRemaining.hours;
    this.elemMinutes.textContent  = timeRemaining.minutes < 10 ? `0${timeRemaining.minutes}` : timeRemaining.minutes;
    this.elemSeconds.textContent  = timeRemaining.seconds < 10 ? `0${timeRemaining.seconds}` : timeRemaining.seconds;

  }

  #getTimeRemaining() {
    const diffDateInSec = ( this.timeToStop - Date.now() ) / 1000;
    let days, hours, minutes, seconds;
    
    if (diffDateInSec <= 0) {
      days = 0; 
      hours = 0; 
      minutes = 0; 
      seconds = 0;
      this.stopCounter = true;

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

}

export default ({ selectorDays, selectorHours, selectorMinutes, selectorSeconds, timeToStop}) => {
  const endDay = new Date().setHours(23, 59, 59, 999);
  timeToStop = timeToStop ?? new Date(endDay);

  const counter = new Counter({
    selectorDays: selectorDays ?? '#counter__days',
    selectorHours: selectorHours ?? '#counter__hours',
    selectorMinutes: selectorMinutes ?? '#counter__minutes',
    selectorSeconds: selectorSeconds ?? '#counter__seconds',
    timeToStop,
  });

  counter.init();
  const counterId = setInterval(() => {
    if (counter.stopCounter) {
      clearInterval(counterId);
      return;
    }
    counter.init();
  }, 1000);
};
