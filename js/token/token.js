const setCurrentUser = (access_token) => {
    const arrayToken = access_token.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    console.log(tokenPayload);
    localStorage.setItem(
      "current_user",
      JSON.stringify({ name: tokenPayload.name, email: tokenPayload.email })
    );
  };

const setToken = (tokens) => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  };