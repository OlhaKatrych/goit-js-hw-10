import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const container = document.querySelector('.timer');
let userSelectedDate = [];
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
      console.log(element);
      if (options.defaultDate > element) {
        izitoast.error({
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
      } else {
        btn.disabled = false;
      }
      userSelectedDate.push(element);
      console.log(userSelectedDate);
    });
  },
};

const libFlatPickr = flatpickr('#datetime-picker', options);

function startTimer() {
  const arr = [...container.children];
  let timerElement;
  for (let item of arr) {
    timerElement = item.firstElementChild;
  }
  const diff = userSelectedDate - options.defaultDate;
  timerElement.textContent = convertMs(diff);
}

function handlerClicker(e) {
  e.target.disabled = true;
  startTimer();
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
