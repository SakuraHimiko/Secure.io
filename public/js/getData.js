const userNameInput = document.querySelector('#userNameInput');
const userBtn = document.querySelector('#userBtn');

userBtn.addEventListener('click', () => {
  fetch('/api/posts');
});
