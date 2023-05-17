const name = document.querySelector('#pName');
const file = document.querySelector('#file');
const desc = document.querySelector('#movieDesc');
const select = document.querySelector('#selectType');
const rating = document.querySelector('#rating');
const uploadBtn = document.querySelector('uploadBtn');

name.addEventListener('change', () => {
  const len = name.value.length;
  e.preventDefault();
  if (len < 0) {
    console.log('error');
  }
});
