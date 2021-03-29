//form
const form = document.getElementById('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

const inputFields = [fullname, email, subject, message];

export default () => {
  //form
  inputFields.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        setSuccessFor(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkInputs() === 0) {
      console.log('success');
      submitForm();
    }
  });
};

const submitForm = () => {
  let formData = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log('Form successfully submitted'))
    .catch((error) => alert(error));
};

const checkInputs = () => {
  const nameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const messageValue = message.value.trim();

  let fails = 0;

  if (nameValue === '') {
    setErrorFor(fullname, 'Name cannot be blank');
    fails++;
  } else {
    setSuccessFor(fullname);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
    fails++;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Email is not valid');
    fails++;
  } else {
    setSuccessFor(email);
  }

  if (subjectValue === '') {
    setErrorFor(subject, 'Subject cannot be blank');
    fails++;
  } else {
    setSuccessFor(subject);
  }

  if (messageValue === '') {
    setErrorFor(message, 'Message cannot be blank');
    fails++;
  } else {
    setSuccessFor(message);
  }

  return fails;
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.innerText = message;

  formControl.classList.add('error');
  return false;
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  return true;
};

const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
