import aboutme from '../data/projects.js';

const projectsItems = document.querySelector('.projects__items');

export default () => {
  aboutme.forEach(({ title, image, description, demoLink, codeLink }) => {
    const projectEl = document.createElement('article');
    projectEl.classList.add('projects__card');

    projectEl.innerHTML = `
    <div class="projects__image">
        <img src=${image} alt=""/>
    </div>
    <div class="projects__info">
        <div class="projects__description">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class="projects__links">
            <a href=${demoLink} class="demo button">live demo</a>
            <a href=${codeLink} class="code button"><i class="fab fa-github"></i></a>
        </div>
    </div>
    `;
    projectsItems.appendChild(projectEl);
  });
};
