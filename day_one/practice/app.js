const form = document.querySelector("#registrationForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");


const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let errors = [];

  if (!emailPattern.test(emailInput.value)) {
    errors.push("Please enter a valid email address!!!");
  }

  if (!passwordPattern.test(passwordInput.value)) {
    errors.push(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    );
  }


  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  let fName = document.getElementById("fName").value;
  let lName = document.getElementById("lName").value;
  let email = emailInput.value;
  let password = passwordInput.value;

  let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  let isExistingUser = existingUsers.some(function (user) {
    return user.email === email;
  });

  if (isExistingUser) {
    alert("This email is already registered. Please use a different email.");
  } else {
    existingUsers.push({ fName, lName, email, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Registration successful!");
  }
});