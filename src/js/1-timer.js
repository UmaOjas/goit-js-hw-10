import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// import errorIcon from "../img/error.png";
// import errorIcon from '../img/error.svg?url';
// import sprite from "../img/spriteNew.svg";




const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("[data-start]");
const timer = document.querySelectorAll(".field");
let userSelectedDate = null;
let intervalId = null;

btn.setAttribute("disabled", "true");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if(userSelectedDate < new Date()) {
            iziToast.error({
                title: ' ',
                message: 'Please choose a date in the future',
                // iconUrl: `${sprite}#icon-error`,
                titleSize: '16px',
                titleLineHeight: '24px',
                messageColor: 'white',
                messageSize: '16px',
                messageLineHeight: '24px',
                backgroundColor: '#ef4040',
                iconColor: '#ffffff',
                titleColor: '#ffffff',
                messageColor: '#ffffff',
                close: false,
                position: 'topRight',
            });
        btn.setAttribute("disabled", "true");
      } else {
        btn.removeAttribute("disabled");
        input.setAttribute("disabled", "true")
      }
    },
  };
const fp = flatpickr(input, options);

btn.addEventListener("click", handleClick);

function handleClick(event) {

    intervalId = setInterval(() => {
        const currentDate = new Date();
        const leftTime = userSelectedDate - currentDate;
        const timerObj = convertMs(leftTime);
        const keys = Object.keys(timerObj);
        const timerInProcess = [...timer].map((el) => {
            for(const key of keys) {
                if(el.lastElementChild.textContent.toLowerCase() === key) {
                    el.firstElementChild.textContent = addLeadingZero(timerObj[key]);
                };
            };
        })
    }, 1000);
    const stopTimerId = setInterval(() => {
        const isTimerDone = [...timer].every((el) => el.firstElementChild.textContent == "00");
        if(isTimerDone) {
            clearInterval(intervalId);
            clearInterval(stopTimerId);
            input.removeAttribute("disabled");
        }
    }, 1000);
    event.target.disabled = true;
}





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
  
function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}