export const createPost = async (userId, token, post) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/post/new/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: post,
      }
    );
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't post data to api because of error: ${error}.`
    );
  }
};

export const postsPerPage = async (page) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/posts/?page=${page}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
    );
  }
};

export const viewPost = async (postId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api in viewPost because of error: ${error}.`
    );
  }
};

export const listUserPosts = async (userId, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/posts/by/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
    );
  }
};

export const remove = async (postId, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
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

export const updatePost = async (postId, token, post) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: post,
    });
    console.info('INSIDE UPDATEPOST APRES LE FETCH MAIS AVANT LE RETOUR DE LA REPONSE')
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't put data to api because of error: ${error}.`
    );
  }
};

export const writeComment = async (userId, token, postId, comment) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/comment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, postId, comment })
    })
    return response.json();
  } catch (error) {
    console.error(`[front-end/src/logic/post/apiPosts.js => writeComment] : error: ${error}`)
  }
};

export const deleteComment = async (userId, token, postId, comment) => {
  try {
    console.log(`[front-end/src/logic/post/apiPost.js => deleteComment] : userId: ${userId}, token: ${token}, postId: ${postId}`);
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/uncomment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, postId, comment })
    })
    return response.json();
  } catch (error) {
    console.error(`[front-end/src/logic/post/apiPosts.js => deleteComment] : error: ${error}`)
  }
};
