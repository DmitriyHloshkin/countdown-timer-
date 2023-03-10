import { checkWebp } from './modules/general/gulpScripts.js';

import installTheme from './modules/theme.js';
import tabs from './modules/tabs.js';
import counter from './modules/counter.js';
import todo from './modules/todo.js';
import Calc from './modules/calc.js';
import GenPass from './modules/gen-pass.js';
import stopwatch from './modules/stopwatch.js';

document.addEventListener("DOMContentLoaded", () => {
  const themesClass = ['dark-theme', 'light-theme'],
        storageState = {};

  checkWebp();
  installTheme(themesClass, storageState);
  
  tabs();
  counter(storageState);
  todo(storageState);
  stopwatch();

  new Calc({
    display: '.calc__operation',
    histiryDisplay: '.calc__history-operation',
    controlPanel: '.calc__controls',
  }).init();

  new GenPass({
    genBtn: '#gen',
    addPassBtn: '#add-pass',
    passList: '.gen-pass .dates-list__list',
    passBlock: '.gen-pass__current-pass',
    storageState: storageState,
    options: {
      complexity: 'fieldset input',
      numChars: '#num__chars',
    }
  }).init();

});