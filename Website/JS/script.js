//passwort
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirmPassword");

  passwordInput.addEventListener("blur", checkPassword);
  confirmPasswordInput.addEventListener("blur", checkPasswordsMatch);
});

function checkPassword() {
  var password = document.getElementById("password").value;
  var passwordHint = document.getElementById("passwordHint");
  var submitButton = document.getElementById("submitButton");

  // Überprüfung der Passwortlänge und Zeichenanforderungen
  if (
    password.length < 7 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d{5}/.test(password)
  ) {
    passwordHint.textContent =
      "Das Passwort muss mindestens 7 Zeichen lang sein, mindestens einen Groß- und einen Kleinbuchstaben sowie mindestens fünf Ziffern enthalten.";
    submitButton.disabled = true;
  } else {
    passwordHint.textContent = "";
    submitButton.disabled = false;
  }
}

function checkPasswordsMatch() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var confirmPasswordHint = document.getElementById("confirmPasswordHint");
  var submitButton = document.getElementById("submitButton");

  // Überprüfung der Passwortübereinstimmung
  if (password !== confirmPassword) {
    confirmPasswordHint.textContent = "Die Passwörter stimmen nicht überein.";
    submitButton.disabled = true;
  } else {
    confirmPasswordHint.textContent = "";
    submitButton.disabled = false;
  }
}
