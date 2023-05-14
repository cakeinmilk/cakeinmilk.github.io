window.addEventListener('load', function() {
const expandButtons = document.querySelectorAll('.expand-button');
expandButtons.forEach(button => {
  button.addEventListener('click', () => {
    const row = button.parentElement.parentElement.nextElementSibling;
    row.style.display = row.style.display === 'none' ? '' : 'none';
    button.setAttribute('aria-expanded', row.style.display !== 'none');
    button.querySelector('.expand-icon').classList.toggle('rotate', row.style.display !== 'none');
  });
});
});