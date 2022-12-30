import { changeSvg } from './general/general-scripts.js';
import { setStorage, getStorageProp } from './general/localStorage.js';

const installTheme = (themeClasses, storageState) => {

  const btnMode = document.querySelector('.header__mode .header-btn');
  
  let currentTheme = getStorageProp('theme') ? getStorageProp('theme') : 'light-theme';

  changeMode(currentTheme, themeClasses);
  changeSvg(btnMode.querySelector('use'), currentTheme);

  btnMode.addEventListener('click', () => {
    const svgElem = btnMode.querySelector('use'),
          currentTheme = svgElem.getAttribute('xlink:href').replace(/.+#/, ''),
          toogleTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';

    changeSvg(svgElem, toogleTheme);
    changeMode(toogleTheme, themeClasses);
  });


  function changeMode(selectTheme, themeClasses) {
    const html = document.documentElement;

    themeClasses.forEach(theme => {
      if (selectTheme !== theme) {
        html.classList.remove(theme);
      }
    });

    html.classList.add(selectTheme);
    
    storageState.theme = selectTheme;
    setStorage(storageState);

  }
};

export default installTheme;