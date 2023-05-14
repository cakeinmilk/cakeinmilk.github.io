  document.addEventListener('DOMContentLoaded', function () {
    const aboutIcon = document.querySelector('.scrolled-icons .about-icon');
    const contactIcon = document.querySelector('.scrolled-icons .contact-icon');
    const aboutButton = document.querySelector('[data-modal="about-modal"]');
    const contactButton = document.querySelector('[data-modal="contact-modal"]');

    aboutIcon.addEventListener('click', () => {
      aboutButton.click();
    });

    contactIcon.addEventListener('click', () => {
      contactButton.click();
    });
  });