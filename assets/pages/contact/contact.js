/*==================== CONTACT FORM ====================*/
const contactButton = document.querySelector(".contact-btn");
const contactForm = document.querySelector(".contact-form");
const overlay = document.querySelector(".overlay");

contactButton.addEventListener("click", () => {
  contactForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  if (contactForm.classList.contains("hidden")) {
    contactButton.textContent = "Contact";
  } else {
    contactButton.innerHTML = '<i class="uil uil-multiply"></i>';
  }
});

document.addEventListener("click", (event) => {
  if (
    !contactForm.contains(event.target) &&
    !contactButton.contains(event.target) &&
    !overlay.classList.contains("hidden")
  ) {
    contactForm.classList.add("hidden");
    contactButton.textContent = "Contact";
    overlay.classList.add("hidden");
  }
});

/*==================== FORMSPREE ====================*/
const form1 = document.querySelector("#form");

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  // Submit the form data to Formspree
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://formspree.io/f/xqkoaajz", true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      form1.reset();
      alert("Thank you for your message!");
    }
  };
  xhr.send(new FormData(form1));
});
