import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const dataTime = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');

let days =  document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let minutes = document.querySelector('span[data-minutes]');
let seconds = document.querySelector('span[data-seconds]');

const date = new Date();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates){      
    },
  };

const ft = flatpickr(dataTime, options);
let SetTime ; 
start.disabled = true;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function startButton(event){
    event.preventDefault();
    if(ft.selectedDates[0].getTime() < date.getTime()){
        start.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
    }else{
        start.disabled = false;        
    }
}

function addLeadingZero(value){
    let cadena;
    if(value < 10){
        cadena = value.toString().padStart(2, "0 ");
    }else{
        cadena = value.toString();
    }
    return cadena;
}

dataTime.addEventListener('change', startButton);


function imprimirCronometro(){
    let direfencia =ft.selectedDates[0].getTime() - date.getTime()
    let cronometro = convertMs(direfencia);     
    days.innerHTML = addLeadingZero(cronometro.days);
    hours.innerHTML = addLeadingZero(cronometro.hours);
    minutes.innerHTML = addLeadingZero(cronometro.minutes);
    seconds.innerHTML = addLeadingZero(cronometro.seconds);
    SetTime = setInterval(function(){
        cronometro.seconds -=1;
        seconds.innerHTML = addLeadingZero(cronometro.seconds);
        if(cronometro.seconds == 0){
            if(cronometro.minutes == 0){                
                if(cronometro.hours == 0){
                    if(cronometro.days == 0){
                        clearInterval(SetTime);
                    }else{
                        cronometro.days -= 1;
                        days.innerHTML = addLeadingZero(cronometro.days);
                        cronometro.hours = 23;
                        hours.innerHTML = addLeadingZero(cronometro.hours);
                        cronometro.minutes = 59;
                        minutes.innerHTML = addLeadingZero(cronometro.minutes);
                        cronometro.seconds = 60;
                    }
                }else{
                    cronometro.hours -=1;
                    hours.innerHTML = addLeadingZero(cronometro.hours);
                    cronometro.minutes = 59;
                    minutes.innerHTML = addLeadingZero(cronometro.minutes);
                    cronometro.seconds = 60;
                }
            }else{
                cronometro.minutes -=1;
                minutes.innerHTML = addLeadingZero(cronometro.minutes);
                cronometro.seconds = 60;                
            }           
        }
    },1000)
}

start.addEventListener('click', imprimirCronometro);