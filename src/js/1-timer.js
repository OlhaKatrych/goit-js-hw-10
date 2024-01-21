import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds');

let userSelectedDate;
btn.disabled = true;

btn.addEventListener('click', handlerClicker);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDates.forEach(element => {
      if (options.defaultDate > element) {
        izitoast.error({
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
      } else {
        btn.disabled = false;
      }
      userSelectedDate = element;
    });
  },
};

const libFlatPickr = flatpickr('#datetime-picker', options);

function handlerClicker(e) {
  e.target.disabled = true;
  if (options.enableTime) {
    const timerID = setInterval(() => {
      const currentTime = Date.now();
      let diff = userSelectedDate - currentTime;
      const objConvert = convertMs(diff);
      days.innerHTML = addLeadingZero(objConvert.days);
      hours.innerHTML = addLeadingZero(objConvert.hours);
      minutes.innerHTML = addLeadingZero(objConvert.minutes);
      seconds.innerHTML = addLeadingZero(objConvert.seconds);
      if (diff < 1000) {
        clearInterval(timerID);
      }
    }, 1000);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
