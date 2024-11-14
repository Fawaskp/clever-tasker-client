const setToken = (tokens) => {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
};

const setCurrentUser = (access_token) => {
  const arrayToken = access_token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  console.log(tokenPayload);
  localStorage.setItem(
    "current_user",
    JSON.stringify({ name: tokenPayload.name, email: tokenPayload.email })
  );
};

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

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
      const AUTH_API_URL = "http://localhost:8000/auth/api";
      const response = await fetch(`${AUTH_API_URL}/login/password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const tokens = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        setToken(tokens);
        setCurrentUser(tokens.access);
        window.location.href = "index.html";
      } else {
        alert(tokens.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("Error during login up:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
