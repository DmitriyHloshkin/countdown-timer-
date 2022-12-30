function changeSvg(svgElem, replaceIdSVG) {
  if (!svgElem) return;
  
  const svgHref = svgElem.getAttribute('xlink:href');
  svgElem.setAttribute('xlink:href', svgHref.replace(/#.+/, `#${replaceIdSVG}`));
}


export { changeSvg };