import { checkWebp } from './modules/general/gulpScripts.js';
import installTheme from './modules/theme.js';
import tabs from './modules/tabs.js';

document.addEventListener("DOMContentLoaded", () => {
  const themesClass = ['dark-theme', 'light-theme'],
        storageState = {};



  checkWebp();
  installTheme(themesClass, storageState);
  tabs();
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