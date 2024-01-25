import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  const state = form.elements.state.value;
  let delay = parseInt(form.elements.delay.value, 10);

  const promise = new Promise((resolve, reject) => {
    const timerID = setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value =>
      izitoast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(err =>
      izitoast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
  form.reset();
}
