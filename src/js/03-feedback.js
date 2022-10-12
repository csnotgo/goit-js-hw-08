import trottle from 'lodash.throttle';

const form = document.querySelector('form');

const key = 'feedback-form-state';
const formData = {};

form.addEventListener('input', trottle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);
populateInput();

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(key);
  console.log(formData);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(key, JSON.stringify(formData));
}

function populateInput(e) {
  const savedMessage = localStorage.getItem(key);
  const messageValue = JSON.parse(savedMessage);
  if (savedMessage) {
    form.elements.email.value = messageValue.email || '';
    form.elements.message.value = messageValue.message || '';
  }
}
