const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('laps');

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalId = null;
let startTime = null;
let lapTimes = [];

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function timer() {
  milliseconds++;

  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${formattedSeconds}.${formattedMilliseconds}`;
}

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
  }

  intervalId = setInterval(timer, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;
}

function stopTimer() {
  clearInterval(intervalId);
  startTime = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
}

function resetTimer() {
  clearInterval(intervalId);
  startTime = null;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  display.textContent = '00:00:00.00';
  lapTimes = [];
  lapList.innerHTML = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
}

function recordLap() {
  if (startTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor(elapsedTime % 1000);

    const formattedLapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

    lapTimes.push(formattedLapTime);

    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapTimes.length}: ${formattedLapTime}`;
    lapList.appendChild(lapListItem);
  }
}
