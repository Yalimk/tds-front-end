export const signup = async (newUser) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const signout = async (redirect) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    redirect();
    const response = await fetch(`${process.env.REACT_APP_API_URI}/signout`, {
      method: "GET",
    });
    return response.json({
      message: "User disconnected",
    });
  }
};

export const logUserIn = (jwt, redirect) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  redirect();
};

export const isLoggedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    // console.log(`[front-end/src/auth/index.js => isLoggedIn:58] : localStorage.getItem("jwt"): `, localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const forgotPassword = async (email) => {
  console.info(
    `[front-end/auth/index.js => forgotPassword:67] : email: ${email}`
  );
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/forgot-password/`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    console.log('[front-end/auth/index.js => forgotPassword:81] : response: ', response);
    return response.json();
  } catch (error) {
    console.error(
      `[front-end/src/auth/index.js => forgotPassword:85] : error: ${error}.`
    );
  }
};

export const resetPassword = async (newCredentials) => {
  // console.log(`[front-end/auth/index.js => resetPassword:91] : newCredentials: ${JSON.stringify(newCredentials)}`)
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/reset-password/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCredentials)
    });
    // console.log(`[front-end/auth/index.js => resetPassword:101] : response: ${response}`);
    return await response.json();
  } catch (error) {
    console.error(`[front-end/auth/index.js => resetPassword:101] : error: ${error}.`)
  }
};
