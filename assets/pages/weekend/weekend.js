"use strict";

// define variables for the dropdowns and the arrows to open and close them
const first_arrow = document.querySelector(".arrow");
const first_dropdown = document.querySelector(".dropdown");
const first_closeArrow = document.querySelector(".close_arrow");
const second_arrow = document.querySelector(".second_arrow");
const second_dropdown = document.querySelector(".second_dropdown");
const second_closeArrow = document.querySelector(".second-close_arrow");
const third_arrow = document.querySelector(".third_arrow");
const third_dropdown = document.querySelector(".third_dropdown");
const third_closeArrow = document.querySelector(".third-close_arrow");

// define functions to open and close the  first dropdown
const openDropdown = () => {
  first_dropdown.classList.remove("hidden");
  first_arrow.classList.add("hidden");
  first_closeArrow.classList.remove("hidden");
};

const closeDropdown = () => {
  first_dropdown.classList.add("hidden");
  first_closeArrow.classList.add("hidden");
  first_arrow.classList.remove("hidden");
};

first_arrow.addEventListener("click", openDropdown);
first_closeArrow.addEventListener("click", closeDropdown);

// define functions to open and close the second dropdown
const openSecondDropdown = () => {
  second_dropdown.classList.remove("hidden");
  second_arrow.classList.add("hidden");
  second_closeArrow.classList.remove("hidden");
};
const closeSecondDropdown = () => {
  second_dropdown.classList.add("hidden");
  second_closeArrow.classList.add("hidden");
  second_arrow.classList.remove("hidden");
};
second_arrow.addEventListener("click", openSecondDropdown);
second_closeArrow.addEventListener("click", closeSecondDropdown);

// define functions to open and close the third dropdown
const openThirdDropdown = () => {
  third_dropdown.classList.remove("hidden");
  third_arrow.classList.add("hidden");
  third_closeArrow.classList.remove("hidden");
};
const closeThirdDropdown = () => {
  third_dropdown.classList.add("hidden");
  third_closeArrow.classList.add("hidden");
  third_arrow.classList.remove("hidden");
};
third_arrow.addEventListener("click", openThirdDropdown);
third_closeArrow.addEventListener("click", closeThirdDropdown);
