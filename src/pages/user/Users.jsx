// Native modules import
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Personal modules import
import { usersPerPage } from "../../logic/user/apiUser";
import defaultProfilePic from "../../images/default-image.png";

class Users extends Component {
  state = {
    users: [],
    page: 1
  };

  loadUsers = async (page) => {
    try {
      const allUsers = await usersPerPage(page);
      // console.log(`[front-end/src/users/Users.jsx => loadUsers:18] : allUsers : ${allUsers}`);
      // console.log(`[front-end/src/users/Users.jsx => loadUsers:18] : type of allUsers : ${typeof allUsers}`);
      if (allUsers) {
        this.setState({
          users: allUsers,
        });
      } else {
        console.error(
          `No users were retrieved from the server because of error.`
        );
      }
    } catch (error) {
      console.error(`Couldn't list all users because of error: ${error}.`);
    }
  };

  getMoreUsers = (num) => {
    this.setState({ page: this.state.page + 1 });
    this.loadUsers(this.state.page + num);
  };

  getLessUsers = (num) => {
    this.setState({ page: this.state.page - 1 });
    this.loadUsers(this.state.page - num);
  };

  componentDidMount = async () => {
    this.loadUsers(this.state.page);
  };

  renderUsers = (users) => (
    <div
      className="row"
      style={{ justifyContent: "center", position: "relative" }}
    >
      {users.map((user, i) => {
        const { photo, _id, pseudo, about } = user;
        if (photo) {
          return (
            <div
              className="card card-block col-sm-12 col-md-6 col-lg-4 col-xl-3"
              key={i}
              style={{
                backgroundColor: "#D9D9D9",
                marginRight: "30px",
                marginBottom: "30px",
                boxShadow: "3px 3px 5px grey",
                borderRadius: "3%"
              }}
            >

              <div className="card-body text-center" key={i}>
              <img
                style={{
                  height: "auto",
                  width: "auto",
                  marginTop: "15px",
                  borderRadius: "25%",
                  boxShadow: "3px 3px 10px grey"
                }}
                src={`${process.env.REACT_APP_API_URI}/user/photo/${_id}`}
                onError={(img) => (img.target.src = `${defaultProfilePic}`)}
                className="img-thumbnail mb-3"
                alt={pseudo}
              />
              </div>
                <hr/>
                <h5 className="card-title text-center font-weight-bold mb-3">
                  {pseudo}
                </h5>
                <p className="card-text text-justify mb-5">{about}</p>
              <Link
                to={`/user/${_id}`}
                className="btn btn-lg btn-block btn-outline-success text-center font-weight-bold mb-3"
              >
                Planque
              </Link>
            </div>
          );
        } else {
          return (
            <div
              className="card card-block col-sm-12 col-md-6 col-lg-4 col-xl-3"
              key={i}
              style={{
                backgroundColor: "#D5E5F2",
                marginRight: "30px",
                marginBottom: "30px",
              }}
            >
              <img
                style={{
                  height: "auto",
                  width: "auto",
                  marginTop: "15px",
                  borderRadius: "50%",
                }}
                src={`${defaultProfilePic}`}
                onError={(img) => (img.target.src = `${defaultProfilePic}`)}
                className="img-thumbnail mb-3"
                alt={pseudo}
              />
              <div className="card-body d-flex flex-column" key={i}>
                <h5 className="card-title text-center">{pseudo}</h5>
                <p className="card-text mb-5">{about}</p>
                <Link
                  to={`/user/${_id}`}
                  className="btn btn-lg btn-block btn-outline-success text-center font-weight-bold mb-3"
                >
                  Planque
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );

  render() {
    const { users, page} = this.state;
    return (
      <div className="jumbotron">
        <h2 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>
        {!users.length
            ? "Rien à afficher pour le moment..."
            : "Les Pirates de la Taverne des Soiffards"}
        </h2>
        {this.renderUsers(users)}

        <div className="row">
          <div className="col text-right">
            {page > 1 ? (
              <button
                className="btn btn-raised btn-info mt-5 mb-5"
                onClick={() => this.getLessUsers(1)}
                style={{boxShadow: "3px 3px 5px grey"}}
              >
                Page précédente
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="col text-left">
            {/* {console.log('users.length: ', users.length)}
            {console.log('page: ', page)}
            {console.log('process.env.PER_PAGE: ', process.env.REACT_APP_PER_PAGE)} */}
            {(users.length > page && users.length === Number(process.env.REACT_APP_PER_PAGE)) ? (
              <button
                className="btn btn-raised btn-info mt-5 mb-5"
                onClick={() => this.getMoreUsers(1)}
                style={{boxShadow: "3px 3px 5px grey"}}
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

export default Users;
