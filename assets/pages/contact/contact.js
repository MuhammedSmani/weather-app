"use strict";

var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);

    fetch("https://formspree.io/f/xqkoaajz", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          modal.style.display = "block";
        } else {
          alert("There was an error sending the email. Please try again.");
        }
      });
  });

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// document.getElementById("modal").style.display = "none"; //set the modal's display property to "none" by default

// document
//   .getElementById("contact-form")
//   .addEventListener("submit", function (event) {
//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
//     var message = document.getElementById("message").value;
//     var modal = document.getElementById("modal");
//     if (!name || !email || !message) {
//       alert("Please fill out all fields before submitting the form.");
//     } else {
//       modal.style.display = "block";
//     }
//   });
