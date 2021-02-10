// Native modules import
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

// Components import
import DeleteUser from "../../components/user/DeleteUser";
import UserPosts from "../../components/user/UserPosts";

// Personal modules import
import { isLoggedIn } from "../../logic/auth/index";
import { read } from "../../logic/user/apiUser";
import defaultProfilePic from "../../images/default-image.png";
import { listUserPosts } from "../../logic/post/apiPost";

class Profile extends Component {
  state = {
    user: "",
    redirectionSignIn: false,
    posts: [],
  };

  init = async (userId) => {
    try {
      const token = isLoggedIn().token;
      // console.log(`[front-end/src/user/Profile.jsx => init] : token: ${token}`)
      // console.log(`[front-end/src/user/Profile.jsx => init] : userId: ${userId}`)
      const data = await read(userId, token);
      if (data.error) {
        console.error(`[front-end/src/user/Profile.jsx => init:28] : data.error: ${data.error}`)
        this.setState = {
          redirectionSignIn: true,
        };
      } else {
        // console.log(`[front-end/src/user/Profile.jsx => init:28] : data: ${data}`);
        this.setState({
          user: data,
        });
        // console.log(`[front-end/src/user/Profile.jsx => init:37] : data._id: ${data._id}.`);
        this.loadPosts(data._id);
      }
    } catch (error) {
      console.error(
        `[front-end/src/user/Profile.jsx => init:40] : error: ${error}.`
      );
    }
  };

  loadPosts = (userId) => {
    const token = isLoggedIn().token;
    listUserPosts(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    try {
      const userId = this.props.match.params.userId;
      // console.log(`[front-end/src/user/Profile.jsx => componentDidMount] userId: ${userId}`);
      if (userId) {
        this.init(userId);
      } else {
        console.error("No userId found.");
      }
    } catch (error) {
      console.error("Something went wrong with componentDidMount method.");
    }
  };

  componentWillReceiveProps(props) {
    try {
      const userId = props.match.params.userId;
      if (userId) {
        this.init(userId);
      } else {
        console.error("No userId found.");
      }
    } catch (error) {
      console.error(
        "Something went wrong with componentWillReceiveProps method."
      );
    }
  };

  render() {
    const { redirectionSignIn, user, posts } = this.state;
    const { _id, pseudo, email, photo, about, created, role, hobbies } = user;
    // console.log('user.about dans render de Profile: ', user.about);
    // console.log('user dans render de Profile: ', user);
    if (redirectionSignIn) {
      return <Redirect to="/signin" />;
    }

    if (photo) {
      const photoUrl = _id
        ? `${
            process.env.REACT_APP_API_URI
          }/user/photo/${_id}?${new Date().getTime()}`
        : defaultProfilePic;

      return (
        <div className="container jumbotron">
          <h3 className="mb-5">{pseudo}</h3>
          <div className="row">
            <div className="col-md-4">
              <img
                style={{ height: "300px", width: "auto", borderRadius: "25%", boxShadow: "3px 3px 10px grey" }}
                className="img-thumbnail"
                src={photoUrl}
                onError={(img) => (img.target.src = `${defaultProfilePic}`)}
                alt={pseudo}
              />
            </div>

            <div className="col-md-8">
              <div className="lead mt-2">
                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Inscription :&nbsp;</p>
                  <p>{` ${new Date(created).toLocaleDateString('fr-FR')}`}</p>
                </div>

                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Email :&nbsp;</p>
                  <p>{email}</p>
                </div>

                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Rôle favori :&nbsp;</p>
                  <p>{role}</p>
                </div>

                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Loisirs :&nbsp;</p>
                  <p>{hobbies}</p>
                </div>
              </div>

              {isLoggedIn().user && isLoggedIn().user._id === _id && (
                <div className="d-inline-block">
                  <Link
                    to={`/post/create`}
                    className="btn btn-raised btn-info mr-5 mb-3"
                  >
                    Poster un message
                  </Link>
                  <Link
                    to={`/user/edit/${_id}`}
                    className="btn btn-raised btn-success mr-5 mb-3"
                  >
                    Modifier les informations
                  </Link>
                  <DeleteUser userId={_id} />
                </div>
              )}
              <div>
                {isLoggedIn().user &&
                  isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE && (
                    <div
                      className="card mt-5 jumbotron"
                      style={{
                        boxShadow: "3px 3px 10px grey",
                        borderRadius: "10%", 
                        backgroundColor:"#D9D9D9",
                        padding: "32px"

                      }}
                    >
                      <div className="card-body">
                        <h5
                          className="card-title mb-3"
                          style={{ color: "#9662E3", fontWeight: "bold" }}
                        >
                          Interface du Roi des Pirates
                        </h5>
                        <Link
                          className="btn btn-raised btn-light mr-5 font-weight-bold"
                          to={`/user/edit/${_id}`}
                          style={{color: "black"}}
                        >
                          Modifier en tant que Roi
                        </Link>
                        <DeleteUser userId={_id} />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-5">
              <hr />
              <p className="lead" style={{ fontWeight: "bold" }}>
                A propos de moi :&nbsp;
              </p>
              <p className="lead">{about}</p>
              <hr />

              <UserPosts posts={posts} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h3 className="mb-5 mt-5">{pseudo}</h3>
          <div className="row">
          <div className="col-md-4">
              <img
                style={{ height: "300px", width: "auto", borderRadius: "25%" }}
                className="img-thumbnail"
                src={`${defaultProfilePic}`}
                onError={(img) => (img.target.src = `${defaultProfilePic}`)}
                alt={pseudo}
              />
            </div>

            <div className="col-md-8">
              <div className="lead mt-2">
                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Inscription :&nbsp;</p>
                  <p>{` ${new Date(created).toLocaleDateString('fr-FR')}`}</p>
                </div>

                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Email :&nbsp;</p>
                  <p>{email}</p>
                </div>

                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Rôle favori :&nbsp;</p>
                  <p>{role}</p>
                </div>

                <div className="container row">
                  <p style={{ fontWeight: "bold" }}>Loisirs :&nbsp;</p>
                  <p>{hobbies}</p>
                </div>
              </div>
              {isLoggedIn().user && isLoggedIn().user._id === _id && (
                <div className="d-inline-block">
                  <Link
                    to={`/post/create`}
                    className="btn btn-raised btn-info mr-5 mb-3"
                  >
                    Poster un message
                  </Link>
                  <Link
                    to={`/user/edit/${_id}`}
                    className="btn btn-raised btn-success mr-5 mb-3"
                  >
                    Modifier les informations
                  </Link>
                  <DeleteUser userId={_id} />
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-5">
              <hr />
              <p className="lead">{about}</p>
              <hr />

              <UserPosts posts={posts} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
