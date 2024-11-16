const accessToken = localStorage.getItem("access_token");

function validateToken() {
  fetch(`${AUTH_API_URL}/validate-token/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (response.status == 200) {
      window.location.href = "index.html";
    }
  });
}

if (accessToken) {
  validateToken();
}
