import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
let delay;
inputDelay.addEventListener('input', handlerInput);
form.addEventListener('submit', handlerSubmit);

function handlerInput(e) {
  delay = e.target.value;
}

function handlerSubmit(e) {
  e.preventDefault();
  const elements = {
    fulfilled: form.elements.state.value,
    rejected: form.elements.state.value,
  };

  const promise = new Promise((resolve, reject) => {
    const timerID = setTimeout(() => {
      if (elements.fulfilled === 'fulfilled') {
        resolve(
          izitoast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
          })
        );
      } else if (elements.rejected === 'rejected') {
        reject(
          izitoast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
          })
        );
      }
    }, delay);
  });

  promise.then(value => value).catch(err => err);
  form.reset();
}
