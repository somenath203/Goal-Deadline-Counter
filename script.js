const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countDownBtn = document.getElementById('countdown-button');

const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;

let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);


const updateCountdownDOM = () => {
    countDownActive = setInterval(() => {
        const now = new Date().getTime();
        const distancefromSelectedDateToCurrentDate = countDownValue - now;

        const days = Math.floor(distancefromSelectedDateToCurrentDate / day);
        const hours = Math.floor((distancefromSelectedDateToCurrentDate % day) / hour);
        const minutes = Math.floor((distancefromSelectedDateToCurrentDate % hour) / minute);
        const seconds = Math.floor((distancefromSelectedDateToCurrentDate % minute) / second);

        inputContainer.hidden = true;


        if (distancefromSelectedDateToCurrentDate < 0) {
            countdownEl.hidden = true;
            clearInterval(countDownActive);
            completeElInfo.textContent = `The countdown for the Goal "${countDownTitle}" has finished on ${countDownDate}`;
            completeEl.hidden = false;
        } else {

            countDownElTitle.textContent = `${countDownTitle}`;

            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;
            countdownEl.hidden = false;

        }
    }, second);
}

countDownForm.addEventListener('submit', (e) => {
    e.preventDefault();
    countDownTitle = e.target[0].value;
    countDownDate = e.target[1].value;

    savedCountDown = {
        title: countDownTitle,
        date: countDownDate,
    };
    
    // saving data to localstorage
    localStorage.setItem('countdown', JSON.stringify(savedCountDown));

    // retrieving data from localstorage


    console.log(countDownTitle, countDownDate);


    countDownValue = new Date(countDownDate).getTime();

    updateCountdownDOM();

});

countDownBtn.addEventListener('click', () => {

    countdownEl.hidden = true;
    inputContainer.hidden = false;

    countDownTitle = '';
    countDownDate = '';


    clearInterval(countDownActive);
});


completeBtn.addEventListener('click', () => {
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;

    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown'); // resetting the local storage

    clearInterval(countDownActive);
});

const restorePreviousCountDown = () => {
    // getting the countdown from localstorage if available
    if(localStorage.getItem('countdown')) {

        inputContainer.hidden = true;
    
        savedCountDown = JSON.parse(localStorage.getItem('countdown'));

        countDownTitle = savedCountDown.title;
        countDownDate = savedCountDown.date;

        countDownValue = new Date(countDownDate).getTime();

        updateCountdownDOM();
    }
}

restorePreviousCountDown();