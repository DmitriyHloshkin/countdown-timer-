import QRCode from 'qrcode';

export default class GenQR {
  constructor({
    qrWrapper = null,
    qrString = '',
    btnGen = null,
    btnSaveCode = null,
  }) {
    this.qrWrapper = document.querySelector(qrWrapper);
    this.qrString =  document.querySelector(qrString);
    this.btnGen =  document.querySelector(btnGen);
    this.btnSaveCode = document.querySelector(btnSaveCode);

    this.data = '';
    this.qrUrl = '';
  }

  bindTriggers() {
    this.qrString.addEventListener('input', e => this.data = e.target.value);
    this.btnGen.addEventListener('click', () => {
      if(!this.data) {
        this.clearQR();
        return;
      }

      this.createQR();
    });

    this.btnSaveCode.addEventListener('click', () => {
      if (!this.qrUrl) return;
      this.saveQR();
    });
  }

  async createQR() {
    try {
      this.qrUrl = await QRCode.toDataURL(this.data, { width: 300 });
      this.clearQR();
  
      const img = document.createElement('img');
      img.src = this.qrUrl;
      img.alt = 'qr-code';

      this.qrWrapper.prepend(img);
    } catch (error) {}
    
  }

  clearQR() {
    this.qrWrapper.querySelector('img')?.remove();
  }

  saveQR() {
    const link = document.createElement('a');

    link.style.display = 'none';
    link.href = this.qrUrl;
    link.download = 'qr.png';

    document.documentElement.appendChild(link);
    link.click();
    document.documentElement.removeChild(link);
  }

  init() {
    this.bindTriggers();
  }
}