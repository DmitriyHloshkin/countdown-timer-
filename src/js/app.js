import { checkWebp } from './modules/general/gulpScripts.js';

import installTheme from './modules/theme.js';
import tabs from './modules/tabs.js';
import counter from './modules/counter.js';
import todo from './modules/todo.js';

document.addEventListener("DOMContentLoaded", () => {
  const themesClass = ['dark-theme', 'light-theme'],
        storageState = {};


  checkWebp();
  installTheme(themesClass, storageState);
  
  tabs();
  counter(storageState);
  todo(storageState);

});