/* eslint-disable jsx-a11y/anchor-is-valid */
// Native modules import
import React from "react";
import { Link, withRouter } from "react-router-dom";

// Components import

// Personal modules import
import { signout, isLoggedIn } from "../../logic/auth/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#3BA7BF",
      fontWeight: "bold"
    };
  } else {
    return {
      color: "#0D0D0D",
    };
  }
};

const Menu = ({ history }) => (
  <div className="container">
    <nav className="navbar navbar-light bg-light">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className="navbar-link mr-3"
            style={(isActive(history, "/"))}
            to="/"
          >
            La Taverne
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="navbar-link mr-3"
            style={isActive(history, "/users")}
            to="/users"
          >
            Les Pirates de la Taverne
          </Link>
        </li>

        {!isLoggedIn() && (
          <>
            <li className="nav-item">
              <Link
                className="navbar-link mr-3"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Connexion
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="navbar-link mr-3"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Rejoindre
              </Link>
            </li>
          </>
        )}

        {isLoggedIn() && (
          <>
            <li className="nav-item">
              <Link
                to="/posts"
                style={isActive(history, `/posts`)}
                className="navbar-link mr-3"
              >
                Messages
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/post/create"
                style={isActive(history, `/post/create`)}
                className="navbar-link mr-3"
              >
                Envoyer un message
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="navbar-link mr-3"
                style={
                  (isActive(history, `/user/${isLoggedIn().user._id}`),
                  { color: "#81A65D", fontWeight: "bold" })
                }
                to={`/user/${isLoggedIn().user._id}`}
              >
                {`Planque ${
                  /^[aeiou]/i.test(isLoggedIn().user.pseudo.toLowerCase())
                    ? "d'"
                    : "de "
                }${isLoggedIn().user.pseudo}`}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/"
                onClick={() => signout(() => history.push("/"))}
                className="navbar-link mr-5"
                style={
                  (isActive(history, "/signout"),
                  { color: "#8C0303", fontWeight: "bold" })
                }
              >
                Déconnexion
              </Link>
            </li>
            {isLoggedIn() && isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="navbar-link mr-5"
                  style={
                    (isActive(history, "/admin"),
                    { color: "#9662E3", fontWeight: "bold" })
                  }
                >
                  Administration du Roi des Pirates
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  </div>
);

export default withRouter(Menu);
