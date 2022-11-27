import { checkWebp } from './modules/gulpScripts.js';
import timer from './modules/counter.js';

document.addEventListener("DOMContentLoaded", () => {
  checkWebp();
  timer({
    selectorDays: '#counter__days',
    selectorHours: '#counter__hours',
    selectorMinutes: '#counter__minutes',
    selectorSeconds: '#counter__seconds',
    timeToStop: '2022-11-28',
  });

});
