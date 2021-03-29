import aboutMe from './modules/aboutMe.js';
import fixedNavbar from './modules/fixedNavbar.js';
import formValidation from './modules/formValidation.js';
import linkNavigation from './modules/linkNavigation.js';
import navToggle from './modules/navToggle.js';
import projects from './modules/projects.js';

//navbar
window.addEventListener('scroll', () => {
  fixedNavbar();
});

//nav toggle
navToggle();
//scroll to elements
linkNavigation();
//form
formValidation();
//projects
projects();
//about me
aboutMe();
