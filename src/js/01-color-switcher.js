const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let setTime;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

start.addEventListener('click', colorChange);
stop.addEventListener('click', stopColor);

function colorChange(event){
    event.preventDefault();
    start.disabled = true;
    setTime = setInterval(() => {
        body.style.background = getRandomHexColor();
    }, 1000);
} 

function stopColor(event){
    clearInterval(setTime);
    start.disabled = false;
}