function showNoValidAnimation(elem) {
  const transformValue = window.getComputedStyle(elem, null).getPropertyValue("transform"),
        startTransleteStyleElem = transformValue === 'none' ? '' : transformValue;
  
  const keyFrames = [
    {transform: `translate3d(0, 0, 0) ${startTransleteStyleElem}`,
      borderColor: 'var(--anim-border-color)',
      color: 'var(--anim-text-color)'
    },
    {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
    {transform: `translate3d(0, 0, 0) ${startTransleteStyleElem}`}
  ];
  elem.animate(keyFrames, {
    duration: 2000,
  });
}

function pulsAnimation(elem) {  
  const keyFrames = [
    {transform: `scale3d(1, 1, 1)`},
    {transform: `scale3d(1.05, 1.05, 1.05)`},
    {transform: `scale3d(1, 1, 1)`}
  ];
  elem.animate(keyFrames, {
    duration: 500,
  });
}

export { showNoValidAnimation, pulsAnimation };