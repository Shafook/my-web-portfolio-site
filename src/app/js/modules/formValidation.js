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

    checkInputs();
  });
};

const checkInputs = () => {
  const nameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const messageValue = message.value.trim();

  if (nameValue === '') {
    setErrorFor(fullname, 'Name cannot be blank');
  } else {
    setSuccessFor(fullname);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Email is not valid');
  } else {
    setSuccessFor(email);
  }

  if (subjectValue === '') {
    setErrorFor(subject, 'Subject cannot be blank');
  } else {
    setSuccessFor(subject);
  }

  if (messageValue === '') {
    setErrorFor(message, 'Message cannot be blank');
  } else {
    setSuccessFor(message);
  }
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.innerText = message;

  formControl.classList.add('error');
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
};

const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
