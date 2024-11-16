// Logout
function ready_logout() {
    document.getElementById("logout-btn").addEventListener("click", () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (confirm("Are you sure to logout?")) {
        fetch(`${AUTH_API_URL}/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }).then((response) => {
          response.json().then((res) => console.log(res));
          if (response.status == 204) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("current_user");
            window.location.href = "/";
          }
        });
      }
    });
  }