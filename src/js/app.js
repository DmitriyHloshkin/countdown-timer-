import {
  checkWebp
} from './modules/gulpScripts.js';
import timer from './modules/counter.js';

document.addEventListener("DOMContentLoaded", () => {
  checkWebp();
  timer({
    selectorDays: '#days',
    selectorHours: '#hours',
    selectorMinutes: '#minutes',
    selectorSeconds: '#seconds',
    timeToStop: '2022-11-29',
    circle: {
      circleSeconds: '.circle__segment-seconds',
      circleMinutes: '.circle__segment-minutes',
      circleHours: '.circle__segment-hours',
      circleDays: '.circle__segment-days',

    },
  });

});