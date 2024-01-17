import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
let userSelectedDate = [];

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
        btn.disabled = true;
        const iziToast = iziToast.show({
          message: 'Please choose a date in the future',
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

function handlerClicker() {}
