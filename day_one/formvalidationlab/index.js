const form = document.querySelector("#registration");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const usernameInput = document.querySelector("#username");

const emailPattern =  /^(?!.*@example\.com$)(?=\S+@\S+\.\S+$).*$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*password)(?!.*username).{12,}$/;
const usernamePattern = /^(?!.*[\s])(?!.*([^\s])\1$)[a-zA-Z0-9]{4,}$/;








//click on register - submit 
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let errors = [];

  if (!emailPattern.test(emailInput.value)) {
    errors.push("Please enter a valid email address");
  }

  if (!passwordPattern.test(passwordInput.value)) {
    errors.push(
      "Password must contain at least one number, one uppercase, and one lowercase letter, contain at least one special character, and at least 12 or more characters. Cannot contain the word \"password\" (uppercase, lowercase, or mixed). Passwords cannot contain the username."
    );
  }

  if (!usernamePattern.test(usernameInput.value)) {
    errors.push(
      "Username cannot be blank, must be at least four characters long, must contain at least two unique characters, and cannot contain any special characters or whitespace."
    );
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  let username = usernameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
 
  let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  let isExistingUser = existingUsers.some(function (user) {
    return user.email === email;
  });

  if (isExistingUser) {
    alert("This email is already registered. Please use a different email.");
  } else {
    existingUsers.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Registration successful!");
  }
});