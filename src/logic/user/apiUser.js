export const read = async (userId, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
    );
  }
};

export const usersPerPage = async (page) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/users/?page=${page}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
      );
    }
};

export const updateUser = async (userId, token, user) => {
  // console.log(`[front-end/src/user/apiUser.js => updateUser:46] : userId: ${userId}, token: ${token}, user: ${user}`);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: user,
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't put data to api because of error: ${error}.`
    );
  }
};

export const updateInfo = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      // console.log(`[front-end/src/user/apiUser.js => updateInfo:67] : inside if (localStorage.getItem('jwt'))`);
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

export const remove = async (userId, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
    );
  }
};
