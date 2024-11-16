const accessToken = localStorage.getItem("access_token");

function deleteTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function validateToken() {
  fetch(`${AUTH_API_URL}/validate-token/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      deleteTokens();
    }
  });
}

if (accessToken) {
  validateToken();
} else {
  window.location.href = "/login.html";
}
