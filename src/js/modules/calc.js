export default class Calc {
  constructor({
    display,
    histiryDisplay,
    controlPanel,
  }) {
    this.display = document.querySelector(display);
    this.historyDisplay = document.querySelector(histiryDisplay);
    this.controlPanel = document.querySelector(controlPanel);

    if (!this.display || !this.historyDisplay || !this.controlPanel) {
      throw new Error('Не удалось найти один или несколько элементов на странице');
    }

    this.BUTTONS = {
      RESET: 'reset',
      DELETE: 'delete',
      EQUALS: 'equals'
    };

  }

  changeDisplay(value) {

    if (/\D$/g.test(this.display.value) && /\D$/g.test(value)) {
      this.display.value = this.display.value.replace(/.$/, value);
    } else {
      this.display.value += value;
    }

    this.getMaxChars(this.display);
    this.display.value = this.display.value.replace('Ошибка', '');
    this.display.value = this.display.value.substring(0, this.maxChars);
  }

  deleteLastSymbol() {
    this.display.value = this.display.value.replace(/.$/, '');
  }

  getMaxChars(inputField) {
    const inputWidth = inputField.offsetWidth,
      fontSize = parseFloat(window.getComputedStyle(inputField).fontSize),
      charWidth = fontSize * 0.6;

    this.maxChars = Math.floor(inputWidth / charWidth);
  }

  reset() {
    this.historyDisplay.value = '';
    this.display.value = '';
  }

  saveHistory() {
    this.historyDisplay.value = this.display.value;
  }

  result() {
    this.saveHistory();
    const evalStr = this.display.value.replace(/\D/g, a => {
      const code = a.charCodeAt(0);

      switch (code) {
        case (247):
          return '/';

        case (215):
          return '*';

        default:
          return a;
      }
    });

    try {
      const res = parseFloat(eval(evalStr).toFixed(10).substring(0, 11));
      this.display.value = res === Infinity || res === -Infinity ? 'Ошибка' : res;
    } catch (error) {
      this.display.value = 'Ошибка';
    }
  }


  init() {
    this.controlPanel.addEventListener('click', e => {
      e.preventDefault();

      const button = e.target;
      const buttonType = button.getAttribute('id');

      if (!buttonType) return;

      if (buttonType !== this.BUTTONS.RESET && buttonType !== this.BUTTONS.DELETE && buttonType !== this.BUTTONS.EQUALS) {
        this.changeDisplay(button.innerText);
      }

      if (buttonType === this.BUTTONS.EQUALS) this.result();

      if (buttonType === this.BUTTONS.DELETE) this.deleteLastSymbol();

      if (buttonType === this.BUTTONS.RESET) this.reset();

    });

    window.addEventListener('resize', () => this.getMaxChars(this.display));
  }


}