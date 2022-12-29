const hourlyArrows = document.querySelectorAll('.hourly-arrow');
const hourlyHidden = document.querySelectorAll('.hourly__hidden');

hourlyArrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    if (hourlyHidden[index].style.display === 'block') {
      hourlyHidden[index].style.display = 'none';
    } else {
      hourlyHidden.forEach((hidden) => {
        hidden.style.display = 'none';
      });
      hourlyHidden[index].style.display = 'block';
    }
  });
});
