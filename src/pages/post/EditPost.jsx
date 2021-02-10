// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../../logic/auth/index";
import { viewPost, updatePost } from "../../logic/post/apiPost";
import defaultPostPic from "../../images/beautiful-sea.jpg";

class EditPost extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    redirectionProfile: false,
    redirectionPosts: false,
    error: "",
    loading: false,
    fileSize: 0,
  };

  init = async (postId) => {
    // console.info(`[front-end/src/post/EditPost.jsx => init:] : postId: ${postId}`);
    try {
      const data = await viewPost(postId);
      if (data.error) {
        this.setState({
          redirectionProfile: true,
        });
      } else {
        // console.info(
          // `[front-end/src/post/EditPost.jsx => init:] : data.author._id: ${data.author._id}`
        // );
        this.setState({
          id: data.author?._id,
          title: data.title,
          body: data.body,
          error: "",
        });
      }
    } catch (error) {
      console.error(
        `[front-end/src/post/EditPost.jsx => catch:] : error:  ${error}`
      );
    }
  };

  componentDidMount() {
    this.postData = new FormData();
    try {
      const postId = this.props.match.params.postId;
      if (postId) {
        this.init(postId);
      } else {
        console.error("No postId found.");
      }
    } catch (error) {
      console.error("Something went wrong with componentDidMount method.");
    }
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        loading: false,
        error: "Le poids du fichier ne doit pas dépasser 1Mb ! Déconne pas !",
      });
      return false;
    }
    if (title.length === 0 || title.length > 50) {
      this.setState({
        loading: false,
        error:
          "Le titre est requis et doit faire moins de 50 caractères, marin d'eau douce !",
      });
      return false;
    }
    if (body.length === 0) {
      this.setState({
        loading: false,
        error: `Un message est requis pour envoyer un... message, moussaillon.`,
      });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  submitPostUpdate = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.props.match.params.postId;
      const token = isLoggedIn().token;
      try {
        const data = await updatePost(postId, token, this.postData);
        if (data.error) {
          this.setState({ error: data.error });
        }
        this.setState({
          loading: false,
          title: "",
          body: "",
          redirectionProfile: true,
        });
      } catch (error) {
        console.error(
          `updatePost in EditPost coudldn't retrive data because of error: ${error}.`
        );
      }
    }
  };

  postUpdateForm = (title, body) => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Image</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          name="photo"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Titre</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          name="title"
          className="form-control"
          value={title}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Message</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          name="body"
          className="form-control"
          value={body}
        />
      </div>

      <button
        onClick={this.submitPostUpdate}
        className="btn btn-raised btn-primary"
      >
        Envoyer
      </button>
    </form>
  );

  render() {
    const { id, title, body, redirectionProfile, error, loading } = this.state;
    const postId = this.props.match.params.postId;
    if (redirectionProfile) {
      return <Redirect to={`/post/${postId}`} />;
    }
    if (id) {
      return (
        <div>
          <div className="card-body">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            {loading ? (
              <div className="jumbotron text-center">
                <h2>Loading...</h2>
              </div>
            ) : (
              ""
            )}
            <img
              style={{ height: "200px", width: "auto", boxShadow: "3px 3px 10px grey" }}
              className="img-thumbnail mb-3"
              src={`${process.env.REACT_APP_API_URI}/post/photo/${postId}?${new Date().getTime()}`}
              onError={(img) => (img.target.src = `${defaultPostPic}`)}
              alt={title}
            />

            <h3 className="card-title mt-3 mb-3">{title}</h3>

            {(isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE ||
              isLoggedIn().user?._id === id) && this.postUpdateForm(title, body)}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card-body">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            {loading ? (
              <div className="jumbotron text-center">
                <h2>Loading...</h2>
              </div>
            ) : (
              ""
            )}
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail mb-3"
              src={`${process.env.REACT_APP_API_URI}/post/photo/${postId}?${new Date().getTime()}`}
              onError={(img) => (img.target.src = `${defaultPostPic}`)}
              alt={title}
            />

            <h3 className="card-title mt-3 mb-3">{title}</h3>

            {(isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE ||
              isLoggedIn().user?._id === id) && this.postUpdateForm(title, body)}
          </div>
        </div>
      );
    }
  }
}

export default EditPost;
