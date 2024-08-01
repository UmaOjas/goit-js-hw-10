import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

// При сабміті форми, тобто маємо створити функцію, яка ловить клік на кнопку і зчитує дані,
// які введені в затримці та зазначені в радіокнопках


formEl.addEventListener('submit', handler);

function handler(event) {
    event.preventDefault();
    console.log(formEl.elements.delay.value)
    console.log(formEl.elements.state.value)
    const delay = formEl.elements.delay.value;
    const isSuccess = formEl.elements.state.value;

    const newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(isSuccess === 'fulfilled') {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);
            }
        }, delay);
    })
    newPromise
    .then((value) => iziToast.success({
        title: ' ',
        message: `${value}`,
        iconUrl: '../img/ok.svg',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: 'white',
        messageSize: '16px',
        messageLineHeight: '24px',
        backgroundColor: '#59a10d',
        iconColor: '#ffffff',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        close: false,
        position: 'topRight',
        }))
    .catch((value) => iziToast.error({
        title: ' ',
        message: `${value}`,
        iconUrl: '../img/error.svg',
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
    }))
};



