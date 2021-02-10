// Native modules import
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Personal modules import
import { writeComment, deleteComment } from "../../logic/post/apiPost";
import { isLoggedIn } from "../../logic/auth/index";
import defaultProfilePic from "../../images/default-image.png";

class WriteComment extends Component {
  state = {
    message: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({
      error: "",
    });
    this.setState({
      message: event.target.value,
    });
  };

  isValid = () => {
    const { message } = this.state;
    if (!message.length > 0 || message.length > 300) {
      this.setState({
        error:
          "Ton commentaire doit être d'au moins 1 caractère et d'au plus 300 caractères, moussaillon !",
      });
      return false;
    }
    return true;
  };

  addComment = async (event) => {
    event.preventDefault();
    const userId = isLoggedIn().user._id;
    const token = isLoggedIn().token;
    const postId = this.props.postId;
    const comment = { message: this.state.message };

    if (!isLoggedIn()) {
      this.setState({
        error: "Tu dois être connecté pour écrire un commentaire, pirate !",
      });
      return false;
    }

    if (this.isValid()) {
      try {
        const response = await writeComment(userId, token, postId, comment);
        if (response.error) {
          console.log(
            `[front-end/src/components/post/WriteComment.jsx => addComment] : response.error: ${JSON.stringify(
              response.error
            )}`
          );
        } else {
          this.setState({
            message: "",
          });
          this.props.updateComments(response.comments);
        }
      } catch (error) {
        console.error(
          `[front-end/src/components/post/WriteComment.jsx => addComment] : error: ${error}`
        );
      }
    }
  };

  removeComment = async (comment) => {
    const userId = isLoggedIn().user._id;
    const token = isLoggedIn().token;
    const postId = this.props.postId;
    try {
      console.log(`[front-end/src/components/post/WriteComment.jsx => removeComment] : userId: ${userId}, token: ${token}, postId: ${postId}`);
      const response = await deleteComment(userId, token, postId, comment);
      if (response.error) {
        console.log(response.error);
      } else {
        this.props.updateComments(response.comments);
      }
    } catch (error) {
      console.error(
        `[front-end/src/components/post/WriteComment.jsx => removeComment] : error: ${error}`
      );
    }
  };

  deleteConfirmation = (comment) => {
    let answer = window.confirm(
      "Es-tu sûr de vouloir supprimer ton message, pirate ?"
    );
    if (answer) {
      console.log('inside deleteConfirmation')
      this.removeComment(comment);
    }
  };

  render() {
    const { comments, postId } = this.props;
    const { message, error } = this.state;

    return (
      <div className="container jumbotron">
        <h2 className="mb-5">Donne ton avis sur ce message, moussaillon !</h2>
        <div className="form-group">
          <form action="" onSubmit={this.addComment}>
            <input
              className="form-control"
              type="text"
              value={message}
              onChange={this.handleChange}
              placeholder="Ecris ici ton avis, bachi-bouzouk..."
            />
            <button type="submit" className="btn btn-raised btn-success mt-2">
              Envoyer
            </button>
          </form>
        </div>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {/* {JSON.stringify(comments)} */}
        <div className="col-md-12">
          <h3 className="text-success mb-4 mt-4">
            {comments.length}{" "}Commentaire{comments.length <= 1 ? "" : "s"}
          </h3>
          {comments.reverse().map((comment, i) => {
            let commentatorProfile;
            if (typeof comment.author?.pseudo === "string") {
              commentatorProfile = comment.author?._id
                ? `/user/${comment.author._id}`
                : "";
            }
            const commentatorPseudo = comment.author?.pseudo
              ? comment.author.pseudo
              : "un Inconnu";
            return (
              <div key={i}>
                <div className="row">
                  <div className="col-md-12" style={{ padding: 0 }}>
                    <Link to={`/user/${comment.author._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        onError={(img) =>
                          (img.target.src = `${defaultProfilePic}`)
                        }
                        src={`${process.env.REACT_APP_API_URI}/user/photo/${comment.author._id}`}
                        alt={commentatorPseudo}
                      />
                    </Link>
                    <p className="lead">
                      {comment.message}
                    </p>
                  </div>
                  <p
                    className="font-italic"
                    style={{ fontSize: "0.7rem", margin: 0 }}
                  >
                    Posté par{" "}
                    <Link
                      to={
                        typeof commentatorPseudo === "string"
                          ? commentatorProfile
                          : `/post/${postId}`
                      }
                      style={{ color: "#3BA7BF" }}
                    >
                      {commentatorPseudo}
                    </Link>{" "}
                    le {new Date(comment.created).toLocaleDateString()}
                    {isLoggedIn().user &&
                      isLoggedIn().user._id === comment.author?._id && (
                        <Fragment>
                          <button
                            className="btn btn-raised btn-sm btn-danger ml-5"
                            style={{
                              fontSize: "0.9rem",
                              marginBottom: "15px",
                              cursor: "pointer",
                            }}
                            onClick={() => this.deleteConfirmation(comment)}
                          >
                            Supprimer
                          </button>
                        </Fragment>
                      )}
                      {/* {console.log('user.right', isLoggedIn().user.right)} */}
                      {/* {console.log('ADMIN_TITLE', process.env.REACT_APP_ADMIN_TITLE)} */}
                    {isLoggedIn().user &&
                      isLoggedIn().user.right ===
                        process.env.REACT_APP_ADMIN_TITLE && (
                        <Fragment>
                          <button
                            className="btn btn-raised btn-dark font-weight-bold ml-5 btn-sm"
                            style={{
                              fontSize: "0.9rem",
                              marginBottom: "15px",
                              cursor: "pointer",
                            }}
                            onClick={() => this.deleteConfirmation(comment)}
                          >
                            Supprimer en tant que Roi
                          </button>
                        </Fragment>
                      )}
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WriteComment;
