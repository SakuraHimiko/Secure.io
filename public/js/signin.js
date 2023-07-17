const bsToastEl = document.querySelector('#liveToast');
const userData = document.querySelector('#userData');
const userBtn = document.querySelector('#userBtn');
const userNameInput = document.querySelector('#userNameInput');
const userPasswordInput = document.querySelector('#userPasswordInput');
const assistant = document.querySelector('#assistantImage');
const toastEl = document.querySelector('#toastEl');
const assistantName = document.querySelector('#assistantName');
const data = new FormData(userData);
const jsonData = JSON.stringify(Object.fromEntries(data));
const bsToast = new bootstrap.Toast(bsToastEl);
let num = Math.round(Math.random() * 1);

const messages = [
  "Oh Please don't destroy the server <img src='/img/scared.gif' width='40px' alt='please?'>",
  'please Noooooo..',
  'Uhhhh Execuse Me?',
  "このバカ！>_< <img src='/img/pout-girl.gif' width='40px' alt='i hate you'>",
];
console.log('working');
let messageNum = Math.round(Math.random() * messages.length);
const assistants = [
  {
    name: 'Assistant Lum',
    src: '/img/lum.jpg',
    message: 'Hey You Bad Guy!',
  },
  {
    name: 'Assistant nagatoro',
    src: '/img/nagatoro.jpeg',
    message: "Senpai won't like this.",
  },
];

assistantName.innerText = assistants[num].name;
assistant.setAttribute('src', assistants[num].src);
toastEl.innerHTML = `<p>${messages[messageNum]}</p>`;
bsToastEl.addEventListener('hidden.bs.toast', () => {
  messageNum = Math.round(Math.random() * 3);
  num = Math.round(Math.random() * 1);
  assistant.setAttribute('src', assistants[num].src);
  toastEl.innerHTML = `<p>${messages[messageNum]}</p>`;
  assistantName.innerText = assistants[num].name;
});

userBtn.addEventListener('click', async (e) => {
  if (userNameInput.value === '') {
    bsToast.show();
  }
  e.preventDefault();
  const failed = await fetch('http://127.0.0.1:3000/io-user/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: userNameInput.value,
      userPassword: userPasswordInput.value,
    }),
  })
    .then((data) => data.json())
    .then((resData) => {
      console.log(resData);
      if (resData.login_true) {
        console.log(resData.token);
        localStorage.setItem('token', resData.token);
        toastEl.innerHTML = `<p>${resData.login_message}</p>`;
        const time = document.querySelector('#time');
        bsToast.show();
        setTimeout(function () {
          window.location.href = '/feed';
        }, 5000);
      } else if (resData.failed_true) {
        toastEl.innerHTML = `<p>${resData.login_message}</p>`;
        bsToast.show();
      }
    });
});
