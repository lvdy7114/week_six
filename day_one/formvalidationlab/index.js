//registration submit form
const registerForm = document.querySelector("#registration");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const usernameInput = document.querySelector("#username");

const confirmPasswordInput = document.querySelector("#confirmPassword");


const emailPattern =  /^(?!.*@example\.com$)(?=\S+@\S+\.\S+$).*$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*password)(?!.*username).{12,}$/;
const usernamePattern = /^(?!.*[\s])(?!.*([^\s])\1$)[a-zA-Z0-9]{4,}$/;

//error msg
const errorMessages = document.querySelector("#errorDisplay");

//password match
function passwordMatch() {
  const passwordMustMatch = confirmPasswordInput.value;

  if(passwordMustMatch !== passwordInput.value) {
    errorMessages.style.display = "inline";
    errorMessages.innerText = "Both passwords must match"
  }
  
}
  
//after clicking on register - submit 
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let errors = [];

  if (!emailPattern.test(emailInput.value)) {
    errors.push("Please enter a valid email address");
  } else if (emailInput.value === true) {
    emailInput.value.toLowerCase();
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
  } else if (usernameInput.value === true) {
      usernameInput.value.toLowerCase();
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
    return user.username === username;
  });

  if (isExistingUser) {
    alert("This username is already taken. Please use another username.");
  } else {
    existingUsers.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));
    usernameInput.value = " ";
    emailInput.value = " ";
    passwordInput.value = " ";
    confirmPasswordInput.value = " ";
    alert("Registration successful!");
  }
});

//login -validation
const loginForm = document.querySelector("#login");


loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

const loginUsernameInput = document.querySelector("#loginusername");
const loginPasswordInput = document.querySelector("#loginpassword");
const persist = document.querySelector('#persist');
const errorMessage = document.querySelector("#errorLogin");

let loginUser = loginUsernameInput.value.toLowerCase;
let loginPass = loginPasswordInput.value;

//check if username is in localstorage
let loginExisting = JSON.parse(localStorage.getItem('users')) || [];
let isLoginExist = loginExisting.some(function (user) {
  return user.loginUser === loginUser;
});

if(!isLoginExist) {
  errorMessage.innerText = "Invalid username. Please register that username."
  return;
}

//check if password is correct
let matchedUser = loginExisting.find(function (user) {
  return user.loginUser === loginUser && user.loginPass === loginPass;
});

if(!matchedUser) {
  errorMessage.innerText = "Invalid password";
} else {
    localStorage.setItem("users", JSON.stringify(loginExisting));
    loginUsernameInput.value = '';
    loginPasswordInput.value = '';
    alert("Login successful!");
  }

//clear form 


//success display
const successMessage = document.querySelector("#successDisplay");

if(persist.checked) {
  successMessage += ' Keep me logged in.';
}
successMessage.textContent = "You will remain logged in";
successMessage.style.display = 'block';

});


//registration works.. login set up appears like it's all set up properly, but doesn't go anywhere after clicking login
//there were no errors after pressing submit.. 