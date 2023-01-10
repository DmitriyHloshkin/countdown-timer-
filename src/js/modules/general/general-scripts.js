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


export { changeSvg,  calcWithScroll, correctOverflow };