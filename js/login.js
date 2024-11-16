document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = document.getElementById('login-submit-btn');
    const buttonText = document.getElementById('login-submit-btn-text');
    const loadingSpinner = document.getElementById('login-submit-loader');

    buttonText.classList.add('hidden')
    loadingSpinner.classList.remove('hidden')
    submitButton.disabled = true

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${AUTH_API_URL}/login/password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const tokens = await response.json();

      if (response.ok) {
        setToken(tokens);
        setCurrentUser(tokens.access);
        window.location.href = "index.html";
      } else {
        alert(tokens.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("Error during login up:", error);
      alert("An error occurred. Please try again.");
    }finally{
      buttonText.classList.remove('hidden')
    loadingSpinner.classList.add('hidden')
    submitButton.disabled = false
    }

  });
});
