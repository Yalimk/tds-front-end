/* eslint-disable no-useless-escape */
// Navite modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../../logic/auth/index";
import { createPost } from "../../logic/post/apiPost";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    photo: "",
    error: "",
    user: {},
    fileSize: 0,
    loading: false,
    redirectionProfile: false,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: "",
  //     body: "",
  //     photo: "",
  //     error: "",
  //     user: {},
  //     fileSize: 0,
  //     loading: false,
  //     redirectionProfile: false,
  //   };
  // }

  componentDidMount() {
    this.postData = new FormData();
    try {
      this.setState({
        user: isLoggedIn().user,
      });
    } catch (error) {
      console.error("Something went wrong with componentDidMount method.");
    }
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize =
      name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({
      [name]: value,
      fileSize,
    });
  };

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

  postSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    
    if (this.isValid()) {
      const userId = isLoggedIn().user._id;
      const token = isLoggedIn().token;
      const data = await createPost(userId, token, this.postData);
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          loading: false,
          title: "",
          body: "",
          photo: "",
          redirectionProfile: true
        })
      }
    }
  };

  postForm = (title, body) => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Image</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Titre</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Message</label>
        <textarea
          onChange={this.handleChange("body")}
          type="body"
          className="form-control"
          value={body}
        />
      </div>
      <button
        onClick={this.postSubmit}
        type="submit"
        className="btn btn-raised btn-primary"
      >
        Envoyer
      </button>
    </form>
  );



  render() {
    const {
      title,
      body,
      user,
      error,
      loading,
      redirectionProfile
    } = this.state;

    if (redirectionProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Ecrire un message</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h3>Chargement...</h3>
          </div>
        ) : (
          ""
        )}

        {this.postForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
