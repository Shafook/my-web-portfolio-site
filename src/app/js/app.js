import project from './data/projects.js';
import aboutme from './data/aboutme.js';
const aboutCards = document.querySelector('.about__cards');
const projectsItems = document.querySelector('.projects__items');
const navbar = document.querySelector('.nav');
const linksContainer = document.querySelector('.nav__links-container');
const links = document.querySelectorAll('.scroll-link');
const hamburgerBtn = document.getElementById('hamburgerBtn');
//form
const formEl = document.getElementById('form');
const fullnameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const subjectEl = document.getElementById('subject');
const messageEl = document.getElementById('message');

//fixed navbar
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
});

//link navigation
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    scrollToElement(id);
  });
});

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  const navHeight = navbar.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const fixedNav = navbar.classList.contains('fixed-nav');

  let position = element.offsetTop - navHeight;

  if (fixedNav) {
    position += 1;
  }

  if (containerHeight > 82) {
    position += containerHeight;
  }

  window.scrollTo({ left: 0, top: position });
  navbar.classList.remove('show-links');
  linksContainer.style.height = '0';
};

//Toggle navigation
hamburgerBtn.addEventListener('click', (e) => {
  navbar.classList.toggle('show-links');

  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight =
    linksContainer.firstElementChild.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = linksHeight + 'px';
  } else {
    linksContainer.style.height = '0';
  }
});

//Projects
project.forEach(
  ({ title, image, description, demoLink, codeLink, languages }) => {
    const projectEl = document.createElement('article');
    projectEl.classList.add('projects__card');

    const newStuff = languages
      .map((item) => {
        return `<i class='${item}'></i>`;
      })
      .join('');

    projectEl.innerHTML = `
    <div class="projects__image">
      <a href=${demoLink} target="_blank">
        <img src=${image} alt=""/>
      </a>
    </div>
    <div class="projects__info">
        <div class="projects__description">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class='projects__footer'>
          <div class="projects__links">
              <a href=${demoLink} target="_blank" class="demo button">live demo</a>
              <a href=${codeLink} target="_blank" class="code button"><i class="fab fa-github"></i></a>
          </div>
          <div class ='projects__languages'>
            ${newStuff}
          </div>
        </div>
    </div>
    `;
    projectsItems.appendChild(projectEl);
  }
);

//about me data
aboutme.forEach(({ title, image, description }) => {
  const aboutEl = document.createElement('article');
  aboutEl.classList.add('about__card');

  aboutEl.innerHTML = `
      <div class="about__image">
                  <img
                    src=${image}
                    alt=""
                  />
                </div>
                <div class="about__description">
                  <div class="about__info">
                    <div class="about__subtitle">${title}</div>
                    <p>${description}</p>
                  </div>
                </div>
      `;
  aboutCards.appendChild(aboutEl);
});

//Form validation
const inputFields = [fullnameEl, emailEl, subjectEl, messageEl];

//form
inputFields.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('error')) {
      setSuccessFor(input);
    }
  });
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  if (checkInputs() === 0) {
    console.log('success');
    submitForm();
  }
});

const submitForm = () => {
  let formData = new FormData(formEl);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log('Form successfully submitted'))
    .catch((error) => alert(error));
};

const checkInputs = () => {
  const nameValue = fullnameEl.value.trim();
  const emailValue = emailEl.value.trim();
  const subjectValue = subjectEl.value.trim();
  const messageValue = messageEl.value.trim();

  let fails = 0;

  if (nameValue === '') {
    setErrorFor(fullnameEl, 'Name cannot be blank');
    fails++;
  } else {
    setSuccessFor(fullnameEl);
  }

  if (emailValue === '') {
    setErrorFor(emailEl, 'Email cannot be blank');
    fails++;
  } else if (!isEmail(emailValue)) {
    setErrorFor(emailEl, 'Email is not valid');
    fails++;
  } else {
    setSuccessFor(emailEl);
  }

  if (subjectValue === '') {
    setErrorFor(subjectEl, 'Subject cannot be blank');
    fails++;
  } else {
    setSuccessFor(subjectEl);
  }

  if (messageValue === '') {
    setErrorFor(messageEl, 'Message cannot be blank');
    fails++;
  } else {
    setSuccessFor(messageEl);
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
