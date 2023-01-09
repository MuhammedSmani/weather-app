"use strict";

const dropdowns = document.querySelectorAll(".dropdown");
const arrows = document.querySelectorAll(".arrow");
const closeArrows = document.querySelectorAll(".close_arrow");

function toggleDropdown(dropdown, arrow, closeArrow) {
  dropdown.classList.toggle("hidden");
  arrow.classList.toggle("hidden");
  closeArrow.classList.toggle("hidden");
}

arrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () =>
    toggleDropdown(dropdowns[i], arrow, closeArrows[i])
  );
});

closeArrows.forEach((closeArrow, i) => {
  closeArrow.addEventListener("click", () =>
    toggleDropdown(dropdowns[i], arrows[i], closeArrow)
  );
});
