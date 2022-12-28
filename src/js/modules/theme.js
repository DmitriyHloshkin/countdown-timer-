const installTheme = (themeClasses) => {
  const btnMode = document.querySelector('.header__mode .header-btn');
        
  changeMode('light-theme', themeClasses);

  btnMode.addEventListener('click', () => {
    const svgHref = btnMode.querySelector('use').getAttribute('xlink:href'),
          currentTheme = svgHref.replace(/.+#/, ''),
          toogleTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    
    changeMode(toogleTheme, themeClasses);

    btnMode.querySelector('use').setAttribute('xlink:href', svgHref.replace(/#.+/, `#${toogleTheme}`));
  });


  function changeMode(selectTheme, themeClasses) {
    const html = document.documentElement;

    themeClasses.forEach(theme => {
      if (selectTheme !== theme) {
        html.classList.remove(theme);
      }
    });

    html.classList.add(selectTheme);

  }
};

export default installTheme;