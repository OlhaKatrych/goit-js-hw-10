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

const arr = [...container.children];
let element;
for (let item of arr) {
  element = item;
}
const schedule = {
  days: Number(element.children[0].textContent),
  hours: Number(element.children[0].textContent),
  minutes: Number(element.children[0].textContent),
  seconds: Number(element.children[0].textContent),
};

const diff = userSelectedDate - options.defaultDate;
function handlerClicker(e) {
  e.target.disabled = true;
  convertMs(diff);
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

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
