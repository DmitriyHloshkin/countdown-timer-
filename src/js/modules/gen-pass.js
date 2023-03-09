import { showNoValidAnimation } from './general/animation.js';
import { setStorage, getStorageProp } from './general/localStorage.js';

export default class GenPass {
  constructor({
    genBtn = null,
    addPassBtn = null,
    passList = null,
    passBlock = null,
    options = {},
    storageState,
  }) {
    this.state = {
      complexity: 8,
      numChars: 'normal', 
    };

    this.storageState = storageState;

    this.genBtn = document.querySelector(genBtn);
    this.addPassBtn = document.querySelector(addPassBtn);
    this.passList = document.querySelector(passList);
    this.passBlock = document.querySelector(passBlock);

    this.complexityNode = document.querySelectorAll(options.complexity);
    this.numCharsNode = document.querySelector(options.numChars);

    this.latinChars = 'abcdefghijklmnopqrstuvwxyz';
    this.numbers = '012345678';
    this.symbols = '!@#$%&*_~^';
    
  }

  changeState() {
    this.state.complexity = Array.from(this.complexityNode)
                                  .filter(elem => {
                                    if(elem.checked && elem) return elem;
                                    // return elem.checked && elem;
                                  })
                                  .map(elem => elem.getAttribute('data-type'))[0] || 'complexity_normal';

    this.state.numChars = this.numCharsNode.value ?? 8;

    this.saveToLocalStorage();
    
  }

  bindTriggers() {
    const addingPermision = () => {
      if (this.passList.querySelectorAll('li').length === 0) return true;
  
      return !Array.from(this.passList.querySelectorAll('li')).some(listItem => {  
        return !listItem.querySelector('.dates-list__name').value || !listItem.querySelector('.dates-list__date').value;
      });
    };

    const getEmptyElement = (parentElement) => {
      return !parentElement.querySelector('.dates-list__name').value ? parentElement.querySelector('.dates-list__name') : 
      parentElement.querySelector('.dates-list__date');
    };

    this.complexityNode.forEach( radioElem => {
      radioElem.addEventListener('input', this.changeState.bind(this)) ;
    });

    this.numCharsNode.addEventListener('input', this.changeState.bind(this));

    this.addPassBtn.addEventListener('click', e => {
      e.preventDefault();
      if (!addingPermision()) {
        showNoValidAnimation(getEmptyElement(this.passList.lastElementChild));
        return;
      }

      this.addDataListItem();
    }); 

    this.passList.addEventListener('click', e => {
      const elem = e.target;
      
      if(!elem.closest('.dates-list__btn-remove')) return;
    
      const btn = elem.closest('.dates-list__btn-remove'),
            listItem = btn.parentElement;
  
      if (btn.classList.contains('dates-list__btn-remove')) { 
        const dateName = listItem.querySelector('.dates-list__name'),
              confirmQuestion = listItem.querySelector('.dates-list__confirm-delete');
        
        dateName.style.display = 'none';
        confirmQuestion.style.display = 'flex';
        
        const btnYes = confirmQuestion.querySelector('.dates-list__yes-delete'),
              btnNo = confirmQuestion.querySelector('.dates-list__no-delete');
  
        btnYes.addEventListener('click', () => {
          listItem.remove();
          this.saveToLocalStorage(); 
        });
  
        btnNo.addEventListener('click', () => {
          dateName.style.display = 'block';
          confirmQuestion.style.display = 'none';
        });
      
      }
  
    });

    this.genBtn.addEventListener('click', e => {
      e.preventDefault();
      this.passBlock.innerText = this.genPass();

    });

  }

  genPass() {
    let selectSymbols = '',
        pass = '';

    const { complexity } = this.state;

    switch(complexity) {
      case ('normal'):
        selectSymbols += this.latinChars + this.numbers;
        break;

      case ('hard'):
        selectSymbols += this.latinChars + this.numbers + this.symbols;
        break; 

      default:
        selectSymbols += this.latinChars;
    }

    for(let i = 1; i <= this.state.numChars; i++) {
      pass += selectSymbols[Math.floor(Math.random() * selectSymbols.split('').length)];
    }

    return pass;
  }

  addDataListItem(name = '', date = '') {
    const listItem = document.createElement('li');

    listItem.classList.add('dates-list__item');
    
    listItem.innerHTML = `
            <button class="dates-list__btn-remove main-btn" title="удалить дату">
              <svg class="dates-list__svg dates-list__svg-mr0">
                <use xlink:href="./img/dates-list/dates-list-sprint.svg#minus"></use>
              </svg>
            </button>

            <input type="text" class="dates-list__name" maxlength="25" placeholder="Аккаунт" value="${name}">

            <div class="dates-list__confirm-delete">
              <span>Желаете удалить дату?</span>
              <button class="dates-list__yes-delete main-btn">Да</button>
              <button class="dates-list__no-delete main-btn">Нет</button>
            </div>

            <input type="text" class="dates-list__date" placeholder="Пароль" value="${date}">`;

    this.passList.append(listItem);
    
    this.addListenerForStoragePass();

  }

  // LocalStorage
  saveToLocalStorage() {
    
    const passList = Array.from(this.passList.querySelectorAll('li'))
                          .map(elem => {
                            return {
                              name: elem.querySelector('.dates-list__name').value,
                              date: elem.querySelector('.dates-list__date').value,
                            };
                          });

    const stateGen = {
      passList,
      complexity: this.state.complexity,
      numChars: this.state.numChars,
    };

    this.storageState.genPass = stateGen;
    setStorage(this.storageState);

  }

  fillWithLocalStorage() {

    if(!getStorageProp('genPass')) return;

    const { passList, complexity, numChars } = getStorageProp('genPass');

    if (passList) {
      passList.forEach(obj => this.addDataListItem(obj.name, obj.date));
    }

    if (complexity) {
      Array.from(this.complexityNode).find(elem => {
        if(elem.getAttribute('data-type') === complexity) {
          return elem;
        }
      }).checked = true;
    }

    if (numChars) this.numCharsNode.value = numChars;
    

  }

  addListenerForStoragePass() {
    const names = this.passList.querySelectorAll('.dates-list__name'),
          dates = this.passList.querySelectorAll('.dates-list__date');

    [...names, ...dates].forEach(elem => elem.addEventListener('input', this.saveToLocalStorage.bind(this)));
  }

  init() {
    this.fillWithLocalStorage(); 
    this.changeState();
    this.bindTriggers();
  }

}