// Native modules import
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// Personal modules import
import { viewPost, remove } from "../../logic/post/apiPost";
import defaultPostPic from "../../images/beautiful-sea.jpg";
import { isLoggedIn } from "../../logic/auth/index";
import WriteComment from "../../components/post/WriteComment";

class OnePost extends Component {
  state = {
    post: "",
    comments: [],

    redirectionPosts: false,
  };

  componentDidMount = async () => {
    const postId = this.props.match.params.postId;
    const onePost = await viewPost(postId);
    // console.log("onePost dans componentDidMount", onePost);
    if (onePost.error) {
      console.log(`An error happened when getting the post information.`);
    } else {
      this.setState({
        post: onePost,
        comments: onePost.comments,
      });
    }
  };

  updateComments = (comments) => {
    this.setState({ comments });
  };

  deleteConfirmation = () => {
    let answer = window.confirm(
      "Es-tu sûr de vouloir supprimer ton message, moussaillon ?"
    );
    if (answer) {
      this.deletePost();
    }
  };

  deletePost = async () => {
    try {
      const postId = this.props.match.params.postId;
      const token = isLoggedIn().token;
      const response = await remove(postId, token);
      // console.log(`dans la méthode deletePost de OnePost: response: ${response}, postId: ${postId}, token: ${token}`);
      if (response.error) {
        console.log(`The response couldn't be retrieved from the server. `);
      } else {
        this.setState({
          redirectionPosts: true,
        });
      }
    } catch (error) {
      console.error(
        `The deletePost method encountered the following error: ${error}.`
      );
    }
  };

  renderPost = (post) => {
    let posterId;
    if (typeof post.author === "string") {
      posterId = post.author ? `/user/${post.author._id}` : "";
    }
    const posterPseudo = post.author ? post.author.pseudo : "un Inconnu";

    return (
      <div className="card col-12" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="card-body text-center">
          <img
            src={`${process.env.REACT_APP_API_URI}/post/photo/${
              post._id
            }?${new Date().getTime()}`}
            onError={(img) => (img.target.src = `${defaultPostPic}`)}
            className="img-thumbnail mb-3"
            style={{
              height: "auto",
              width: "auto",
              objectFit: "cover",
              boxShadow: "3px 3px 10px grey",
            }}
            alt={post.title}
          />
        </div>
        <hr />
        <h2 className="mt-3 mb-3 display-2 text-center">{post.title}</h2>
        <p className="card-text text-justify lead" style={{ padding: "20px" }}>
          {post.body}
        </p>
        <p className="font-italic">
          Posté par{" "}
          <Link
            to={
              typeof post.author === "string" ? posterId : `/post/${post._id}`
            }
            style={{ color: "#3BA7BF" }}
          >
            {posterPseudo}
          </Link>{" "}
          le {new Date(post.created).toLocaleDateString('fr-FR')}
        </p>
        <div className="inline-block">
          <Link
            to={`/posts`}
            className="btn btn-lg btn-block btn-outline-success text-center font-weight-bold"
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "15px",
            }}
          >
            Retour aux messages
          </Link>
          {isLoggedIn().user && isLoggedIn().user._id === post.author?._id && (
            <>
              <Link
                to={`/post/edit/${post._id}`}
                className="btn btn-raised btn-info mr-3 btn-sm"
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
              >
                Modifier
              </Link>
              <button
                className="btn btn-raised btn-danger"
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
                onClick={this.deleteConfirmation}
              >
                Supprimer
              </button>
            </>
          )}
          <div>
            {isLoggedIn().user &&
              isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE && (
                <div
                  className="card mt-5 jumbotron"
                  style={{
                    boxShadow: "3px 3px 10px grey",
                    borderRadius: "10%",
                    backgroundColor: "#D9D9D9",
                    padding: "32px",
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title mb-3"
                      style={{ color: "#9662E3", fontWeight: "bold" }}
                    >
                      Interface du Roi des Pirates
                    </h5>
                    {post.author?._id && (
                      <Link
                        to={`/post/edit/${post._id}`}
                        className="btn btn-raised btn-light mr-5 font-weight-bold"
                        style={{color: "black"}}
                      >
                        Modifier en tant que Roi
                      </Link>
                    )}
                    <button
                      onClick={this.deleteConfirmation}
                      className="btn btn-raised btn-dark font-weight-bold"
                    >
                      Supprimer en tant que Roi
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { post, redirectionPosts, comments } = this.state;
    if (redirectionPosts) {
      return <Redirect to={`/posts/`} />;
    }
    return (
      <div className="jumbotron">
        {!post ? (
          <div className="jumbotron text-center">
            <h2>Chargement...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )}
        <WriteComment
          postId={post._id}
          comments={comments}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

export default OnePost;
