function changeSvg(svgElem, replaceIdSVG) {
  if (!svgElem) return;
  
  const svgHref = svgElem.getAttribute('xlink:href');
  svgElem.setAttribute('xlink:href', svgHref.replace(/#.+/, `#${replaceIdSVG}`));
}

function calcWithScroll() {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
  
}

function correctOverflow() {
  
  const body = document.body,
        header = document.querySelector('.header');

  if (body.scrollHeight > body.clientHeight) {
    body.style.paddingLeft = `${calcWithScroll()}px`;
    header.style.transform = `translateX(-${calcWithScroll()}px)`;
    header.style.width = `calc(100% + ${calcWithScroll()}px)`;

  } else {
    body.style.paddingLeft = '0';
    header.style.transform = `translateX(0px)`;
    header.style.width = `100%`;
  }
}

function changeTitle({ titleSelector, tabContent }) {
  const titleElem = document.querySelector(titleSelector),
        dataTypeContent = tabContent.getAttribute('data-type-content');
  let title;

  switch (dataTypeContent) {
    case 'todo-list':
      title = 'Список задач';
      break;

    case 'calc':
      title = 'Калькулятор';
      break;

    case 'counter':
      title = 'Таймер обратного отсчета';
      break;

    case 'gen-pass':
      title = 'Генератор паролей';
      break;

    case 'stopwatch':
      title = 'Секундомер';
      break;

    case 'qr-code':
      title = 'QR-code генератор';
      break;
  
    default:
      break;
  }

  if (title) titleElem.textContent = title;

}


export { changeSvg,  calcWithScroll, correctOverflow, changeTitle };