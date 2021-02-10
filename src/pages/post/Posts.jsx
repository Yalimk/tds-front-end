// Native modules import
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Personal modules import
import { postsPerPage } from "../../logic/post/apiPost";
import defaultPostPic from "../../images/beautiful-sea.jpg";

class Posts extends Component {
  state = {
    posts: [],
    page: 1,
  };

  loadPosts = async (page) => {
    try {
      const allPosts = await postsPerPage(page);
      // console.log('allPosts in loadPosts in Post.jsx', allPosts)
      // console.log('type of allPosts in loadPosts in Post.jsx', typeof allPosts)
      if (allPosts) {
        this.setState({
          posts: allPosts,
        });
      } else {
        console.error(
          `No posts were retrieved from the server because of error.`
        );
      }
    } catch (error) {
      console.error(
        `Couldn't change state of posts because of error: ${error}.`
      );
    }
  };

  showMorePosts = (num) => {
    this.setState({ page: this.state.page + 1 });
    this.loadPosts(this.state.page + num);
  };

  showLessPosts = (num) => {
    this.setState({ page: this.state.page - 1 });
    this.loadPosts(this.state.page - num);
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  renderPosts = (posts) => {
    // console.log("posts.length", posts.length);
    return (
      <div className="row" style={{ justifyContent: "center" }}>
        {posts.map((post, i) => {
          const posterProfile = post.author ? `/user/${post.author._id}` : "/posts";
          const posterPseudo = post.author ? post.author.pseudo : "un Inconnu";

          return (
            <div
              className="card card-block col-sm-12 col-md-6 col-lg-4 col-xl-3"
              key={i}
              style={{
                backgroundColor: "#D9D9D9",
                marginRight: "30px",
                marginBottom: "30px",
                boxShadow: "3px 3px 5px grey",
                width: "300px",
                borderRadius: "3%"
              }}
            >
              <div className="card-body text-center" key={i}>
                <img
                  className="img-thumbnail mb-3"
                  style={{ height: "auto", width: "auto", boxShadow: "3px 3px 10px grey" }}
                  src={`${process.env.REACT_APP_API_URI}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(img) => (img.target.src = `${defaultPostPic}`)}
                />
              </div>
              <hr />
              <h5 className="card-title text-center font-weight-bold mb-3">
                {post.title}
              </h5>
              <p className="card-text text-justify mb-5">
                {post.body.substring(0, 100)}
              </p>
              <p className="font-italic mb-0">
                Posté par <Link to={posterProfile} style={{color: "#3BA7BF"}}>{posterPseudo}</Link> le{" "}
                {new Date(post.created).toLocaleDateString('fr-FR')}
              </p>
              <Link
                to={`/post/${post._id}`}
                className="btn btn-lg btn-block btn-outline-success text-center font-weight-bold mb-3"
              >
                Lire plus
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="jumbotron">
        <h2 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>
          {!posts.length
            ? "Rien à afficher pour le moment..."
            : "Messages des Pirates de la Taverne des Soiffards"}
        </h2>
        {this.renderPosts(posts)}

        <div className="row">
          <div className="col text-right">
            {page > 1 ? (
              <button
                className="btn btn-raised btn-info mt-5 mb-5"
                onClick={() => this.showLessPosts(1)}
                style={{ boxShadow: "3px 3px 5px grey" }}
              >
                Page précédente
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="col text-left">
            {(posts.length > page && posts.length === Number(process.env.REACT_APP_PER_PAGE)) ? (
              <button
                className="btn btn-raised btn-info mt-5 mb-5"
                onClick={() => this.showMorePosts(1)}
                style={{ boxShadow: "3px 3px 5px grey" }}
              >
                Page suivante
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
