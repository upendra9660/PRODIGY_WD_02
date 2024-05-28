// script.js
let timer;
let elapsedTime = 0;
let paused = true;
let startTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    if (!paused) {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }
}

function formatTime(time) {
    let milliseconds = Math.floor(time % 1000 / 10);
    let seconds = Math.floor(time / 1000 % 60);
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    }
});

pauseButton.addEventListener('click', () => {
    paused = true;
    clearInterval(timer);
});

resetButton.addEventListener('click', () => {
    paused = true;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapTimes = [];
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (!paused) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        lapsContainer.appendChild(lapElement);
    }
});
