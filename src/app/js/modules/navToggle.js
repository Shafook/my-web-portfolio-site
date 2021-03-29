const hamburgerBtn = document.getElementById('hamburgerBtn');
const navbar = document.querySelector('.nav');
const linksContainer = document.querySelector('.nav__links-container');

export default () => {
  hamburgerBtn.addEventListener('click', (e) => {
    navbar.classList.toggle('show-links');

    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = linksContainer.firstElementChild.getBoundingClientRect()
      .height;

    if (containerHeight === 0) {
      linksContainer.style.height = linksHeight + 'px';
    } else {
      linksContainer.style.height = '0';
    }
  });
};
