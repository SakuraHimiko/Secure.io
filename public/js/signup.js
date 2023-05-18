const bsToastEl = document.querySelector('#liveToast');
const userData = document.querySelector('#userData');
const userBtn = document.querySelector('#userBtn');
const userNameInput = document.querySelector('#userNameInput');
const userPassword = document.querySelector('#userPasswordInput');
const assistant = document.querySelector('#assistantImage');
const toastEl = document.querySelector('#toastEl');
const assistantName = document.querySelector('#assistantName');
const userFirstName = document.querySelector('#user_f_name');
const userLastName = document.querySelector('#user_l_name');

const bsToast = new bootstrap.Toast(bsToastEl);
let num = Math.round(Math.random() * 1);

const messages = [
  "Oh Please don't destroy the server <img src='/img/scared.gif' width='40px' alt='please?'>",
  'please Noooooo..',
  'Uhhhh Execuse Me?',
  "このバカ！>_< <img src='/img/pout-girl.gif' width='40px' alt='i hate you'>",
];
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
const sse = new EventSource('/sse');
sse.onmessage = ({ data }) => {
  console.log(`Message Received!: ${data}`);
};
userBtn.addEventListener('click', async (e) => {
  if (userNameInput.value === '') {
    bsToast.show();
  }
  e.preventDefault();

  const failed = await fetch('/io-user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_f_name: userFirstName.value,
      user_l_name: userLastName.value,
      user_name: userNameInput.value,
      user_password: userPassword.value,
    }),
  })
    .then((data) => data.json())
    .then((resData) => {
      console.log(resData);
      if (resData.login_failed) {
        console.log('i will work');
        toastEl.innerHTML = `<p>${resData.message}</p>`;
        bsToast.show();
      } else if (resData.login_true) {
        toastEl.innerHTML = `<p>${resData.message}.Now we will redirect you to index page</p>`;
        bsToast.show();
        setTimeout(() => {
          location.href = '/feed';
        }, 5000);
      } else if (resData.failed_true) {
        toastEl.innerHTML = `<p>${resData.login_message}</p>`;
        bsToast.show();
      }
    });
});
