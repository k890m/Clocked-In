// Global variables

const time_el = document.querySelector('.watch .time');
const break_el = document.querySelector('.count .restTime');

// Variables for Animation 
const titleDisplay = document.getElementById('typewriter');
const phrases = 'Clocked in.';
let sleepTime = 100;
let x = 0;

const start_btn = document.getElementById('start');
const break_btn = document.getElementById('break');
const pause_btn = document.getElementById('pause');
const reset_btn = document.getElementById('reset');
const countdown_btn = document.getElementById('countdown');
const pauseCD_btn = document.getElementById('pauseCountDown');

//stopwatch variables

let seconds = 0;
let interval = null;

//countdown variables

let breakTime = 0;
let intervalBreak = null;

// Events listeners
start_btn.addEventListener('click', start);
pause_btn.addEventListener('click', pause);
reset_btn.addEventListener('click', reset);
break_btn.addEventListener('click', setBreak);
countdown_btn.addEventListener('click', countdown);
pauseCD_btn.addEventListener('click', pauseBreak);

// Title Animation

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const writeLoop = async () => {

    for (let i = 0; i < phrases.length; i++){
        titleDisplay.innerText = phrases.substring(0, i + 1);
        await sleep(sleepTime);
    } 
}

writeLoop();

// Update the timer

function timer () {
    seconds++;

    //Format our time

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs*3600))/60);
    let secs = seconds % 60;
   
    if(secs < 10){
        secs = '0' + secs;
    }

    if(mins < 10){
        mins = '0' + mins;
    }

    if(hrs < 10){
        hrs = '0' + hrs;
    }

    time_el.innerText = `${hrs}:${mins}:${secs}`;
}

// start function for stopwatch portion

function start() {
    if(interval){
        return;
    }

    interval = setInterval(timer, 1000);
}

// start function for countdown portion

function countdown() {
    if(intervalBreak){
        return;
    }

    intervalBreak = setInterval(restTime, 1000);
}

// pause for both 

function pause () {
    clearInterval(interval);
    interval = null;
}

function pauseBreak () {
    clearInterval(intervalBreak);
    intervalBreak = null;
}

// reset for stopwatch

function reset (){
    pause();
    seconds = 0;
    time_el.innerText= '00:00:00';
}

// Updates the countdown
function setBreak(){
    breakTime = Math.round(seconds * 0.2);
    reset();

    let hrs = Math.floor(breakTime / 3600);
    let mins = Math.floor((breakTime - (hrs*3600))/60);
    let secs = breakTime % 60;

    if(secs < 10){
        secs = '0' + secs;
    }

    if(mins < 10){
        mins = '0' + mins;
    }

    if(hrs < 10){
        hrs = '0' + hrs;
    }

    break_el.innerText = `${hrs}:${mins}:${secs}`;

}

function restTime (){

    breakTime--;

    let hrs = Math.floor(breakTime / 3600);
    let mins = Math.floor((breakTime - (hrs*3600))/60);
    let secs = breakTime % 60;

    if(secs < 10){
        secs = '0' + secs;
    }

    if(mins < 10){
        mins = '0' + mins;
    }

    if(hrs < 10){
        hrs = '0' + hrs;
    }

    break_el.innerText = `${hrs}:${mins}:${secs}`;

    if(breakTime == 0){
        pauseBreak();
    }
   
}
