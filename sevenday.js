const weeklyArrows = document.querySelectorAll('.weekly-arrow');
const weeklyHidden = document.querySelectorAll('.weekly__hidden');
const weeklyMain = document.querySelectorAll('.weekly__main');


weeklyArrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    if (weeklyHidden[index].style.display === 'block') {
      weeklyHidden[index].style.display = 'none';
    } else {
      weeklyHidden.forEach((hidden) => {
        hidden.style.display = 'none';
      });
      weeklyHidden[index].style.display = 'block';
    }
  });
});

