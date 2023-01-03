import { changeSvg } from './general/general-scripts.js';

const tabs = () => {
  
  function initTab({tabSelector, activeClass, contentSelector}) {
      const tabs = document.querySelectorAll(tabSelector),
            tabsContent = document.querySelectorAll(contentSelector);

      tabs.forEach((tabElem, index) => {
        if (index === 0 ) {
          hideTabs();
          showTabs(tabElem);
        }

        tabElem.addEventListener('click', e => {
          const tab = e.currentTarget;

          hideTabs();
          showTabs(tab);
        });

        function showTabs(tabsElem) {
          tabsElem.classList.add(activeClass);
          
          const tabContentId = tabsElem.getAttribute('data-type-content'),
                tabContent = document.querySelector(`${contentSelector}[data-type-content='${tabContentId}']`);
          
          tabContent.classList.add('show-grid');
        }
    
        function hideTabs() {
          tabs.forEach(tab => {
            tab.classList.remove(activeClass);
          });
    
          tabsContent.forEach(tab => {
            tab.classList.remove('show-grid');
          });
        }
      });

    
  }

  function initBar({trigerShowWindow, tabsWindowSelector, closeSvgId, openSvgId}) {
      const trigerTabsWindow = document.querySelector(trigerShowWindow),
            tabsWindow = document.querySelector(tabsWindowSelector);

      trigerTabsWindow.addEventListener('click', () => {
        const svgElem = trigerTabsWindow.querySelector('use'),
              currentSvg = svgElem.getAttribute('xlink:href').replace(/.+#/, ''),
              toogleTheme = currentSvg === closeSvgId ? openSvgId : closeSvgId;

        tabsWindow.classList.toggle('show-block');
        changeSvg(svgElem, toogleTheme);
      });

  }


  initBar({
    trigerShowWindow: '.header__tabs .header-btn',
    tabsWindowSelector: '.header__tabs .tabs',
    closeSvgId: 'bar-open',
    openSvgId: 'bar-close',
  });

  // Main tabs header
  initTab({
    tabSelector: '.tabs__elem',
    activeClass: 'tabs__elem-active',       
    contentSelector: '.main-content > section',
  });
};

export default tabs;