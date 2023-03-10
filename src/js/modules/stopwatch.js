const stopwatch = () => {
  const minutes = document.querySelector('.stopwatch .display__minutes'),
        seconds = document.querySelector('.stopwatch .display__seconds'),
        miliseconds = document.querySelector('.stopwatch .display__miliseconds'),
        btnStart = document.querySelector('#stopwatch-start'),
        btnStop = document.querySelector('#stopwatch-stop'),
        btnCircle = document.querySelector('#stopwatch-circle'),
        circleList = document.querySelector('.stopwatch .circle-list');

  let startTime = null,
      timerId = null,
      stateCounter = {};

  const stopStopwatch = () => {
    btnStart.style.display = 'block';
    btnStop.style.display = 'none';

    timerId = clearInterval(timerId);
    startTime = null;
    stateCounter = {};
  };

  const setStateCounter = () => {

    const currentTime = +new Date(),
          diffTime = currentTime - startTime;

          
    const minute = Math.floor((diffTime / 1000 / 60))  % 60,
          seconds = Math.floor((diffTime / 1000))  % 60,
          miliseconds = Number.parseInt(Math.floor(diffTime  % 1000).toString().slice(0,2));

    stateCounter = {
      minute: minute < 10 ? `0${minute}` : minute,
      second: seconds < 10 ? `0${seconds}` : seconds,
      milisecond: miliseconds < 10 ? `0${miliseconds}` : miliseconds,
    };

  };

  const updateDisplay = () => {
    if(minutes) minutes.textContent = stateCounter.minute;
    if(seconds) seconds.textContent = stateCounter.second;
    if(miliseconds) miliseconds.textContent = stateCounter.milisecond;
  };

  const startStopwatch = () => {
    btnStart.style.display = 'none';
    btnStop.style.display = 'block';
    btnCircle.style.display = 'block';

    startTime = +new Date();

    clearcircleList();

    timerId = setInterval(() => {
      const result = setStateCounter();
      updateDisplay(result);
    }, 1);
  };

  const addCircleItem = () => {
    if(Object.keys(stateCounter).length === 0) return;

    const circle = document.createElement('div'),
          countCircle = circleList.children.length + 1;
    const { minute, second, milisecond } = stateCounter;

    circle.classList.add('circle-list__circle');
    circle.innerHTML = `
        <div class="circle-list__circle">
          <div class="circle-list__num">${countCircle}</div>
          <span>круг</span>
          <div class="circle-list__time">${minute}:${second}:${milisecond}</div>
        </div>
      `;

      circleList.appendChild(circle);
  };

  const clearcircleList = () => Array.from(circleList.children).forEach(circleItem => circleItem.remove());

  const bindTrigers = () => {
    btnStart?.addEventListener('click', startStopwatch);
    btnStop?.addEventListener('click', stopStopwatch);
    btnCircle?.addEventListener('click', addCircleItem);
  };

  bindTrigers();
  
};

export default stopwatch;