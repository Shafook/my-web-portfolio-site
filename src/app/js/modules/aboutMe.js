import aboutme from '../data/aboutme.js';

const aboutCards = document.querySelector('.about__cards');

export default () => {
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
};
