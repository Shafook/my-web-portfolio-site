const linksContainer = document.querySelector('.nav__links-container');
const navbar = document.querySelector('.nav');
const links = document.querySelectorAll('.scroll-link');

export default () => {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      scrollToElement(id);
    });
  });
};

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
