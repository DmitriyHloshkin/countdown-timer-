import { checkWebp } from './modules/gulpScripts.js';
import installTheme from './modules/theme.js';

document.addEventListener("DOMContentLoaded", () => {
  const themesClass = ['dark-theme', 'light-theme'];

  checkWebp();
  installTheme(themesClass);
  // timer({
  //   selectorDays: '#days',
  //   selectorHours: '#hours',
  //   selectorMinutes: '#minutes',
  //   selectorSeconds: '#seconds',
  //   timeToStop: new Date(new Date().setHours(23, 59, 59, 999)),
  //   circle: {
  //     circleSeconds: '.circle__segment-seconds',
  //     circleMinutes: '.circle__segment-minutes',
  //     circleHours: '.circle__segment-hours',
  //     circleDays: '.circle__segment-days',
  //   },
  // });
});